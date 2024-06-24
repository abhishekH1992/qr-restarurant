import { useQuery } from "@apollo/client";
import { GET_PAYMENT_API } from "../graphql/queries/site.query";
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from "react";
import { CREATE_PAYMENT_INTENT } from "../graphql/mutations/order.mutation";
import { useMutation } from "@apollo/client";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkout/CheckoutForm";
import SubPagesHeader from "../components/SubPagesHeader";
import { useCart } from "../context/CartContext";

const CategoryPage = () => {
    const [clientIntentSecret, setClientIntentSecret] = useState('');
    const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
    const { state } = useCart();
    const [subtotal, setSubtotal] = useState(0);
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
        total = Math.round(total * 100);
        setSubtotal(total);
    }, [state.items]);
    useEffect(() => {
        if (subtotal > 0) {
            const fetchData = async () => {
                try {
                    const { data } = await createPaymentIntent({
                        variables: {amount: subtotal}
                    });
                    setClientIntentSecret(data.createPaymentIntent);
                } catch (error) {
                    console.error('Error creating Payment Intent:', error);
                }
            };

            fetchData();
        }
    }, [createPaymentIntent, subtotal]);
    const { data, loading } = useQuery(GET_PAYMENT_API);
    if(loading) return;
    const stripePromise = loadStripe(data.site.stripePublishKey);
    return (
        <>
            <SubPagesHeader name="Place the order" />
            {stripePromise && clientIntentSecret &&
                <Elements stripe={stripePromise} options={clientIntentSecret}>
                    <CheckoutForm />
                </Elements>
            }
        </>
    )
}

export default CategoryPage;