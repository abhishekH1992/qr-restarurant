import PropTypes from 'prop-types';
import {Skeleton} from "@nextui-org/react";
import MenuModal from './modal/MenuModal';
import { useState } from 'react';
import AddToCartBtn from './ui/AddToCartBtn';
import { useMutation } from '@apollo/client';
import toast from "react-hot-toast";
import { addToCart } from '../utils/cart.helper';
import { CREATE_CART, ADD_TO_CART } from '../graphql/mutations/cart.mutation';

const MenuCard = ({loading, list}) => {
    const [visible, setVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [{loading: addToCartLoading}, setAddToCartLoading] = useState(false);

    const [cart] = useMutation(CREATE_CART);
    const [addCartItem] = useMutation(ADD_TO_CART);

    const addToCartOrOpenModal = async(menu) => {
        if(menu.menuVariant.length > 0 || menu.menuAddOns.length > 0) {
            setVisible(true);
            setSelectedMenu(menu);
        } else {
            try {
                setAddToCartLoading(true);
                const result = await addToCart(
                    {
                        cart: cart,
                        cartItem: addCartItem,
                    },
                    {
                        menuId: menu._id,
                        quantity: 1,
                        salePrice: menu.fixedPrice
                    },
                );
                if(result) {
                    setAddToCartLoading(false);
                    toast.success('Added to cart');
                }
            } catch(err) {
                setAddToCartLoading(false);
                toast.error('Something went wrong. Please refresh the page and try again.');
                console.error('Error handling submit:', err);
            }
        }
    };
    const closeModal = () => setVisible(false);
    const getPrice = (menu) => {
        if(menu.menuVariant.length) {
            return 'NZD '+menu.menuVariant[0].price.toFixed(2); 
        } 

        return 'NZD '+menu.fixedPrice.toFixed(2);
    }
    return(
        <>
            {loading ?
                <div className="flex w-full flex-col md:flex-row gap-5 my-4">
                    {[...Array(2)].map((i, key) =>
                        <div className="w-full md:w-28 space-y-5 p-4" key={key}>
                            <Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                            </div>
                        </div>
                    )}
                </div>
            :   <div className="grid grid-cols-1 mt-10 gap-5 md:grid-cols-2">
                    {list.map((menu) => (
                        <div className="flex flex-col s:flex-row gap-3 border-1 md:border-2 border-gray-200 p-2 rounded-md md:rounded-lg" key={menu._id}>
                            <img
                                src={menu.image}
                                className="h-100 sm:h-75 object-cover object-center rounded-md md:rounded-lg"
                            />
                            <div className="text-sm w-full">
                                <div className="text-menu-title pb-2">{menu.name}</div>
                                <div className="text-gray-500">{menu.description.length > 100 ? menu.description.slice(0,100)+'...' : menu.description}</div>
                                <div className="price-text font-semibold justify-between items-center hidden s:flex lg:hidden">
                                    {getPrice(menu)}
                                    <AddToCartBtn classNames={`bg-black py-1 h-8 mt-1 font-normal text-sm text-center cursor-pointer text-white`} radius={`sm`} pressFunction={() => addToCartOrOpenModal(menu)} btnText={`Add`} loading={addToCartLoading} />
                                </div>
                            </div>
                            <div className="price-text font-semibold flex lg:flex-col justify-between items-center s:hidden lg:flex lg:w-fifteen-percent ">
                                {getPrice(menu)}
                                <AddToCartBtn classNames={`bg-black py-1 h-8 mt-1 font-normal text-sm text-center cursor-pointer text-white`} radius={`sm`} pressFunction={() => addToCartOrOpenModal(menu)} btnText={`Add`} loading={addToCartLoading} />
                            </div>
                        </div>
                    ))}
                </div>
            }
            <MenuModal menu={selectedMenu} visible={visible} closeModal={closeModal} />
        </>
    )
}
MenuCard.propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array,
};
export default MenuCard;