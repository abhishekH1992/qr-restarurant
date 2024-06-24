import { useState } from "react";
import { Card, Button, Spinner } from "@nextui-org/react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { PLACE_ORDER } from "../../graphql/mutations/order.mutation";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('Abhishek');
    const [email, setEmail] = useState('abhishek@test.com');
    const [isProcessing, setIsProcessing] = useState(false);
    const { state, resetCart } = useCart();
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    const [placeOrder] = useMutation(PLACE_ORDER);

    useEffect(() => {
        let total = 0;
        state.items.forEach((item) => {
            let itemTotal = 0;
            itemTotal += item.variant ? item.variant.price : 0;
            itemTotal += item.addon ? item.addon.reduce((acc, addon) => acc + addon.price, 0) : 0;
            itemTotal = itemTotal == 0 ? item.salePrice : itemTotal;
            itemTotal *= item.quantity;
            total += itemTotal;
        });
        total = total.toFixed(2);
        setSubtotal(total);
    }, [state.items]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(name);
        if (!stripe || !elements) {
            return;
        }
        if(!name && !email) {
            toast.error('All Fields are required.')
            return;
        }
        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
            redirect: "if_required",
        });

        if(error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occured. Please try agian");
            }
        } else if(paymentIntent && paymentIntent.status === "succeeded") {
            try {
                await placeOrder({
                    variables: {
                        cartId: Cookies.get('cartId'),
                    }
                });
                await resetCart();
                Cookies.remove('cartId');
                Cookies.remove('tableId');
                toast.success('Order Placed');
            } catch(err) {
                console.log("Erro while placing order", err.message);
                toast.error("Something went wrong. Please refresh the page.");
            } finally {
                navigate('/success');
            }
        }
      
        setIsProcessing(false);
    }

    return(
        <>
            <div className="max-w-940 px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto checkout-form">
                <Card className="my-4 md:my-10 p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col custom-input mb-3">
                                <label>
                                    Name
                                </label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="flex flex-col custom-input mb-3">
                                <label>
                                    Email
                                </label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <PaymentElement />
                        <div className="w-full mt-8 flex justify-center item-center md:justify-end  md:items-end">
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
            </div>
        </>
    );
}

export default CheckoutForm;