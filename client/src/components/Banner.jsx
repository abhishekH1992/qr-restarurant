import ImageSkeleton from "./skeleton/ImageSkeleton";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useSite } from "../context/SiteContext";

const Banner = () => {
    const { site, loading } = useSite();
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
                    {site && site.site && site.site.banner && site.site.banner.map((list, key) => (
                        <SwiperSlide key={key} ><img src={list} className="w-full md:h-56 sm:h-64 xl:h-80 2xl:h-96"/></SwiperSlide>
                    ))}
                </Swiper>
            }
        </div>
    );
}

export default Banner;