import { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SITE, GET_TABLE_LIST } from '../graphql/queries/site.query';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UPDATE_CART_TABLE_ID } from '../graphql/mutations/cart.mutation';

const SiteContext = createContext();

export const useSite = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
    const { data: site, loading: siteLoading } = useQuery(GET_SITE);
    const { data: table, loading: tableLoading } = useQuery(GET_TABLE_LIST);
    const [selectedTable, setSelectedTable] = useState(() => {
        const tableIdCookie = Cookies.get('tableId');
        return tableIdCookie ? JSON.parse(tableIdCookie) : { _id: '', name: '' };
    });

    const [updateCartTableId] = useMutation(UPDATE_CART_TABLE_ID);

    useEffect(() => {
        const setTableIdCookie = () => {
            const params = new URLSearchParams(window.location.search);
            const tableId = params.get("tableId");
            if (tableId && table && table.table) {
                const selectedTab = table.table.find(tab => tab._id === tableId);
                if (selectedTab) {
                    console.log(1);
                    setSelectedTable(selectedTab);
                    Cookies.set('tableId', JSON.stringify(selectedTab), { expires: 1 });
                }
            }
        };
        setTableIdCookie();
    }, [table]);

    const saveCookie = async (cookieValue) => {
        const cartId = Cookies.get('cartId');
        if(cartId) {
            try {
                await updateCartTableId({
                    variables: {
                        input: {
                            _id: cartId,
                            tableId: cookieValue._id
                        }
                    }
                })
                Cookies.set('tableId', JSON.stringify(cookieValue), { expires: 1 });
                setSelectedTable(cookieValue);
            } catch(err) {
                console.log('Error while setting tableId', err.message);
            }
        } else {
            Cookies.set('tableId', JSON.stringify(cookieValue), { expires: 1 });
            setSelectedTable(cookieValue);
        }
    };

    if (siteLoading && tableLoading) {
        return null;
    }
    return (
        <SiteContext.Provider value={{ site, selectedTable, saveCookie }}>
            {children}
        </SiteContext.Provider>
    );
};
