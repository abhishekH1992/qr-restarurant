import { gql } from "@apollo/client";

export const CREATE_PAYMENT_INTENT = gql`
    mutation CreatePaymentIntent($amount: Float!) {
        createPaymentIntent(amount: $amount) {
            clientSecret
        }
    }
`;

export const PLACE_ORDER = gql`
    mutation PlaceOrder($cartId: ID!) {
        placeOrder(cartId: $cartId) {
            _id
            tableId
            note
            orderNumber
            items {
                _id
                quantity
                salePrice
                menu {
                    _id
                    name
                    description
                    image
                    fixedPrice
                }
                variant {
                    _id
                    name
                    price
                }
                addon {
                    _id
                    name
                    price
                }
            }
        }
    }
`;