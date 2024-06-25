import { useQuery } from "@apollo/client"
import ImageSkeleton from "./skeleton/ImageSkeleton";
import GET_ENABLE_CATEGORY from "../graphql/queries/category.query";
import { Link } from "react-router-dom";

const Category = () => {
    const { data, loading } = useQuery(GET_ENABLE_CATEGORY, {
        variables: {
            isEnable: true
        }
    });
    if(loading) return <div className="grid grid-cols-1 s:grid-cols-2 md:grid-cols-3 gap-5"><ImageSkeleton cssClasses={`h-100 sm:h-200 rounded-lg bg-secondary`} iterations={4} /></div>;

    return(
        <>
            <div className="text-functional-regular-md lg:text-functional-regular-xl mt-5">
                What would you like to order?
                <div className="w-ten-percent h-px bottom-minus-10 border-b-3 border-brand-color my-2"></div>
            </div>
            <div className="grid grid-cols-1 s:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-5">
                {data.category.map((category, key) => (
                    <div className="relative" key={key} >
                        <Link to={`${category.slug}`} className="relative">
                            <img 
                                src={category.image}
                                className="w-full h-200 rounded-lg object-cover"
                            />
                            <div className="absolute bottom-0 text-white text-center w-full text-md s:text-xl">{category.name}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Category;