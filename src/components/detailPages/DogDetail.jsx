import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TooltipItem from "../TooltipItem";
import ProgressBar2 from "../ProgressBar2";
import { executedogfetch } from "../../redux/singleDogFetch";
import { fetchPsicologicalProfiles } from "../../redux/psicologicalProfilesSlice";
import { createAdoption } from "../../redux/adoptionsSlice";
import { calculateCompatibility } from "../../Utils";

function DogDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const dog = useSelector((state) => state.dogFetch?.value);
    const user = useSelector((state) => state.meFetch?.value);
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const profiles = useSelector((state) => state.psicologicalProfiles.value);
    const adoptionStatus = useSelector((state) => state.adoptions.status);

    const [psy, setPsy] = useState("");
    const [compatibility, setCompatibility] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const psyStructuration = useCallback(() => {
        if (dog?.dogsPsycologicalProfiles) {
            const profiles = dog.dogsPsycologicalProfiles
                .map((profile) => profile.type.toUpperCase())
                .join(" / ");
            setPsy(profiles);
        }
    }, [dog]);

    const calculateAffinity = useCallback(() => {
        if (dog && user) {
            const dogProfile = dog.dogsPsycologicalProfiles[dog?.dogsPsycologicalProfiles.length - 1]?.type;
            const userProfile = user.usersPsycologicalProfiles?.[dog?.dogsPsycologicalProfiles.length - 1]?.type;
            if (dogProfile && userProfile && profiles.length > 0) {
                const level = calculateCompatibility(profiles, userProfile, dogProfile);
                setCompatibility(level);
            }
        }
    }, [dog, user, profiles]);


    useEffect(() => {
        dispatch(executedogfetch(id));
        dispatch(fetchPsicologicalProfiles());
    }, [dispatch, id]);

    useEffect(() => {
        setCompatibility(null);
        calculateAffinity();
    }, [dog?.id, user, profiles, calculateAffinity]);

    useEffect(() => {
        psyStructuration();
    }, [dog, psyStructuration]);

    if (!dog || !user) {
        return <p
            className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300 mt-20 !z-10`}
        >
            <div role="status" className="min-h-screen flex justify-center">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-color" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </p>;
    }

    const handleAdoptionClick = () => {
        setShowModal(true);
    };

    const confirmAdoption = () => {
        setShowModal(false);
        if (user?.role !== "ADMIN" && dog) {
            const adoptionData = {
                caneId: dog?.id,
                userEmail: user?.email,
            };

            dispatch(createAdoption(adoptionData)).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    navigate('/adozioni');
                }
            });
        }
    };

    return (
        <div className={`bg-transparent ${toggleState ? "lg:ml-64 mb-10" : "lg:ml-24"} transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-2 lg:mt-20 mx-10`}>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 sm:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Conferma Adozione</h3>
                        <p className="text-gray-600 mb-6">Sei sicuro di voler richiedere l&apos;adozione per {dog.name}?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={confirmAdoption}
                                className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-dark"
                            >
                                Conferma
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="rounded-lg bg-gray-200 overflow-hidden bg-cover w-full h-full relative">
                <img
                    src={dog.profileImage}
                    alt="dogo"
                    className="w-full h-full object-cover top-0 left-0"
                />
            </div>


            <div className="rounded-lg bg-gray-200 lg:col-span-2 p-5">
                <h2 className="text-center text-primary-color text-4xl font-semibold mb-5">{dog.name}</h2>
                <p className="text-primary-color text-xl italic">{dog.description}</p>

                <section className="bg-gray-2 dark:bg-dark">
                    <h3 className="mt-7 text-primary-color text-2xl">Caratteristiche:</h3>
                    <hr className="border-primary-color" />
                    <div className="flex flex-wrap justify-center mt-5">
                        <TooltipItem tooltipsText="Età" className="text-whiteino">{dog.age} ANNI</TooltipItem>
                        <TooltipItem tooltipsText="Taglia" className="text-whiteino">{dog.dogSize}</TooltipItem>
                        <TooltipItem tooltipsText="Adozione" className="text-whiteino">
                            {dog.adopted ? "ADOTTATO" : "NON ADOTTATO"}
                        </TooltipItem>
                        <TooltipItem tooltipsText="Stato di salute" className="text-whiteino">
                            {dog.healthState?.replaceAll("_", " ")}
                        </TooltipItem>
                        <TooltipItem tooltipsText="Genere" className="text-whiteino">
                            {dog.gender === "M" ? "MASCHIO" : "FEMMINA"}
                        </TooltipItem>
                        <TooltipItem tooltipsText="Svezzatura" className="text-whiteino">
                            {dog.weaned ? "SVEZZATO" : "NON SVEZZATO"}
                        </TooltipItem>
                        <TooltipItem tooltipsText="Data dell' inserzione" className="text-whiteino">
                            {dog.insertionDate}
                        </TooltipItem>
                        <TooltipItem tooltipsText="Profilo psicologico" className="text-whiteino">
                            {psy || "NON DISPONIBILE"}
                        </TooltipItem>
                    </div>
                </section>

                <div className="flex justify-between md:items-end flex-col sm:flex-row items-center">
                    <div className="w-2/4">
                        <h2 className="text-primary-color text-center font-semibold mb-2 text-lg">Livello di Affinità:</h2>
                        <ProgressBar2 value={compatibility} max={3} />
                    </div>

                    <div className="flex justify-end  md:mt-10 ">
                        {dog.adoption !== null ? (
                            <button
                                disabled
                                className="cursor-not-allowed inline-flex items-center justify-center px-3.5 py-2.5 font-medium text-gray-400 border-2 border-gray-400 rounded-lg shadow-md"
                            >
                                <span className="text-base font-semibold">
                                    ADOZIONE NON DISPONIBILE
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={handleAdoptionClick}
                                disabled={user?.role === "ADMIN" || adoptionStatus === 'loading'}
                                className="relative inline-flex items-center justify-center px-3.5 py-2.5 overflow-hidden font-medium text-primary-color transition duration-300 ease-out border-2 border-primary-color rounded-lg shadow-md group"
                            >
                                <span
                                    className="absolute inset-0 flex items-center justify-center w-full h-full text-white transition duration-300 -translate-x-full bg-primary-color group-hover:translate-x-0 ease"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="absolute flex items-center text-base font-semibold justify-center w-full h-full text-primary-color transition-all duration-300 transform group-hover:translate-x-full ease">
                                    {user?.role === "ADMIN"
                                        ? "MODIFICA CARATTERISTICHE"
                                        : `DAI UNA CASA A ${dog?.name?.toUpperCase()}`}
                                </span>
                                <span className="relative text-base font-semibold invisible">
                                    {user?.role === "ADMIN"
                                        ? "MODIFICA CARATTERISTICHE"
                                        : `DAI UNA CASA A ${dog?.name?.toUpperCase()}`}
                                </span>
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DogDetail;
