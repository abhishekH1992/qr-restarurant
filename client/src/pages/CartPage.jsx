import SubPagesHeader from "../components/SubPagesHeader";
import { useCart } from "../context/CartContext";
import { Skeleton } from "@nextui-org/react";
import AddToCartBtn from "../components/ui/AddToCartBtn";
import { Card, Button, Textarea } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GET_CART } from "../graphql/queries/cart.query";
import { useQuery } from "@apollo/client";
import Cookies from 'js-cookie';

const CartPage = () => {
    const { state, updateCartDetails, loading } = useCart();
    const { data } = useQuery(GET_CART, {
		variables: {cartId: Cookies.get('cartId')},
	});
    const [subtotal, setSubtotal] = useState(0);
    const [note, setNote] = useState(data?.getCart?.note || '');
    const navigate = useNavigate();

    useEffect(() => {
        if(data) setNote(data?.getCart?.note || '');
        let total = 0;
        state.items.forEach((item) => {
            let itemTotal = 0;
            itemTotal += item.variant ? item.variant.price : 0;
            itemTotal += item.addon ? item.addon.reduce((acc, addon) => acc + addon.price, 0) : 0;
            itemTotal = itemTotal == 0 ? item.salePrice : itemTotal;
            itemTotal *= item.quantity;
            total += itemTotal;
        });
        setSubtotal(total.toFixed(2));
    }, [state.items, data]);

    const getPrice = (item) => {
        let total = 0;
        total = item.addon && item.addon.reduce((accumulator, add) => {
            return accumulator + add.price;
        }, 0);
        total += item.variant ? item.variant.price : 0;
        total = total == 0 ? item.salePrice : total;
        total = total * item.quantity;
        return total.toFixed(2);
    }

    const handleEmptyCartBtn = () => {
        navigate('/');
    };

    const handleCheckoutBtn = async() => {
        try {
            await updateCartDetails({
                note: note
            });
        } catch(err) {
            toast.error('Something went wrong. Please refresh the page and try again.');
            console.error('Error handling submit:', err);
        } finally {
            navigate('/checkout');
        }
    }

    return(
        <>
            <SubPagesHeader name={`Confirm your order`} />
            <div className="max-w-940 px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto">
                {loading ?
                    <div className="flex w-full flex-col gap-5 my-4">
                        {[...Array(2)].map((i, key) =>
                            <div className="w-full space-y-5 p-4" key={key}>
                                <Skeleton className="rounded-lg">
                                    <div className="h-24 rounded-lg bg-default-300"></div>
                                </Skeleton>
                                <div className="space-y-3">
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                </div>
                            </div>
                        )}
                    </div>
                :   <Card className="max-w-940 grid grid-cols-1 mt-10 gap-5 px-2 py-5">
                        {state.items && state.items.length > 0 ? (
                            <>
                                {state.items.map((item) => (
                                    <div className="flex flex-col sm:flex-row gap-2 p-2 py-4 border-b-1 border-gray-200" key={item._id}>
                                        {item.menu && (
                                            <img
                                                src={item.menu.image}
                                                alt={item.menu.name}
                                                className="h-200 sm:h-75 object-cover object-center rounded-md md:rounded-lg"
                                            />
                                        )}
                                        <div className="text-sm w-full">
                                            <div className="text-menu-title pb-2">{item.menu && item.menu.name}</div>
                                            {item.variant && (
                                                <div className="text-gray-400 mb-2">{item.variant.name} (NZD {item.variant.price.toFixed(2)})</div>
                                            )}
                                            {item.addon && item.addon.map((add) => (
                                                <div className="text-gray-400" key={add._id}>{add.name} (NZD {add.price.toFixed(2)})</div>
                                            ))}
                                            <div className="price-text font-semibold justify-between items-center mt-4 hidden sm:flex lg:hidden">
                                                NZD {getPrice(item)}
                                                <AddToCartBtn classNames="bg-black py-1 h-8 mt-1 font-normal text-sm text-center cursor-pointer text-white" radius="sm" menu={item.menu} isCartPage={true} />
                                            </div>
                                        </div>
                                        <div className="price-text font-semibold flex lg:flex-col justify-between items-center sm:hidden lg:flex lg:w-fifteen-percent">
                                            NZD {getPrice(item)}
                                            <AddToCartBtn classNames="bg-black py-1 h-8 mt-1 font-normal text-sm text-center cursor-pointer text-white" radius="sm" menu={item.menu} isCartPage={true} />
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-between p-2 py-4">
                                    <div className="text-menu-title">Subtotal</div>
                                    <div className="text-menu-title">NZD {subtotal}</div>
                                </div>
                                <Textarea
                                    variant="bordered"
                                    label="Add a note"
                                    placeholder="Any requirements, allergies"
                                    className="max-w-full"
                                    value={note}
                                    onChange={(event) => setNote(event.target.value)}
                                />
                                <div className="flex justify-center w-full mx-auto items-center md:items-end md:justify-end">
                                <Button className="bg-black text-white py-2 px-4 rounded-lg z-50 min-w-eighty-percent md:min-w-20" radius="lg"
                                    onClick={handleCheckoutBtn}>
                                    Go To Checkout
                                </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-400 flex justify-center items-center h-80-vh flex-col">
                                <div className="text-gray-400 text-sm mb-3">Cart Empty.</div>
                                <Button className="bg-black text-white py-2 px-4 rounded-lg z-50 min-w-eighty-percent md:min-w-20" radius="lg" onClick={handleEmptyCartBtn}>
                                    Browse Menu
                                </Button>
                            </div>
                        )}
                    </Card>
            
                }
            </div>
        </>
    );
}

export default CartPage;