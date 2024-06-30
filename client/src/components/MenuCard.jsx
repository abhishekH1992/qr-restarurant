import PropTypes from 'prop-types';
import {Skeleton} from "@nextui-org/react";
import MenuModal from './modal/MenuModal';
import { useState } from 'react';
import AddToCartBtn from './ui/AddToCartBtn';
import toast from "react-hot-toast";
import { useCart } from '../context/CartContext';
import { Card } from '@nextui-org/react';
import { getPrice } from '../utils/cart.helper';
import BidModal from './modal/BidModal';

const MenuCard = ({loading, list, isBidable}) => {
    const [visible, setVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [{loading: addToCartLoading}, setAddToCartLoading] = useState(false);
    const { addToCart } = useCart();
    const [bidVisible, setBidVisible] = useState(false);

    const addToCartOrOpenModal = async(menu) => {
        if(isBidable) {
            setBidVisible(true);
            setSelectedMenu(menu);
        } else {
            if(menu.menuVariant.length > 0 || menu.menuAddOns.length > 0) {
                setVisible(true);
                setSelectedMenu(menu);
            } else {
                try {
                    setAddToCartLoading(true);
                    await addToCart({
                        menuId: menu._id,
                        quantity: 1,
                        salePrice: menu.fixedPrice
                    });
                } catch(err) {
                    setAddToCartLoading(false);
                    toast.error('Something went wrong. Please refresh the page and try again.');
                    console.error('Error handling submit:', err);
                } finally {
                    setAddToCartLoading(false);
                    toast.success('Added to cart');
                }
            }
        }
    };
    const closeModal = () => {
        setVisible(false);
        setBidVisible(false);
    }

    return(
        <>
            {loading ?
                <div className="flex w-full flex-col gap-5 my-4">
                    {[...Array(2)].map((i, key) =>
                        <Card className="w-full space-y-5 p-4" key={key}>
                            <Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                            </div>
                        </Card>
                    )}
                </div>
            :   <div className="grid grid-cols-1 mt-10 gap-5">
                    {list.map((menu) => (
                        <Card className="flex flex-col sm:flex-row gap-2 p-3 rounded-md md:rounded-lg" key={menu._id}>
                            <img
                                src={menu.image}
                                className="h-200 sm:h-100 md:h-75 object-cover object-center rounded-md md:rounded-lg"
                            />
                            <div className="text-sm w-full">
                                <div className="text-menu-title pb-2">{menu.name}</div>
                                <div className="text-gray-500">{menu.description.length > 100 ? menu.description.slice(0,100)+'...' : menu.description}</div>
                                <div className={`price-text font-semibold justify-between items-center mt-4 hidden s:flex lg:hidden`}>
                                    {!isBidable ? getPrice(menu) : null}
                                    <AddToCartBtn classNames={`bg-black py-1 h-8 mt-1 font-normal text-sm text-center cursor-pointer text-white`} radius={`sm`} pressFunction={() => addToCartOrOpenModal(menu)} btnText={`Add`} loading={addToCartLoading} menu={menu} isBidable={isBidable}/>
                                </div>
                            </div>
                            <div className={`price-text font-semibold flex lg:flex-col s:hidden lg:flex lg:w-fifteen-percent ${isBidable ? 'justify-end items-end sm:justify-between sm:items-center' : 'justify-between items-center'}`}>
                                {!isBidable ? getPrice(menu) : null}
                                <AddToCartBtn classNames={`bg-black py-1 h-8 mt-1 font-normal text-sm text-center cursor-pointer text-white`} radius={`sm`} pressFunction={() => addToCartOrOpenModal(menu)} btnText={`Add`} loading={addToCartLoading} menu={menu} isBidable={isBidable}/>
                            </div>
                        </Card>
                    ))}
                </div>
            }
            <MenuModal menu={selectedMenu} visible={visible} closeModal={closeModal} />
            <BidModal menu={selectedMenu} visible={bidVisible} closeModal={closeModal} />
        </>
    )
}
MenuCard.propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array,
    isBidable: PropTypes.bool
};
export default MenuCard;