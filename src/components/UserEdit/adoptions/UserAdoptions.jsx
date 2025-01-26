import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAdoptionsByUser } from "../../../redux/adoptionsSlice";
import UserNavbar from "../UserNavbar";
import SingleAdoption from "./SingleAdoption";
import { Button } from "@material-tailwind/react";
import golden from "../../../assets/goldenretriever.png";
import { Link } from "react-router-dom";

function UserAdoptions() {
    const dispatch = useDispatch();
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const meData = useSelector((state) => state.meFetch.value);
    const { data:adoptions, status, error } = useSelector((state) => state.adoptions);
    const [userEmail, setUserEmail] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        if (meData?.email) {
            setUserEmail(meData.email);
        }
    }, [meData?.email]);

    useEffect(() => {
        if (userEmail) {
            dispatch(fetchAdoptionsByUser({ email: userEmail, page: 0, size: 10 }));
        }
    }, [dispatch, userEmail]);

    useEffect(() => {
        const savedIndex = localStorage.getItem("activeAdoptionIndex");
        if (savedIndex !== null) {
            setActiveIndex(parseInt(savedIndex, 10));
        }
        console.log("adozioni" + JSON.stringify(adoptions))
    }, []);

    const handleAnchorClick = (e, index) => {
        e.preventDefault();
        setActiveIndex(index);
        localStorage.setItem("activeAdoptionIndex", index);
    };

    const toggleNavbarVisibility = (isModalOpen) => {
        setShowNavbar(!isModalOpen);
    };

    if (status === "loading") {
        return (
            <>
                <UserNavbar showModal={!showNavbar} />
                <div className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300 mt-24 !z-10 min-h-screen flex justify-center items-center`}>
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-color" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Caricamento...</span>
                    </div>
                </div>
            </>
        );
    }

    if (status === "failed") {
        return (
            <div className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300 mt-20 !z-10`}>
                Errore: {error}
            </div>
        );
    }

    return (
        <>
            <UserNavbar showModal={!showNavbar} />
            <div className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300 mt-24 !z-10 flex justify-center rounded-2xl relative flex-col items-center`}>
                <div className="absolute -left-44 -bottom-16 p-0 pointer-events-none select-none hidden xl:block">
                    <img src={golden} alt="golden" className="w-1/2" />
                </div>

                {adoptions && adoptions.length == 0 ? (
                    <div className="flex justify-center items-center rounded-lg p-4 shadow-lg flex-col bg-reddino w-full lg:w-1/3 md:mb-80 md:w-1/2">
                        <p className="text-whiteino font-bold text-lg mb-3">
                            Non ci sono adozioni attive al momento.
                        </p>
                        <Link to={"/dogs"}>
                            <Button className="bg-black hover:bg-grigino text-whiteino rounded-full">
                                Inizia subito la tua ricerca!
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="relative w-full overflow-hidden min-h-[1075px] lg:min-h-[525px]" >
                            {adoptions &&
                                adoptions.map((adoption, index) => (
                                    <div
                                        key={adoption.id}
                                        className="absolute w-full transition-all duration-500 ease-in-out flex justify-center"
                                        style={{
                                            opacity: index === activeIndex ? 1 : 0,
                                            transform: `translateX(${(index - activeIndex) * 100}%)`,
                                            pointerEvents: index === activeIndex ? 'auto' : 'none',
                                            zIndex: index === activeIndex ? 1 : 0,
                                            visibility: Math.abs(index - activeIndex) <= 1 ? 'visible' : 'hidden'
                                        }}
                                    >
                                        <SingleAdoption
                                            adoption={adoption}
                                            toggleNavbarVisibility={toggleNavbarVisibility}
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className="flex w-full justify-center gap-2 ">
                            {adoptions &&
                                adoptions.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`btn btn-xs ${index === activeIndex
                                            ? "bg-reddino text-whiteino"
                                            : "bg-transparent border-whiteino hover:text-whiteino"
                                            } px-2 py-0 rounded-full`}
                                        onClick={(e) => handleAnchorClick(e, index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default UserAdoptions;
