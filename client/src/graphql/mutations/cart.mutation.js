import { gql } from "@apollo/client";

export const CREATE_CART = gql`
    mutation CreateCart($input: CartInput) {
        createCart(input: $input) {
            _id
            tableId
        }
    }
`;

export const ADD_TO_CART = gql`
    mutation AddToCart($input: CartItemInput!) {
        cartItem(input: $input) {
            _id
            cartId
            menuId
            variantId
            quantity
            salePrice
        }
    }
`;

export const CART_ITEM_ADD_ON = gql`
    mutation CartItemAddOn($input: CartItemAddOnInput!) {
        cartItemAddOn(input: $input) {
            cartItemId
            addOnId
        }
    }
`;