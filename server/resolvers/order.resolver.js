import Stripe from 'stripe';
import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import CartItemAddOn from "../models/cartItemAddOn.model.js";
import Menu from "../models/menu.model.js";
import MenuAddons from "../models/menuAddons.model.js";
import MenuVariant from "../models/menuVariant.model.js";
import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import OrderItemAddOn from '../models/orderItemAddOn.model.js';

const orderResolver = {
    Mutation: {
        createPaymentIntent: async(_, { amount }) => {
            try {
                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: amount,
                    currency: 'nzd',
                    automatic_payment_methods: { enabled: true },
                    // payment_method_types: ['card'],
                });
                return {
                    clientSecret: paymentIntent.client_secret
                };
            } catch (err) {
                console.log('Error in creating payment intent', err);
                throw new Error(err.message);
            }
        },
        placeOrder: async(_, {cartId}) => {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }

            /* Get unique order number */
            const today = new Date();
            const datePart = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getFullYear()).slice(-2)}`;
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));
            const orderCount = await Order.countDocuments({
                createdAt: { $gte: startOfDay, $lt: endOfDay }
            });
            const orderId = `${datePart}${String(orderCount + 1).padStart(4, '0')}`;

            /* Order */
            // TODO ADD dynmic tableId
            const orderData = new Order({
                // tableId: cart.tableId,
                tableId: '666ce53ed5302320b6dad258',
                note: cart.note,
                cartId: cartId,
                orderNumber: orderId,
                items: [],
            });
            const savedOrder =  await orderData.save();
            const order = {
                _id: savedOrder._id,
                tableId: savedOrder.tableId,
                note: savedOrder.note,
                orderNumber: savedOrder.orderNumber,
                items: []
            }

            const cartItems = await CartItem.find({cartId: cartId});
            let i = 0;
            for (const item of cartItems) {
                i = i + 1;
                const orderItem = new OrderItem({
                    orderId: order._id,
                    menuId: typeof item.menuId !== undefined ? item.menuId : null,
                    quantity: item.quantity,
                    variantId: typeof item.variantId !== undefined ? item.variantId : null,
                    salePrice: item.salePrice
                });

                // Save OrderItem document
                const savedOrderItem = await orderItem.save();

                // Fetch addons for the current cart item
                const cartItemAddOns = await CartItemAddOn.find({ cartItemId: item._id });

                // Create OrderItemAddOn documents
                const orderItemAddOns = cartItemAddOns.map(addon => ({
                    orderItemId: savedOrderItem._id,
                    addOnId: addon.addOnId
                }));

                // Save OrderItemAddOn documents
                await OrderItemAddOn.insertMany(orderItemAddOns);

                // Populate menu, variant, and addons in OrderItem
                order.items.push({
                    _id: savedOrderItem._id,
                    orderId: savedOrderItem.orderId,
                    menuId: savedOrderItem.menuId,
                    quantity: savedOrderItem.quantity,
                    variantId: savedOrderItem.variantId,
                    salePrice: savedOrderItem.salePrice,
                });

                //Check if current price
                const currentMenu = await Menu.findById(item.menuId)
                    .populate({
                        path: 'subCategory',
                        populate: {
                            path: 'category',
                            populate: {
                                path: 'categoryType',
                                model: 'CategoryTypes',
                                select: 'isBidable'
                            }
                        }
                    })
                    .exec();

                const isBidable = currentMenu.subCategory.category.categoryType.isBidable;
                if(isBidable) {
                    if(currentMenu.highestPrice > savedOrderItem.salePrice) {
                        let step = savedOrderItem.salePrice + currentMenu.step;
                        if(step < currentMenu.highestPrice) {
                            await Menu.findByIdAndUpdate(item.menuId, {currentPrice: step});
                        } else if(step > currentMenu.highestPrice) {
                            await Menu.findByIdAndUpdate(item.menuId, {currentPrice: currentMenu.highestPrice});
                        }
                    } else {
                        await Menu.findByIdAndUpdate(item.menuId, {currentPrice: currentMenu.highestPrice});
                    }
                }
            }

            return order;
        }
    },
    OrderItems: {
        menu: async(parent) => {
            try {
                return await Menu.findById(parent.menuId); 
            } catch (err) {
                console.log('Error in fetching order menu', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        variant: async(parent) => {
            try {
                return await MenuVariant.findById(parent.variantId); 
            } catch (err) {
                console.log('Error in fetching order variant', err);
                throw new Error(err.message || 'Internal Server error');
            }
        },
        addon: async(parent) => {
            try {
                const list =  await OrderItemAddOn.find({ orderId: parent.orderId });
                const ids = list.map(addOn => addOn.addOnId);
                return await MenuAddons.find({ _id: { $in: ids } });
            } catch (err) {
                console.log('Error in fetching order addon', err);
                throw new Error(err.message || 'Internal Server error');
            }
        }
    }
};

export default orderResolver;