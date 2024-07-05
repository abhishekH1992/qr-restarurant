import { Card, Skeleton, Button } from "@nextui-org/react"
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ORDER_BY_ID } from "../graphql/queries/order.query";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// TODO DESIGN
const successPage = () => {
    const { order_id } = useParams();
    const [subtotal, setSubtotal] = useState(0);

    const { data, loading } = useQuery(GET_ORDER_BY_ID, {
        variables: { id: order_id },
    });

    const isBeer = ['TIGER', 'STELLA', 'BUDWEISER', 'HEINEKEN'];

    const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        data?.getOrderById.items.forEach((item) => {
            let itemTotal = 0;
            itemTotal += item.variant ? item.variant.price : 0;
            itemTotal += item.addon ? item.addon.reduce((acc, addon) => acc + addon.price, 0) : 0;
            itemTotal = itemTotal == 0 ? item.salePrice : itemTotal;
            itemTotal *= item.quantity;
            total += itemTotal;
        });
        setSubtotal(total.toFixed(2));
    }, [data?.getOrderById.items]);

    const getPrice = (item) => {
        let total = 0;
        total = item.addon && item.addon.reduce((accumulator, add) => {
            return accumulator + add.price;
        }, 0);
        total += item.variant ? item.variant.price : 0;
        total = total == 0 ? item.salePrice : total;
        total = total * item.quantity;
        return total.toFixed(2);
    }

    const handleEmptyCartBtn = () => {
        navigate('/');
    };

    return(
        <>
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
                :   <Card className="max-w-940 grid grid-cols-1 gap-5 px-2 mt-8">
                        {data?.getOrderById && data.getOrderById?.items?.length > 0 ? (
                            <>
                                <div className="text-center py-4 text-gray-400">
                                    <span className="">Order Number:</span> {data.getOrderById.orderNumber}
                                </div>
                                {data.getOrderById.items.map((item) => (
                                    <div className="flex flex-col sm:flex-row gap-2 p-2 py-4 border-b-1 border-gray-200" key={item._id}>
                                        {item.menu && (
                                            <img
                                                src={item.menu.image}
                                                alt={item.menu.name}
                                                className={`h-200 sm:h-75 ${!isBeer.includes(item.menu.name) ? `object-cover object-center` : `object-contain`} rounded-md md:rounded-lg`} //TODO - Remove this object cover logic once get correct images
                                            />
                                        )}
                                        <div className="text-sm w-full">
                                            <div className="text-menu-title pb-2">{item.menu && item.menu.name}</div>
                                            {item.variant && (
                                                <div className="text-gray-400 mb-2">{item.variant.name} (NZD {item.variant.price.toFixed(2)})</div>
                                            )}
                                            {item.addon && item.addon.map((add) => (
                                                <div className="text-gray-400" key={add._id}>{add.name} (NZD {add.price.toFixed(2)})</div>
                                            ))}
                                            <div className="price-text font-semibold justify-between items-center mt-4 hidden sm:flex lg:hidden">
                                                NZD {getPrice(item)}
                                            </div>
                                        </div>
                                        <div className="price-text font-semibold flex lg:flex-col justify-between items-center sm:hidden lg:flex lg:w-fifteen-percent">
                                            NZD {getPrice(item)}
                                        </div>
                                    </div>
                                ))}
                                <div className="px-2">
                                    <div className="flex justify-between py-4">
                                        <div className="text-menu-title">Total</div>
                                        <div className="text-menu-title">NZD {subtotal}</div>
                                    </div>
                                    {data.getOrderById.note && 
                                        <div className="text-xs text-gray-400 border-t-1 border-gray-200 py-4">
                                            <span className="font-semibold">Note: </span> {data.getOrderById.note}
                                        </div>
                                    }
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-400 flex justify-center items-center h-80-vh flex-col py-8">
                                <div className="text-gray-400 text-sm mb-3">No order found.</div>
                                <Button className="bg-black text-white py-2 px-4 rounded-lg min-w-eighty-percent md:min-w-20" radius="lg" onClick={handleEmptyCartBtn}>
                                    Browse Menu
                                </Button>
                            </div>
                        )}
                    </Card>
            
                }
            </div>
        </>
    )
}

export default successPage;