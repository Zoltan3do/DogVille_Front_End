import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAdoptionsByUser } from "../../../redux/adoptionsSlice";
import UserNavbar from "../UserNavbar";
import SingleAdoption from "./SingleAdoption";
import { Button } from "@material-tailwind/react";
import golden from "../../../assets/goldenretriever.png"
import { Link } from "react-router-dom";

function UserAdoptions() {
    const dispatch = useDispatch();
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const meData = useSelector((state) => state.meFetch.value);
    const { data: adoptions, status, error } = useSelector((state) => state.adoptions);
    const [userEmail, setUserEmail] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

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

    const handleAnchorClick = (e, index) => {
        e.preventDefault();

        const targetId = `#item${index + 1}`;
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        setActiveIndex(index);
    };

    if (status === "loading") {
        return (
            <p
                className={`bg-transparent ${toggleState ? "!ml-64" : "!ml-24"} transition-all duration-300 mt-20 !z-10`}
            >
                Caricamento in corso...
            </p>
        );
    }

    if (status === "failed") {
        return (
            <p
                className={`bg-transparent ${toggleState ? "!ml-64" : "!ml-24"} transition-all duration-300 mt-20 !z-10`}
            >
                Errore: {error}
            </p>
        );
    }

    return (
        <>
            <UserNavbar />
            <div
                className={`bg-transparent ${toggleState ? "!ml-64" : "!ml-24"} transition-all duration-300 mt-20 !z-10 flex justify-center rounded-2xl relative flex-col items-center`}
            >
                <div className="absolute -left-44
                 -bottom-24 p-0 pointer-events-none select-none
            ">
                    <img src={golden} alt="golden" className="w-1/2" />
                </div>

                {adoptions && adoptions.length === 0 ? (
                    <div className="flex justify-center items-center rounded-lg p-4 shadow-lg flex-col bg-reddino w-1/3 mb-96">
                        <p className="text-whiteino font-bold text-lg mb-3">
                            Non ci sono adozioni al momento.
                        </p>
                        <Link to={"/dogs"}>
                            <Button

                                className="bg-black hover:bg-grigino text-whiteino rounded-full"
                            >
                                Inizia subito la tua ricerca!
                            </Button>
                        </Link>

                    </div>
                ) : (
                    <>
                        <div className="carousel bg-transparent ">
                            {adoptions &&
                                adoptions.map((adoption, index) => (
                                    <div
                                        key={adoption.id}
                                        id={`item${index + 1}`}
                                        className="carousel-item w-full justify-center"
                                    >
                                        <SingleAdoption adoption={adoption} />
                                    </div>
                                )).reverse()}
                        </div>
                        <div className="flex w-full justify-center gap-2 py-2">
                            {adoptions &&
                                adoptions.map((_, index) => (
                                    <a
                                        key={index}
                                        className={`btn btn-xs text-whiteino ${index === activeIndex
                                            ? "bg-reddino text-whiteino border-whiteino"
                                            : "bg-transparent text-primary-color border-whiteino hover:text-whiteino"
                                            }`}
                                        href={`#item${index + 1}`}
                                        onClick={(e) => handleAnchorClick(e, index)}
                                    >
                                        {index + 1}
                                    </a>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default UserAdoptions;
