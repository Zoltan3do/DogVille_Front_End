import { useSelector, useDispatch } from "react-redux";
import TooltipItem from "../TooltipItem";
import { useEffect, useState, useCallback } from "react";
import { executedogfetch } from "../../redux/singleDogFetch";
import { useParams } from "react-router-dom";
import ProgressBar2 from "../ProgressBar2";
import { calculateCompatibility } from "../../Utils";
import { fetchPsicologicalProfiles } from "../../redux/psicologicalProfilesSlice";

function DogDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const dog = useSelector((state) => state.dogFetch?.value);
    const user = useSelector((state) => state.meFetch?.value);
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const profiles = useSelector((state) => state.psicologicalProfiles.value);

    const [psy, setPsy] = useState("");
    const [compatibility, setCompatibility] = useState(null);


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
            const dogProfile = dog.dogsPsycologicalProfiles[dog?.dogsPsycologicalProfiles.length-1]?.type;
            const userProfile = user.usersPsycologicalProfiles?.[dog?.dogsPsycologicalProfiles.length-1]?.type;
            if (dogProfile && userProfile && profiles.length > 0) {
                const level = calculateCompatibility(profiles, userProfile, dogProfile);
                setCompatibility(level);
            }
        }
    }, [dog,user]);

    useEffect(() => {
        dispatch(executedogfetch(id));
    }, [dispatch, id]);

    useEffect(() => {
        psyStructuration();
    }, [psyStructuration]);

    useEffect(() => {
        dispatch(fetchPsicologicalProfiles());
    }, [dispatch]);


    useEffect(() => {
        calculateAffinity();
    }, [dog, profiles, calculateAffinity]);

    if (!dog || !user) {
        return <div className={`bg-transparent ${toggleState ? "!ml-64" : "!ml-24"} transition-all duration-300`}>Caricamento...</div>;
    }

    return (
        <div className={`bg-transparent ${toggleState ? "!ml-64 mb-10" : "!ml-24"} transition-all duration-300 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mr-7 mt-20`}>
            <div className="rounded-lg bg-gray-200 overflow-hidden bg-cover">
                <img src={dog.profileImage} alt="dogo" className="h-full object-cover" />
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

                <div className="flex justify-between items-end flex-col sm:flex-row">
                    <div className="w-2/4">
                        <h2 className="text-primary-color text-center font-semibold mb-2 text-lg">Livello di Affinità:</h2>
                        <ProgressBar2 value={compatibility} max={3} />
                    </div>

                    <div className="flex justify-end mb-2 mt-10 mr-10">
                        <button
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DogDetail;
