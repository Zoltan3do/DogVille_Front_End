import UserNavbar from "../UserNavbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAdoptionsByUser } from "../../../redux/adoptionsSlice";
import SingleAdoption from "./SingleAdoption";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";


function UserAdoptions() {
    const dispatch = useDispatch();

    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const meData = useSelector((state) => state.meFetch.value);
    const { data: adoptions, status, error } = useSelector((state) => state.adoptions);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        if (meData?.email) {
            setUserEmail(meData.email);
        }
    }, [meData]);

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
                className={`bg-transparent ${toggleState ? "!ml-64" : "!ml-24"} transition-all duration-300 mt-20 !z-10 flex justify-center`}
            >
                {adoptions && adoptions.length === 0 ? (
                    <div className="flex justify-center items-center bg-reddino rounded-2xl p-4 shadow-lg flex-col w-2/3">
                        <p className="text-primary-color font-bold text-lg mb-3">
                            Non ci sono adozioni al momento.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to={"/dogs"}>
                                <Button
                                    className="bg-primary-color hover:bg-black text-whiteino rounded-full"
                                >
                                    Inizia subito la tua ricerca!
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="carousel w-full">
                            {adoptions &&
                                adoptions.map((adoption, index) => (
                                    <div
                                        key={adoption.id}
                                        id={`item${index + 1}`}
                                        className="carousel-item w-full"
                                    >
                                        <SingleAdoption adoption={adoption} />
                                    </div>
                                ))}
                        </div>
                        <div className="flex w-full justify-center gap-2 py-2">
                            {adoptions &&
                                adoptions.map((_, index) => (
                                    <a
                                        key={index}
                                        href={`#item${index + 1}`}
                                        className="btn btn-xs"
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
