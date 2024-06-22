import { gql } from "@apollo/client";

export const GET_CART_ITEMS = gql`
    query GetCartItems($cartId: ID!) {
        getCartItems(cartId: $cartId) {
            _id
            cartId
            menuId
            quantity
            salePrice
            menu {
                _id
                name
                description
                image
                fixedPrice
                menuAddOns {
                    _id
                    name
                    price
                }
                menuVariant {
                    _id
                    name
                    price
                }
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
`;