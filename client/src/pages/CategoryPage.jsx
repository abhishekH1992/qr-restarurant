import { useQuery } from "@apollo/client";
import SubPagesHeader from "../components/SubPagesHeader";
import { useParams } from "react-router-dom";
import GET_ENABLE_CATEGORY from "../graphql/queries/category.query";
import 'swiper/css';
import { useState, useEffect } from "react";
import CategorySwiper from "../components/swiper/CategorySwiper";
import SubCategorySwiper from "../components/swiper/SubCategorySwiper";
import MenuCard from "../components/MenuCard";

const CategoryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const { categorySlug } = useParams();
    const { data, loading } = useQuery(GET_ENABLE_CATEGORY, {
        variables: {
            isEnable: true
        }
    });

    useEffect(() => {
        if (data && !loading) {
            const cat = data.category.find(cat => cat.slug === categorySlug);
            if (cat) {
                setSelectedCategory(cat._id);
                setSubCategoryList(cat.subCategory);
                setSelectedSubCategory(cat.subCategory[0]?._id);
                setMenuList(cat.subCategory[0]?.menu);
            }
        }
    }, [data, loading, categorySlug]);

    const categoryChanged = async(cat) => {
        setSelectedCategory(cat._id);
        setSubCategoryList(cat.subCategory);
        setSelectedSubCategory(cat.subCategory[0]?._id);
        setMenuList(cat.subCategory[0]?.menu);
    }

    const subCategoryChanged= async(subcategory) => {
        setSelectedSubCategory(subcategory._id);
        setMenuList(subcategory.menu);
    }

    return (
        <>
            <SubPagesHeader name={`Menu`} />
            <div className="px-spacing-sm md:px-spacing-md lg:px-spacing-lg mx-auto">
                <CategorySwiper 
                    loading={loading} 
                    selectedCategoryId={categoryChanged} 
                    selected={selectedCategory} 
                    category={data?.category}
                />
                <SubCategorySwiper
                    loading={loading} 
                    list={subCategoryList}
                    selectedSubCategory={subCategoryChanged}
                    selected={selectedSubCategory}
                />
                <MenuCard
                    loading={loading} 
                    list={menuList}
                />
            </div>
        </>
    );
}

export default CategoryPage;
