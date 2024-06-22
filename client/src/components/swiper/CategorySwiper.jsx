import { Skeleton } from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

const CategorySwiper = ({selectedCategoryId, loading, category, selected}) => {
    const categoryChanged = (cat) => {
        selectedCategoryId(cat);
    };

    return (
        <>
            {loading ?
                <div className="flex gap-3">
                    {[...Array(2)].map((i, key) =>
                        <Skeleton className="w-24 md:w-ten-percent rounded-full my-2 mx-3.5" key={key}>
                            <div className="h-8 w-full rounded-full bg-secondary-300"></div>
                        </Skeleton>
                    )}
                </div>
            :
                <Swiper
                    slidesPerView={2.8}
                    className="flex w-full gap-5 my-4"
                    breakpoints={{
                        320: {
                            slidesPerView: 2.5,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 2.8,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4.5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {category.map((cat) => (
                        <SwiperSlide key={cat._id} onClick={() => categoryChanged(cat)}>
                            <div className="flex justify-center items-center">
                                <div className={selected === cat._id ? 'bg-black text-white py-2 px-3.5 cursor-pointer rounded-full' : 'py-2 px-3.5 cursor-pointer'}>{cat.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </>
    )
}

CategorySwiper.propTypes = {
    selectedCategoryId: PropTypes.func,
    loading: PropTypes.bool,
    category: PropTypes.array,
    selected: PropTypes.string
};

export default CategorySwiper;