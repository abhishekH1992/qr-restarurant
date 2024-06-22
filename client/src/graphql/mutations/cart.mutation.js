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
            quantity
            salePrice
            menu {
                _id
                name
                fixedPrice
                image
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

export const UPDATE_CART = gql`
    mutation UpdateCart($input: CartItemUpdateInput!) {
        updateCart(input: $input) {
            _id
            cartId
            menuId
            quantity
            salePrice
            menu {
                _id
                name
                fixedPrice
                image
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

export const DELETE_CART_ITEM = gql`
    mutation DeleteCartItem($cartItemId: ID!) {
        deleteCartItem(cartItemId: $cartItemId) {
            _id
            cartId
            menuId
            quantity
            salePrice
            menu {
                _id
                name
                fixedPrice
                image
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
`

export const CART_ITEM_ADD_ON = gql`
    mutation CartItemAddOn($input: CartItemAddOnInput!) {
        cartItemAddOn(input: $input) {
            cartItemId
            addOnId
        }
    }
`;

export const UPDATE_CART_DETAILS = gql`
    mutation UpdateCartDetails($input: CartDetails!) {
        updateCartDetails(input: $input) {
            _id
            tableId
            note
        }
    }
`;