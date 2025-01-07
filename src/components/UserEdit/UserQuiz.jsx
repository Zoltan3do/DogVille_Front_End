import UserNavbar from "./UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { addProfileToUser } from "../../redux/meSlice"
import dalmata from "../../assets/dalmata.png"
import { Link } from "react-router-dom";
import { determinaProfiloPadrone } from "../../Utils";

function UserQuiz() {
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const meData = useSelector((state) => state.meFetch.value);
    const dispatch = useDispatch();


    const quizData = [
        {
            id: 1,
            question: "Quanto tempo puoi dedicare ogni giorno a fare attività fisica con il cane?",
            options: [
                { text: "Molto", score: 3 },
                { text: "Moderato", score: 2 },
                { text: "Poco", score: 1 }
            ]
        },
        {
            id: 2,
            question: "Come descriveresti il tuo stile di vita?",
            options: [
                { text: "Molto attivo", score: 3 },
                { text: "Moderato", score: 2 },
                { text: "Molto rilassato", score: 1 },
            ]
        },
        {
            id: 3,
            question: "Quanto ti piace trascorrere tempo all'aperto?",
            options: [
                { text: "Molto", score: 3 },
                { text: "Moderatamente", score: 2 },
                { text: "Poco", score: 1 },
            ]
        },
        {
            id: 4,
            question: "Quanto ti piace avere contatto fisico con il cane (coccole, vicinanza)?",
            options: [
                { text: "Molto", score: 3 },
                { text: "Moderato", score: 2 },
                { text: "Poco", score: 1 },
            ]
        },
        {
            id: 5,
            question: "Che tipo di temperamento ti senti di tollerare in un cane?",
            options: [
                { text: "Vivace", score: 3 },
                { text: "Medio", score: 2 },
                { text: "Molto calmo", score: 1 },
            ]
        },
        {
            id: 6,
            question: "Quanto spazio hai a disposizione in casa?",
            options: [
                { text: "Ampio, con giardino", score: 3 },
                { text: "Medio, come un appartamento grande ", score: 2 },
                { text: "Piccolo, senza spazi esterni", score: 1 },
            ]
        }
    ];

    const [hasConsented, setHasConsented] = useState(false);
    const [responses, setResponses] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [psy, setPsy] = useState("");

    const psyStructuration = useCallback(() => {
        if (meData?.usersPsycologicalProfiles) {
            const profiles = meData.usersPsycologicalProfiles
                .map((profile) => profile.type.toUpperCase())
                .join(" / ");
            setPsy(profiles);
        }
    }, [meData?.usersPsycologicalProfiles]);

    const handleResponse = (selectedOption) => {
        const newResponse = {
            questionId: quizData[currentQuestionIndex].id,
            question: quizData[currentQuestionIndex].question,
            response: selectedOption.text,
            score: selectedOption.score
        };

        const updatedResponses = [...responses, newResponse];
        setResponses(updatedResponses);

        if (currentQuestionIndex === quizData.length - 1) {
            setIsQuizComplete(true);
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const resetQuiz = () => {
        setResponses([]);
        setCurrentQuestionIndex(0);
        setIsQuizComplete(false);
        setHasConsented(false);
        setPsy("");
    };

    useEffect(() => {
        if (isQuizComplete) {
            const scores = responses.map(response => response.score);
            const profilo = determinaProfiloPadrone(scores);
            console.log("meData.id", meData?.id);
            console.log("Profilo determinato:", profilo);
            if (meData?.id && profilo) {
                dispatch(addProfileToUser({ userId: meData.id, profileType: profilo }));
            } else {
                console.error("Errore: meData.id o profilo non definiti");
            }
        }
    }, [dispatch, isQuizComplete, meData?.id, responses]);


    useEffect(() => {
        psyStructuration();
    }, [psyStructuration]);

    useEffect(() => {
        console.log(responses);
    }, [responses]);

    return (
        <>
            <UserNavbar />
            <div
                className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300 mt-28 !z-10 relative mb-72`}
            >
                {!hasConsented ? (
                    <div className="flex justify-center items-center">
                        <Card className="w-full max-w-md bg-reddino">
                            <CardHeader className="p-2">
                                <h2 className="text-center text-primary-color mb-3">
                                    {psy === "" ? "Non hai ancora un profilo psicologico assegnato " : `Il tuo attuale profilo psicologico è: ${psy}`}</h2>
                                <h2 className="text-2xl font-bold text-center text-primary-color">
                                    Vuoi iniziare il quiz?
                                </h2>
                            </CardHeader>
                            <CardBody>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        onClick={() => setHasConsented(true)}
                                        className="bg-primary-color hover:bg-black text-whiteino rounded-full"
                                    >
                                        Sì, voglio iniziare
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ) : isQuizComplete ? (
                    <div className="flex justify-center items-center">
                        <Card className="w-full max-w-md bg-reddino">
                            <CardHeader>
                                <h2 className="text-2xl font-bold text-center text-primary-color">
                                    Quiz Completato
                                </h2>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4 " id="sidenav">
                                    <h2 className="text-xl font-semibold text-center text-primary-color">
                                        Grazie per aver completato il quiz!
                                    </h2>
                                    <div className="max-h-60 overflow-y-auto" id="sidenav">
                                        {responses.map((resp, index) => (
                                            <div
                                                key={index}
                                                className="bg-whiteino p-2 rounded mb-2"
                                            >
                                                <strong>{resp.question}</strong>: {resp.response} (Punteggio: {resp.score})
                                            </div>
                                        ))}
                                    </div>
                                    <h2 className="text-xl font-semibold text-center text-primary-color ">
                                        Profilo psicologico: {psy}
                                    </h2>
                                </div>
                            </CardBody>
                            <CardFooter className="flex gap-2 ">
                                <Button
                                    onClick={resetQuiz}
                                    className="w-full bg-primary-color hover:bg-black text-whiteino"
                                >
                                    Ricomincia Quiz
                                </Button>
                                <Link to={"/"} className="w-full">
                                    <Button className=" bg-primary-color hover:bg-black text-whiteino">
                                        Torna all&apos; home
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <Card className="w-full max-w-md bg-reddino">
                            <CardHeader>
                                <h2 className="text-2xl font-bold text-center text-primary-color">
                                    Quiz Psicologico
                                </h2>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-center text-primary-color">
                                        {quizData[currentQuestionIndex].question}
                                    </h2>
                                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                                        {quizData[currentQuestionIndex].options.map((option, index) => (
                                            <Button
                                                key={option.text}
                                                onClick={() => handleResponse(option)}
                                                className={`w-full bg-primary-color hover:bg-black text-whiteino ${index === 2 ? 'col-span-2 justify-self-center' : ''
                                                    }`}
                                            >
                                                {option.text}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className="w-full text-center text-primary-color">
                                    Domanda {currentQuestionIndex + 1} di {quizData.length}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                )}


                <img src={dalmata} alt="shitsu" className="w-1/4 absolute right-60
                 -bottom-80  p-0 pointer-events-none select-none hidden lg:block" />
            </div>
        </>
    );
}

export default UserQuiz;
