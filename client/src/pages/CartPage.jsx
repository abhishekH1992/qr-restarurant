import SubPagesHeader from "../components/SubPagesHeader";
import { useCart } from "../context/CartContext";
import { Skeleton } from "@nextui-org/react";
import AddToCartBtn from "../components/ui/AddToCartBtn";
import { useState } from "react";

const CartPage = () => {
    const { state, loading } = useCart();
    const [{loading: addToCartLoading}, setAddToCartLoading] = useState(false);

    const addToCartOrOpenModal = async(menu) => {
        if(menu.menuVariant.length > 0 || menu.menuAddOns.length > 0) {
        }
    };

    const getPrice = (item) => {
        let total = 0;
        total = item.addon && item.addon.reduce((accumulator, add) => {
            return accumulator + add.price;
        }, 0);
        total += item.variant ? item.variant.price : 0;
        total = total == 0 ? item.salePrice : total;
        total = total * item.quantity
        return total.toFixed(2);
    }
    return(
        <>
            <SubPagesHeader name={`Confirm your order`} />
            <div className="max-w-940 px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto">
                {loading ?
                    <div className="flex w-full flex-col gap-5 my-4">
                        {[...Array(2)].map((i, key) =>
                            <div className="w-full space-y-5 p-4" key={key}>
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
                :   <div className="max-w-940 grid grid-cols-1 mt-10 gap-5">
                        {state.items.map((item) => (
                            <div className="flex flex-col s:flex-row gap-3 border-1 md:border-2 border-gray-200 p-2 rounded-md md:rounded-lg" key={item._id}>
                                <img
                                    src={item.menu.image}
                                    className="h-100 sm:h-75 object-cover object-center rounded-md md:rounded-lg"
                                />
                                <div className="text-sm w-full">
                                    <div className="text-menu-title pb-2">{item.menu.name}</div>
                                    {item.variant && <div className="text-gray-400 mb-2">{item.variant.name} (NZD {item.variant.price.toFixed(2)})</div>}
                                    {item.addon && item.addon.map((add) => (
                                        <div className="text-gray-400" key={add._id}>{add.name} (NZD {add.price.toFixed(2)})</div>
                                    ))}
                                    <div className="price-text font-semibold justify-between items-center mt-4 hidden s:flex lg:hidden">
                                        NZD {getPrice(item)}
                                        
                                    </div>
                                </div>
                                <div className="price-text font-semibold flex lg:flex-col justify-between items-center s:hidden lg:flex lg:w-fifteen-percent ">
                                    NZD {getPrice(item)}
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default CartPage;