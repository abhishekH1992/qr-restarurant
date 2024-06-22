import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'nzd',
        });
        return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
        throw new Error(error.message);
    }
};