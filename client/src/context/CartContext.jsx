import React from "react";
import { createContext, useEffect, useReducer } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_CART, ADD_TO_CART, CART_ITEM_ADD_ON, UPDATE_CART, DELETE_CART_ITEM } from "../graphql/mutations/cart.mutation";
import { GET_CART_ITEMS } from "../graphql/queries/cart.query";
import Cookies from 'js-cookie';

const CartContext = createContext();

const SET_CART_ITEMS = 'SET_CART_ITEMS';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const UPDATE_ITEM_TO_CART = 'UPDATE_ITEM_TO_CART';
const DELETE_ITEM_TO_CART = 'DELETE_ITEM_TO_CART';

const initialState = {
    items: [],
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return { ...state, items: [...state.items, action.payload] };
        case UPDATE_ITEM_TO_CART:
            return { ...state, items: [...state.items, action.payload] };
        case DELETE_ITEM_TO_CART:
            return { ...state, items: [...state.items, action.payload] };
        case SET_CART_ITEMS:
            return { ...state, items: action.payload };
        default:
            return state;
    }
}

const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const [createCartMutation] = useMutation(CREATE_CART);
    const [addToCartMutation] = useMutation(ADD_TO_CART, {
        refetchQueries: [{ 
            query: GET_CART_ITEMS ,
            variables: { cartId: Cookies.get('cartId') },
        }],
    });
    const [updateCartMutation] = useMutation(UPDATE_CART, {
        refetchQueries: [{ 
            query: GET_CART_ITEMS ,
            variables: { cartId: Cookies.get('cartId') },
        }],
    });
    const [deleteCartItemMutation] = useMutation(DELETE_CART_ITEM, {
        refetchQueries: [{ 
            query: GET_CART_ITEMS ,
            variables: { cartId: Cookies.get('cartId') },
        }],
    });
    const [addCartAddOnsMutation] = useMutation(CART_ITEM_ADD_ON);

    const [getCartItems, { data, loading, error }] = useLazyQuery(GET_CART_ITEMS, {
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        const cartId = Cookies.get('cartId');
        if(cartId) {
            getCartItems({ variables: { cartId } });
        }
    }, []);

    useEffect(() => {
        if (data && data.getCartItems) {
            dispatch({ type: SET_CART_ITEMS, payload: data.getCartItems });
        }
    }, [data]);

    const createCart = async() => {
        const tableId = Cookies.get('tableId');
        const { data } = await createCartMutation({
            variables: { input: { tableId } },
        });
        Cookies.set('cartId', data.createCart._id, { expires: 1 });
        return data.createCart._id;
    }

    const addToCart = async(cartItemParam, addonIds = []) => {
        const cartId = Cookies.get('cartId') || await createCart();
        const { data } = await addToCartMutation({
            variables: { input: { ...cartItemParam, cartId } },
        });
        const cartItemId = data.cartItem._id;

        if (addonIds.length) {
            await addCartAddOnsMutation({
                variables: { input: { cartItemId, addOnId: addonIds } },
            });
        }

        dispatch({ type: ADD_ITEM_TO_CART, payload: data.addToCart });
    }
    const updateCart = async(cartItemParam, addonIds = []) => {
        const { data } = await updateCartMutation({
            variables: { input: { ...cartItemParam }},
        });

        dispatch({ type: UPDATE_ITEM_TO_CART, payload: data.updateCart });
    }
    const deleteCartItem = async(cartItemId) => {
        const { data } = await deleteCartItemMutation({
            variables: {cartItemId},
        });

        dispatch({ type: DELETE_ITEM_TO_CART, payload: data.deleteCartItem });
    }
    return (
        <CartContext.Provider value={{ state, addToCart, updateCart, deleteCartItem, loading, error }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { CartProvider, useCart };