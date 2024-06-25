import { Skeleton } from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";

const SubCategorySwiper = ({loading, list, selectedSubCategory, selected}) => {
    const swiperRef = useRef(null);
    const changed = (subCategory) => {
        selectedSubCategory(subCategory);
        if (swiperRef.current) {
            const index = list.findIndex(c => c._id === subCategory._id);
            swiperRef.current.slideTo(index, 0);
        }
    };

    useEffect(() => {
        if (swiperRef.current && selectedSubCategory) {
            const index = list.findIndex(c => c._id === selectedSubCategory);
            if (index !== -1) {
                swiperRef.current.slideTo(index, 0);
            }
        }
    }, [selected, selectedSubCategory, list]);

    return (
        <>
            {loading ?
                <div className="flex w-full gap-5 my-4">
                    {[...Array(2)].map((i, key) =>
                        <div className="w-28 ml-3 space-y-5 p-4" key={key}>
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
                <Swiper
                    slidesPerView={2.8}
                    className="flex w-full gap-5 my-4"
                    breakpoints={{
                        320: {
                            slidesPerView: 2.8,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 3.8,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 6.5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {list.map((l) => (
                        <SwiperSlide key={l._id} onClick={() => changed(l)} className="text-center">
                            <div className="flex justify-center items-center">
                                <div className={selected === l._id ? `p-2 cursor-pointer border-2 border-black w-28` : 'p-2 cursor-pointer w-28'} radius="none">
                                    <img
                                        src={l.image}
                                        className="object-cover object-center h-24"
                                    />
                                    <div className="text-center text-sm">{l.name}</div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </>
    );
}

SubCategorySwiper.propTypes = {
    selectedSubCategory: PropTypes.func,
    loading: PropTypes.bool,
    list: PropTypes.array,
    selected: PropTypes.string
};

export default SubCategorySwiper;