import Banner from "../components/Banner";
import Category from "../components/Category";

const HomePage = () => {
    return (
        <>
            <div className="px-spacing-sm md:px-spacing-md lg:px-spacing-lg md:container mx-auto">
                <Banner />
                <div className="max-w-940 mx-auto mt-8">
                    <Category />
                </div>
            </div>
        </>
    );
}

export default HomePage;
