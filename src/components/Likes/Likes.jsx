import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

function Favourites() {
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const user = useSelector((state) => state.meFetch.value);

    useEffect(() => {
    }, [user]);

    const hasLikes = user?.likes && user.likes.length > 0;

    return (
        <div className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300 flex flex-col`}>
            {/* Header animato */}
            <div className="text-center mt-8">
                <div className="inline-flex items-center gap-3 animate-bounce">
                    <Heart className="w-8 h-8 text-red-500" fill="red" />
                    <h1 className="text-4xl font-bold text-whiteino">I Tuoi Preferiti</h1>
                    <Heart className="w-8 h-8 text-red-500" fill="red" />
                </div>
                <p className="text-whiteino mt-4 text-lg animate-fade-in">
                    Qui trovi tutti i cuccioli che hai scelto di seguire
                </p>
            </div>

            {/* Container principale centrato */}
            <div className="mt-8 flex items-center justify-center px-4">
                {hasLikes ? (
                    <div className="w-full max-w-xl flex flex-col items-center">
                        {/* Counter animato */}
                        <div className="text-center mb-6">
                            <span className="inline-block bg-red-500 text-white px-4 py-2 rounded animate-pulse">
                                {user.likes.length} {user.likes.length === 1 ? 'Preferito' : 'Preferiti'}
                            </span>
                        </div>

                        {/* Container del cubo con dimensioni fisse */}
                        <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
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
                                className="h-full w-full rounded-lg"
                            >
                                {user.likes.map((item, i) => (

                                    <SwiperSlide className="w-full h-full" key={i}>
                                        <Link to={`/dog/${item.id}`}>
                                            <div className="relative w-full h-full group">
                                                <img
                                                    src={item.profileImage}
                                                    alt={`Cane preferito ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <p className="text-white text-xl font-bold">{item.name}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>

                                ))}
                            </Swiper>
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-12 rounded-lg shadow-lg bg-opacity-20 bg-white backdrop-blur-sm max-w-xl w-full">
                        <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 animate-bounce" />
                        <h2 className="text-3xl font-bold text-whiteino mb-4">
                            Nessun cane tra i preferiti
                        </h2>
                        <p className="text-whiteino text-lg mb-6">
                            Non hai ancora aggiunto nessun cane ai tuoi preferiti.
                            Inizia la tua avventura!
                        </p>
                        <Link
                            to="/dogs"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 text-lg font-semibold"
                        >
                            Scopri i nostri cani
                            <Heart className="w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favourites;