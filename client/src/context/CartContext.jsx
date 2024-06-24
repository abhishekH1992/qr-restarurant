import React from "react";
import { createContext, useEffect, useReducer } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_CART, ADD_TO_CART, CART_ITEM_ADD_ON, UPDATE_CART, DELETE_CART_ITEM, UPDATE_CART_DETAILS } from "../graphql/mutations/cart.mutation";
import { GET_CART_ITEMS } from "../graphql/queries/cart.query";
import Cookies from 'js-cookie';

const CartContext = createContext();

const SET_CART_ITEMS = 'SET_CART_ITEMS';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const UPDATE_ITEM_TO_CART = 'UPDATE_ITEM_TO_CART';
const DELETE_ITEM_TO_CART = 'DELETE_ITEM_TO_CART';
const UPDATE_CART_DETAIL = 'UPDATE_CART_DETAIL';
const RESET_CART = 'RESET_CART';

const initialState = {
    items: [],
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            return { ...state, items: [...state.items, action.payload] };
        case UPDATE_ITEM_TO_CART:
            return {
                ...state,
                items: state.items.map(item =>
                    item._id === action.payload._id ? { ...item, ...action.payload } : item
                )
            };
        case DELETE_ITEM_TO_CART:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload._id)
            };
        case UPDATE_CART_DETAIL:
            return { ...state,  cartDetails: action.payload };
        case SET_CART_ITEMS:
            return { ...state, items: action.payload };
        case RESET_CART:
            return initialState;
        default:
            return state;
    }
}

const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const [createCartMutation] = useMutation(CREATE_CART);
    const [addToCartMutation] = useMutation(ADD_TO_CART);
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
    const [updateCartDetail] = useMutation(UPDATE_CART_DETAILS);

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
        dispatch({ type: ADD_ITEM_TO_CART, payload: data.cartItem });
    }
    const updateCart = async(cartItemParam, addonIds = []) => {
        const { data } = await updateCartMutation({
            variables: { input: { ...cartItemParam }},
        });
        console.log(data);
        dispatch({ type: UPDATE_ITEM_TO_CART, payload: data.updateCart });
    }
    const deleteCartItem = async(cartItemId) => {
        const { data } = await deleteCartItemMutation({
            variables: {cartItemId},
        });
        console.log(data);
        dispatch({ type: DELETE_ITEM_TO_CART, payload: data.deleteCartItem });
    }
    const updateCartDetails = async(note) => {
        const { data } = await updateCartDetail({
            variables: { 
                input: { 
                    ...note,
                    _id: Cookies.get('cartId')
                }
            },
        });

        dispatch({ type: UPDATE_CART_DETAIL, payload: data.updateCartDetails });
    }
    const resetCart = () => {
        dispatch({ type: RESET_CART });
    }
    return (
        <CartContext.Provider value={{ state, addToCart, updateCart, deleteCartItem, updateCartDetails, resetCart, loading, error }}>
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