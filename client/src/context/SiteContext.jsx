import { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SITE } from '../graphql/queries/site.query';

const SiteContext = createContext();

export const useSite = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
    const { data: site, loading } = useQuery(GET_SITE);

    return (
        <SiteContext.Provider value={{ site, loading }}>
            {children}
        </SiteContext.Provider>
    );
};
