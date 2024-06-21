import { useQuery } from "@apollo/client";
import { GET_SITE } from "../graphql/queries/site.query";

import Header from "../components/Header";
import Banner from "../components/Banner";
import Category from "../components/Category";

const HomePage = () =>{
    const { data:site, loading} = useQuery(GET_SITE);
    return (
        <>
            <Header logo={site?.site?.logo} />
            <div className="px-spacing-sm md:px-spacing-md lg:px-spacing-lg md:container mx-auto">
                <Banner loading={loading} banners={site?.site?.banner}/>
                <div className="max-w-940 mx-auto mt-8">
                    <Category />
                </div>
            </div>
        </>
    );
}

export default HomePage;