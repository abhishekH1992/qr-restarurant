import ImageSkeleton from "./skeleton/ImageSkeleton";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
const Banner = ({ loading, banners }) => {
    return (
        <div className="my-2 lg:my-8">
            {loading ?
                <div>
                    <ImageSkeleton cssClasses={`h-350 rounded-lg bg-secondary`} iterations={1} />
                </div>
            :
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1}
                    className="rounded-lg"
                >
                    {banners.map((list, key) => (
                        <SwiperSlide key={key} ><img src={list} className="w-full md:h-56 sm:h-64 xl:h-80 2xl:h-96"/></SwiperSlide>
                    ))}
                </Swiper>
            }
        </div>
    );
}

export default Banner;