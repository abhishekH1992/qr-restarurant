import {Button, Spinner} from "@nextui-org/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';

const AddToCartBtn = ({classNames, radius, btnText, loading, pressFunction, menu}) => {
    const { state, updateCart, deleteCartItem } = useCart();
    const [changeQtyLoader, setChangeQtyLoader] = useState();
    const [cartItem, setCartItem] = useState();

    useEffect(() => {
        if(menu.menuVariant.length > 0 || menu.menuAddOns.length > 0) {
            setCartItem(state.items?.filter(item => item?.menuId === menu._id));
        } else {
            setCartItem(state.items?.find(item => item?.menuId === menu._id));
        }
    }, [state.items, menu._id]);

    const updateCartItem = async(type) => {
        if(menu.menuVariant.length > 0 || menu.menuAddOns.length > 0) {
            if(type == 'minus' && getQty() == 1) {
                await deleteCartItem(cartItem[0]._id);
            } else {
                pressFunction();
            }
        } else if(type) {
            try{
                setChangeQtyLoader(true);
                let qty = type === 'plus' ? cartItem.quantity + 1 : cartItem.quantity - 1;
                if(qty >= 1) {
                    await updateCart({
                        _id: cartItem._id,
                        menuId: cartItem.menuId,
                        quantity: qty,
                        salePrice: cartItem.salePrice
                    });
                } else {
                    await deleteCartItem(cartItem._id);
                }
            } catch(err) {
                setChangeQtyLoader(false);
                toast.error('Something went wrong. Please refresh the page and try again.');
                console.error('Error handling submit:', err);
            } finally {
                setCartItem(state.items.find(item => item.menuId === menu._id));
                setChangeQtyLoader(false);
                toast.success('Cart updated');
            }
        }
    }

    const getQty = () => {
        if(Array.isArray(cartItem)) {
            return cartItem.reduce((accumulator, item) => {
                return accumulator + item.quantity;
            }, 0);
        }
        return 0;
    }

    return (
        <>
            {(cartItem && !Array.isArray(cartItem)) || (Array.isArray(cartItem) && cartItem.length > 0)?
                <div className="flex items-center">
                    <div className="bg-black h-8 min-w-8 max-w-8 font-normal text-sm text-center cursor-pointer text-white rounded-l-lg flex items-center justify-center" onClick={() => updateCartItem('minus')} disabled={changeQtyLoader}>
                        {(cartItem && !Array.isArray(cartItem) && cartItem.quantity == 1) || getQty(cartItem) == 1 ?
                            <TrashIcon className="size-4 text-white"/>
                            : <MinusIcon color="white" className="size-4 text-white"/>}
                    </div>
                    <div className="bg-transparent h-8 w-8 border-1 border-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        {cartItem && !Array.isArray(cartItem) ? cartItem.quantity : getQty(cartItem)}
                    </div>
                    <div className="bg-black h-8 max-w-8 min-w-8 font-normal text-sm text-center cursor-pointer text-white rounded-r-lg flex items-center justify-center" onClick={() => updateCartItem('plus')} disabled={changeQtyLoader}>
                        <PlusIcon color="white" className="size-4 text-white"/>
                    </div>
                </div>
                :
                <Button className={classNames} radius={radius} onPress={pressFunction} disabled={loading ? true : false}>
                    {loading ? <Spinner /> : btnText}
                </Button>
            }
        </>
    );
}

AddToCartBtn.propTypes = {
    classNames: PropTypes.string,
    radius: PropTypes.string,
    btnText: PropTypes.string,
    loading: PropTypes.bool,
    pressFunction: PropTypes.func,
    menu: PropTypes.object
};

export default AddToCartBtn;