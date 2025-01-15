import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdoption, addAdoptionDocument } from "../../../redux/adoptionsSlice";
import { Button } from "@material-tailwind/react";
import AdoptionsProgressBar from "./AdoptionsProgressBar";
import DigitalSign from "./DigitalSign";
import { jsPDF } from "jspdf";
// import logo from "../../../assets/dogvilleLogo.jpg"

/* eslint-disable react/prop-types */
function SingleAdoption({ adoption, toggleNavbarVisibility }) {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [isSigned, setIsSigned] = useState(false);
    const meData = useSelector((state) => state.meFetch.value);
    const [showCertificateModal, setShowCertificateModal] = useState(false);

    const openSignatureModal = () => setShowSignatureModal(true);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleModalPreview = () => {
        setShowCertificateModal(true)
        toggleNavbarVisibility(showCertificateModal);
    }

    useEffect(() => {
        toggleNavbarVisibility(!showCertificateModal);
    }, [showCertificateModal, toggleNavbarVisibility]);

    const handleUploadDocument = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Seleziona un file prima di caricarlo.");
            return;
        }
        dispatch(addAdoptionDocument({ adoptionId: adoption.id, file: selectedFile }));
    };

    const handleDeleteAdoption = () => {
        if (adoption.state === "ADOZIONE_COMPLETATA") {
            alert("Non puoi eliminare un'adozione completata.");
        } else {
            setShowDeleteModal(true);
        }
    };

    const confirmDeleteAdoption = () => {
        dispatch(deleteAdoption(adoption.id));
        setShowDeleteModal(false);
    };

    const cancelDeleteAdoption = () => {
        setShowDeleteModal(false);
    };
    const handleDownloadCertificate = useCallback(() => {
        if (!adoption || !meData) {
            alert("Errore nella generazione del certificato. Riprova.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Certificato di Adozione", 10, 20);
        doc.setFontSize(14);
        doc.text(`Nome adottante: ${meData.name} ${meData.surname}`, 10, 40);
        doc.text(`Nome cane: ${adoption.dog.name}`, 10, 50);
        doc.text(`Data adozione: ${new Date(adoption.creationDate).toLocaleDateString()}`, 10, 60);
        doc.text("Grazie per aver dato una casa amorevole al tuo nuovo amico!", 10, 80);
        doc.setFontSize(16);
        doc.text("DOGVILLE ringrazia per l'adozione di...", 10, 100);
        doc.setFontSize(18);
        doc.text(adoption.dog.name.toUpperCase(), 10, 120);
        doc.setFontSize(14);
        const description = adoption.dog.description;
        const maxWidth = 180; 
        const wrappedText = doc.splitTextToSize(description, maxWidth);
        doc.text(wrappedText, 10, 130); 
        const image = adoption.dog.profileImage; 
        const imageWidth = 100; 
        const imageHeight = 100; 
        const xPosition = 50; 
        const yPosition = 150; 
        doc.addImage(image, 'JPEG', xPosition, yPosition, imageWidth, imageHeight);
        doc.save(`Certificato_Adozione_${adoption.dog.name}.pdf`);
    }, [adoption, meData]);



    const renderButtonContent = () => {
        switch (adoption.state) {
            case "IN_ATTESA_DOCUMENTI":
                return (
                    <form onSubmit={handleUploadDocument} className="flex items-center w-full justify-between">
                        <div className="flex flex-col justify-center items-center w-1/3">
                            <input
                                type="file"
                                id="document-upload"
                                className="w-full"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-primary-color hover:bg-black text-white rounded-full w-1/4 flex justify-center items-center p-2">
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
                return isSigned ? ( 
                    <Button
                        className="bg-gray-400 text-white rounded-full cursor-not-allowed"
                        disabled>
                        In attesa validazione firma
                    </Button>
                ) : (
                    <Button
                        onClick={openSignatureModal}
                        className="bg-primary-color hover:bg-black text-white rounded-full">
                        Firma adozione
                    </Button>
                );
            case "ADOZIONE_COMPLETATA":
                return (
                    <>
                        <Button
                            onClick={handleModalPreview}
                            className="bg-primary-color hover:bg-black text-white rounded-full"
                        >
                            Scarica certificato di adozione
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="card lg:card-side bg-reddino shadow-xl overflow-hidden rounded-2xl p-5 relative">
            {/* Bottone per eliminare l'adozione */}
            <button
                onClick={handleDeleteAdoption}
                className={`absolute top-2 right-2 z-10 bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors ${adoption.state === "ADOZIONE_COMPLETATA" ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={adoption.state === "ADOZIONE_COMPLETATA"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="card-body text-primary-color">
                {/* Immagine e nome del cane */}
                <div className="flex items-center gap-3 justify-center mb-5 flex-col lg:flex-row">
                    <img
                        src={adoption.dog.profileImage}
                        alt={`Foto di ${adoption.dog.name}`}
                        className="w-32 rounded-2xl object-cover h-24"
                    />
                    <h2 className="font-semibold text-7xl mb-3">{adoption.dog.name}</h2>
                </div>

                {/* Dettagli dell'adozione */}
                <div className="flex justify-center gap-5 my-3 flex-wrap">
                    <p className="text-center">
                        <span className="font-semibold">Età: </span>{adoption.dog.age} anni
                    </p>
                    <p className="text-center">
                        <span className="font-semibold">Taglia: </span>{adoption.dog.dogSize}
                    </p>
                    <p className="text-center">
                        <span className="font-semibold">Razza: </span>{adoption.dog.race}
                    </p>
                    <p className="text-center">
                        <span className="font-semibold">Genere: </span>{adoption.dog.gender == "M" ? "Maschio" : "Femmina"}
                    </p>
                    <p className="text-center">
                        <span className="font-semibold">Stato di salute: </span>{adoption.dog.healthState.replaceAll("_", " ")}
                    </p>
                </div>
                <hr className="border-primary-color" />

                <div className="flex justify-between flex-col lg:flex-row">

                    {/* Stato e data dell'adozione */}
                    <div className="flex flex-col gap-3">

                        <p>
                            <span className="font-semibold">Data inizio pratica: </span>
                            {new Date(adoption.creationDate).toLocaleDateString()}
                        </p>
                        {adoption.visitDate && (
                            <p className="">
                                <span className="font-semibold">Data visita programmata: </span>{adoption.visitDate}
                            </p>
                        )}
                        <p>
                            <span className="font-semibold">Status: </span>
                            {adoption.state.replaceAll("_", " ")}
                        </p>
                    </div>

                    {/* Anteprima del documento, se presente */}
                    {adoption.document && (
                        <div className="flex flex-col justify-center items-center mt-5 lg:mt-0">
                            <p className="font-medium mb-2">Documento caricato:</p>
                            <img
                                src={adoption?.document}
                                alt="Documento caricato"
                                className="w-24 h-auto border rounded"
                            />
                        </div>
                    )}
                </div>

                {/* Barra di progresso */}
                    <AdoptionsProgressBar adoption={adoption}></AdoptionsProgressBar>

                {/* Pulsanti dinamici */}
                <div className="justify-end w-full flex mt-10">{renderButtonContent()}</div>
            </div>

            {showSignatureModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 sm:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Firma Adozione</h3>
                        <DigitalSign name={meData.name + " " + meData.surname} />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowSignatureModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Adoption signed!");
                                    setIsSigned(true);
                                    setShowSignatureModal(false);
                                }}
                                className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-black"
                            >
                                Firma qui
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

            {showCertificateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 !z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 sm:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Certificato di Adozione</h3>
                        <p className="mb-2">Anteprima del certificato</p>
                        <div className="text-primary-color mb-5">
                            <h1 className="text-4xl font-semibold text-center mb-2">CERTIFICATO DI ADOZIONE</h1>
                            <p className="text-center text-xl font-medium">DOGVILLE ringrazia</p>
                            <p className="text-center text-xl font-medium">per l&apos;adozione di...</p>
                        </div>
                        <div className="flex gap-2 flex-col lg:flex-row items-center lg:items-start">
                            <img src={adoption.dog.profileImage} alt="dog" className="w-1/3 rounded-xl" />
                            <div>
                                <p className="text-primary-color mb-4 text-2xl font-bold ">{adoption.dog.name.toUpperCase()}</p>
                                <p className="text-primary-color">{adoption.dog.description}</p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-3 lg:mt-0">
                            <button
                                onClick={() => setShowCertificateModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Chiudi
                            </button>
                            <button
                                onClick={handleDownloadCertificate}
                                className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-black"
                            >
                                Scarica certificato
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleAdoption;
