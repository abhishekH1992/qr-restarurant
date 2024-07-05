import { useQuery } from "@apollo/client";
import Cookies from 'js-cookie';
import { GET_ORDER_BY_IDS } from "../graphql/queries/order.query";
import { Card, Skeleton, Accordion, AccordionItem, Button } from "@nextui-org/react"
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    let ids = Cookies.get('orderId');
    const navigate = useNavigate();
    ids = ids ? JSON.parse(ids) : [];
    const { data, loading } = useQuery(GET_ORDER_BY_IDS, {
        variables: { ids: ids },
    });

    const handleEmptyOrdersBtn = () => {
        navigate('/');
    };

    const isBeer = ['TIGER', 'STELLA', 'BUDWEISER', 'HEINEKEN'];

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

    const getSubTotal = (items) => {
        return items && items.reduce((accumulator, add) => {
            return accumulator + (add.salePrice * add.quantity);
        }, 0);
    }

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
                :
                    <div>
                        {data.getOrdersByIds && data.getOrdersByIds?.length > 0 ? (
                            <Card className="px-2 mt-8">
                                <Accordion variant="light">
                                    {data.getOrdersByIds.map((items, i) => (
                                        <AccordionItem key={i} aria-label={items.orderNumber} title={`Order Number ${items.orderNumber}`} className="">
                                            {items.items.map((item) => (
                                                <div className="flex flex-col sm:flex-row gap-2 p-2 py-4 border-b-1 border-gray-200 font-medium last:border-b-0" key={item._id}>
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
                                                    <div className="text-menu-title">NZD {getSubTotal(items.items)}</div>
                                                </div>
                                                {items.note && 
                                                    <div className="text-xs text-gray-400 border-t-1 border-gray-200 py-4">
                                                        <span className="font-semibold">Note: </span> {items.note}
                                                    </div>
                                                }
                                            </div>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </Card>
                        ) : (
                            <div className="text-gray-400 flex justify-center items-center h-80-vh flex-col py-8">
                                <div className="text-gray-400 text-sm mb-3">No orders found.</div>
                                <Button className="bg-black text-white py-2 px-4 rounded-lg min-w-eighty-percent md:min-w-20" radius="lg" onClick={handleEmptyOrdersBtn}>
                                    Browse Menu
                                </Button>
                            </div>
                        )}
                    </div>
                }
            </div>
        </>
    );
}

export default OrdersPage;