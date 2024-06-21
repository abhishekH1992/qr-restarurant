import { createContext, useReducer, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

// Initial state for the cart
const initialState = {
    items: []
};

// Reducer function to handle state changes based on actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case CLEAR_CART:
            return initialState;
        default:
            return state;
    }
};

// CartProvider component to provide the cart state and dispatch function to children
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        dispatch({ type: ADD_TO_CART, payload: item });
    };

    const removeFromCart = (id) => {
        dispatch({ type: REMOVE_FROM_CART, payload: id });
    };

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    };

    return (
        <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
const useCart = () => {
    return useContext(CartContext);
};

export { CartProvider, useCart };
