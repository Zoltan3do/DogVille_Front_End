import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteAdoption, addAdoptionDocument } from "../../../redux/adoptionsSlice";
import { Button } from "@material-tailwind/react";
import AdoptionsProgressBar from "./AdoptionsProgressBar";

/* eslint-disable react/prop-types */
function SingleAdoption({ adoption }) {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const handleCompleteAdoption = useCallback(() => {
        console.log("Completing adoption...");
    }, []);

    const handleDownloadCertificate = useCallback(() => {
        console.log("Downloading certificate...");
    }, []);

    // Gestione della conferma di eliminazione
    const handleDeleteAdoption = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAdoption = () => {
        dispatch(deleteAdoption(adoption.id));
        setShowDeleteModal(false);
    };

    const cancelDeleteAdoption = () => {
        setShowDeleteModal(false);
    };

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

            {/* Modal di conferma eliminazione */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 sm:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Conferma Eliminazione</h3>
                        <p className="text-gray-600 mb-6">Sei sicuro di voler eliminare questa adozione per {adoption.dog.name}?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelDeleteAdoption}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={confirmDeleteAdoption}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Conferma
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleAdoption;
