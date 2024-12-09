import UserNavbar from "../UserNavbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAdoptionsByUser } from "../../../redux/adoptionsSlice";
import SingleAdoption from "./SingleAdoption";

function UserAdoptions() {
    const dispatch = useDispatch();

    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const meData = useSelector((state) => state.meFetch.value);
    const { data: adoptions, status, error } = useSelector((state) => state.adoptions);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        if (meData?.email ) {
            setUserEmail(meData.email);
        }
    }, [meData?.email]);

    useEffect(() => {
        if (userEmail) {
            dispatch(fetchAdoptionsByUser({ email: userEmail, page: 0, size: 10 }));
        }
    }, [dispatch, userEmail]);

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
                className={`bg-transparent ${toggleState ? "!ml-64" : "!ml-24"} transition-all duration-300 mt-28 !z-10`}
            >
                {adoptions && adoptions.length === 0 ? (
                    <div className="flex justify-center items-center  rounded-lg p-4 shadow-lg">
                        <p className="text-blue-800 font-bold text-lg">
                            Non ci sono adozioni al momento. Inizia subito la tua ricerca!
                        </p>
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
                                        {/* Passa i dati dell'adozione */}
                                        <SingleAdoption adoption={adoption} />
                                    </div>
                                ))}
                        </div>
                        <div className="flex w-full justify-center gap-2 py-2">
                            {adoptions &&
                                adoptions.map((_, index) => (
                                    <a
                                        key={index}
                                        className="btn btn-xs bg-reddino text-primary-color hover:text-whiteino border-whiteino hover:border-whiteino
                                        "
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
