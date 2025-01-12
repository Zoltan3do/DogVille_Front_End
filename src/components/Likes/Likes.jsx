import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Favourites() {
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const user = useSelector((state) => state.meFetch.value);
    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            <div className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300 lg:mt-10 mb-20 xl:gap-52   !z-10 flex flex-col lg:flex-row  items-center justify-center rounded-2xl relative`}>
                <div>
                <Swiper
                    effect={'cube'}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 30,
                        shadowScale: 0.8,
                    }}
                    pagination={true}
                    modules={[EffectCube, Pagination]}
                    className="swiper-cube-shadow"
                >
                    {
                        user?.likes.map((item, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <img src={item.profileImage} className='w-full h-full object-cover ' />
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>
                </div>
               

            </div>
        </>
    );
}

export default Favourites;
