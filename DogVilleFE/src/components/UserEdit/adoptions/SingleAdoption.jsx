import AdoptionsProgressBar from "./AdoptionsProgressBar";
import { Button } from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAdoption, addAdoptionDocument } from "../../../redux/adoptionsSlice";

/* eslint-disable react/prop-types */
function SingleAdoption({ adoption }) {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadDocument = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Seleziona un file prima di caricarlo.");
            return;
        }
        dispatch(addAdoptionDocument({ adoptionId: adoption.id, file: selectedFile }));
    };

    const handleDeleteAdoption = useCallback(() => {
        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questa adozione?");
        if (confirmDelete) {
            dispatch(deleteAdoption(adoption.id));
        }
    }, [dispatch, adoption.id]);

    const handleCompleteAdoption = useCallback(() => {
        console.log("Completing adoption...");
    }, []);

    const handleDownloadCertificate = useCallback(() => {
        console.log("Downloading certificate...");
    }, []);



    const renderButtonContent = () => {
        switch (adoption.state) {
            case "IN_ATTESA_DOCUMENTI":
                return (
                    <form onSubmit={handleUploadDocument} className="flex items-center w-full justify-between">
                        <div className="flex flex-col justify-center items-center">
                            <input
                                type="file"
                                id="document-upload"
                                className="p-2"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-primary-color hover:bg-black text-white rounded-full">
                            {adoption.document ? "Reinvia nuovo documento" : "Invia documento"}
                        </Button>
                    </form>
                );
            case "IN_ATTESA_VISITA":
                return (
                    <Button
                        className="bg-gray-400 text-white rounded-full cursor-not-allowed"
                        disabled>
                        Completa adozione
                    </Button>
                );
            case "VISITA_SUPERATA":
                return (
                    <Button
                        onClick={handleCompleteAdoption}
                        className="bg-primary-color hover:bg-black text-white rounded-full">
                        Completa adozione
                    </Button>
                );
            case "ADOZIONE_COMPLETATA":
                return (
                    <Button
                        onClick={handleDownloadCertificate}
                        className="bg-primary-color hover:bg-black text-white rounded-full">
                        Scarica certificato di adozione
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="card lg:card-side bg-reddino shadow-xl overflow-hidden rounded-2xl">
            {/* Bottone per eliminare l'adozione */}
            <button
                onClick={handleDeleteAdoption}
                className="absolute top-2 right-2 z-10 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="card-body text-primary-color">
                {/* Immagine e nome del cane */}
                <div className="flex items-center gap-3 justify-center mb-5">
                    <img
                        src={adoption.dog.profileImage}
                        alt={`Foto di ${adoption.dog.name}`}
                        className="w-32 rounded-2xl object-cover"
                    />
                    <h2 className="font-semibold text-7xl mb-3">{adoption.dog.name}</h2>
                </div>

                {/* Dettagli dell'adozione */}
                <div className="flex justify-center my-3">
                    <p className="text-center">
                        <span className="font-semibold">Età: </span>{adoption.dog.age} anni
                    </p>
                    <p className="text-center">
                        <span className="font-semibold">Taglia: </span>{adoption.dog.dogSize}
                    </p>
                    <p className="text-center">
                        <span className="font-semibold">Razza: </span>{adoption.dog.race}
                    </p>
                    {
                        adoption.visitDate && <p className="text-center">
                            <span className="font-semibold">Data visita programmata: </span>{adoption.visitDate}
                        </p>
                    }
                </div>
                <hr className="border-primary-color" />

                <div className="flex justify-between ">

                    {/* Stato e data dell'adozione */}
                    <div className="mt-5">
                        <p>
                            <span className="font-semibold">Data inizio pratica: </span>
                            {new Date(adoption.creationDate).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-semibold">Status: </span>
                            {adoption.state.replaceAll("_", " ")}
                        </p>
                    </div>

                    {/* Anteprima del documento, se presente */}
                    {adoption.document && (
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-medium mb-2">Documento caricato:</p>
                            <img
                                src={adoption?.document}
                                alt="Documento caricato"
                                className="w-32 h-auto border rounded"
                            />
                        </div>
                    )}
                    <div className="w-1/4">

                    </div>

                </div>


                {/* Barra di progresso */}
                <div className="card-actions justify-center mt-5 flex items-center">
                    <h2 className="font-medium text-2xl">Progresso: </h2>
                    <AdoptionsProgressBar adoption={adoption}></AdoptionsProgressBar>
                </div>

                {/* Pulsanti dinamici */}
                <div className="justify-end w-full flex mt-10">{renderButtonContent()}</div>
            </div>
        </div>
    );
}

export default SingleAdoption;
