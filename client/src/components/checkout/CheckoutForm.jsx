import { useState, useEffect } from "react";
import { Card, Button, Spinner } from "@nextui-org/react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery } from "@apollo/client";
import { PLACE_ORDER } from "../../graphql/mutations/order.mutation";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { GET_TABLE_LIST } from "../../graphql/queries/site.query";
import { useSite } from "../../context/SiteContext";

const CheckoutForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { state, resetCart } = useCart();
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();
    const { selectedTable, saveCookie } = useSite();

    const [placeOrder] = useMutation(PLACE_ORDER);
    const { data, loading } = useQuery(GET_TABLE_LIST);

    useEffect(() => {
        let total = 0;
        state.items.forEach((item) => {
            let itemTotal = 0;
            itemTotal += item.variant ? item.variant.price : 0;
            itemTotal += item.addon ? item.addon.reduce((acc, addon) => acc + addon.price, 0) : 0;
            itemTotal = itemTotal === 0 ? item.salePrice : itemTotal;
            itemTotal *= item.quantity;
            total += itemTotal;
        });
        total = total.toFixed(2);
        setSubtotal(total);
    }, [state.items]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        if (!name || !email || !selectedTable._id) {
            toast.error('All Fields are required.')
            return;
        }
        setIsProcessing(true);

        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
            redirect: "if_required",
        });

        if (stripeError) {
            if (stripeError.type === "card_error" || stripeError.type === "validation_error") {
                toast.error(stripeError.message);
            } else {
                toast.error("An unexpected error occurred. Please refresh the page.");
            }
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                const { data } = await placeOrder({
                    variables: {
                        cartId: Cookies.get('cartId'),
                    }
                });

                let getOldOrders = Cookies.get('orderId');
                getOldOrders = getOldOrders ? JSON.parse(getOldOrders) : [];
                getOldOrders.push(data.placeOrder._id);
                Cookies.set('orderId', JSON.stringify(getOldOrders), { expires: 1 });
                await resetCart();
                Cookies.remove('cartId');
                toast.success('Order Placed');
                navigate(`/success/${data.placeOrder._id}`);
            } catch (err) {
                console.log("Error while placing order", err.message);
                toast.error("Something went wrong. Please refresh the page.");
            }
        }

        setIsProcessing(false);
    }

    const handleTableChange = async (event) => {
        const selectedValue = event.target.value;
        const selectedTab = data.table.find(tab => tab._id === selectedValue);
        saveCookie(selectedTab);
    }

    return (
        <div className="max-w-940 px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto checkout-form">
            {!loading && data ? (
                <Card className="my-4 md:my-10 p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex flex-col custom-input mb-3">
                                <label>Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="flex flex-col custom-input mb-3">
                                <label>Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col custom-input mb-3">
                                <label>Table No.</label>
                                <select
                                    className="max-w-xs"
                                    onChange={handleTableChange}
                                    value={selectedTable._id}
                                >
                                    <option value='' disabled>Select Table</option>
                                    {data.table.map((tab) => (
                                        <option key={tab._id} value={tab._id}>
                                            {tab.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <PaymentElement />
                        <div className="w-full mt-8 flex justify-center item-center md:justify-end md:items-end">
                            <Button
                                type="submit"
                                className="w-eighty-percent md:w-1/3 bg-black text-white rounded-lg"
                                disabled={isProcessing || !stripe || !elements}
                            >
                                {isProcessing ? <Spinner /> : <>Place Order<ChevronDoubleRightIcon className="h-5 w-5 ml-2" />NZD {subtotal}</>}
                            </Button>
                        </div>
                    </form>
                </Card>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default CheckoutForm;
