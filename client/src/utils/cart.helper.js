import Cookies from "js-cookie";

export const getItemFinalPrice = (variant, addons) => {
    let total = 0;
    total = typeof variant !== 'undefined'  ? variant : 0;
    typeof addons !== 'undefined' && addons.length && addons.forEach((item) => {
        total = total + item.price;
    });
    if(total == null ) {
        total = 0;
    }
    return total.toFixed(2);
}

export const addToCart = async(mutationType, cartItemParam, addonIds = []) => {
    /* Check if cart is created if not the create */
    const cartId = await getOrCreateCart(mutationType.cart);
    /* Add item to cart */
    const cartItemId = await addCartItem(mutationType.cartItem, {
        ...cartItemParam,
        cartId: cartId
    });
    /* Add item add ons */
    if(addonIds.length > 0) await addCartAddOns(mutationType.itemAddons, {
        cartItemId: cartItemId,
        addOnId: addonIds
    })
    return true;
}

export const getOrCreateCart = async(mutationType) => {
    try {
        const id = Cookies.get('cartId');
        const tableId = Cookies.get('tableId');
        if(!id) {
            const { data } = await mutationType({
                variables: { input: { tableId } },
            });
            Cookies.set('cartId', data.createCart._id, { expires: 1 });
        }
        return id ? id : Cookies.get('cartId');
    } catch(err) {
        console.error('Error creating cart:', err);
        throw new Error('Failed to create cart');
    }
}

export const addCartItem = async(mutationType, input) => {
    try {
        const { data } = await mutationType({
            variables: { input },
        });
        return data.cartItem._id;
    } catch(err) {
        console.error('Error adding products to cart:', err);
        throw new Error('Failed to products to cart');
    }
}

export const addCartAddOns = async(mutationType, input) => {
    try {
        return await mutationType({
            variables: { input },
        });
    } catch(err) {
        console.error('Error adding addons to cart:', err);
        throw new Error('Failed to addons to cart');
    }
}