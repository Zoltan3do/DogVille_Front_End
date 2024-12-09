import AdoptionsProgressBar from "./AdoptionsProgressBar";
import { Button } from "@material-tailwind/react";

/* eslint-disable react/prop-types */
function SingleAdoption({ adoption }) {
    console.log(adoption);

    // Funzioni placeholder per azioni specifiche
    const handleUploadDocument = () => {
        console.log("Uploading document...");
    };

    const handleCompleteAdoption = () => {
        console.log("Completing adoption...");
    };

    const handleDownloadCertificate = () => {
        console.log("Downloading certificate...");
    };

    // Determina il contenuto del pulsante in base allo stato dell'adozione
    const renderButtonContent = () => {
        switch (adoption.state) {
            case "IN_ATTESA_DOCUMENTI":
                return (
                    <form onSubmit={handleUploadDocument} className="flex items-center w-full justify-between">
                        <div className="flex flex-col justify-center items-center">
                            <input
                                type="file"
                                id="document-upload"
                                className=" p-2 text-whiteino rounded-full "
                            />

                        </div>

                        <Button
                            type="submit"
                            className="bg-primary-color hover:bg-black text-whiteino rounded-full">
                            Invia documento
                        </Button>
                    </form>
                );
            case "IN_ATTESA_VISITA":
                return (
                    <Button
                        className="bg-gray-400 text-whiteino rounded-full cursor-not-allowed"
                        disabled>
                        Completa adozione
                    </Button>
                );
            case "VISITA_SUPERATA":
                return (
                    <Button
                        onClick={handleCompleteAdoption}
                        className="bg-primary-color hover:bg-black text-whiteino rounded-full">
                        Completa adozione
                    </Button>
                );
            case "ADOZIONE_COMPLETATA":
                return (
                    <Button
                        onClick={handleDownloadCertificate}
                        className="bg-primary-color hover:bg-black text-whiteino rounded-full">
                        Scarica certificato di adozione
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="card lg:card-side bg-reddino shadow-xl overflow-hidden rounded-2xl">
            <div className="w-1/3 ">
                <img
                    src={adoption.dog.profileImage}
                    alt={`Foto di ${adoption.dog.name}`}
                    className=" h-full  rounded-2xl object-cover"
                />
            </div>

            <div className="card-body text-primary-color ">
                <h2 className="font-semibold text-7xl mb-3">{adoption.dog.name}</h2>
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
                </div>
                <hr className="border-primary-color" />
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
                <div className="card-actions justify-center mt-5 flex items-center">
                    <h2 className="font-medium text-2xl">Timeline: </h2>
                    <AdoptionsProgressBar adoption={adoption}></AdoptionsProgressBar>
                </div>
                <div className="justify-end w-full flex mt-10">{renderButtonContent()}</div>
            </div>
        </div>
    );
}

export default SingleAdoption;
