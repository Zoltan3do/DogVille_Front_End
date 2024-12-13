/* eslint-disable react/prop-types */

import { useEffect } from "react";

function AdoptionsProgressBar({ adoption }) {
    const stateSteps = {
        IN_ATTESA_DOCUMENTI: 1,
        IN_ATTESA_VISITA: 2,
        VISITA_SUPERATA: 3,
        ADOZIONE_COMPLETATA: 4,
    };

    const activeStep = stateSteps[adoption.state] || 0;

    useEffect(() => {
        console.log(adoption.visitDate)
    }, [])

    return (
        <>
            <ul className="timeline text-whiteino">
                <li>
                    <div
                        className={`timeline-start timeline-box ${activeStep >= 1 ? "bg-primary-color text-whiteino" : "bg-grigiastro text-primary-color"
                            }`}
                    >
                        {activeStep >= 2 ? "Documento validato" : "In attesa validazione documento"}
                    </div>
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-5 w-5 ${activeStep >= 1 ? "text-primary-color" : "text-whiteino"} ${activeStep === 1 ? "scale-150" : ""}`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <hr className={`${activeStep >= 2 ? "bg-primary-color" : "bg-whiteino"}`} />
                </li>
                <li>
                    <hr className={`${activeStep >= 2 ? "bg-primary-color" : "bg-whiteino"}`} />
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-5 w-5 ${activeStep >= 2 ? "text-primary-color" : "text-whiteino"} ${activeStep === 2 ? "scale-150" : ""}`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div
                        className={`timeline-end timeline-box ${activeStep >= 2 ? "bg-primary-color text-whiteino" : "bg-grigiastro text-primary-color"
                            }`}
                    >
                        {activeStep >= 3 || adoption?.visitDate != null ? "Data visita programmata" : "In attesa data visita"}
                    </div>
                    <hr className={`${activeStep >= 3 ? "bg-primary-color" : "bg-whiteino"}`} />
                </li>
                <li>
                    <hr className={`${activeStep >= 3 ? "bg-primary-color" : "bg-whiteino"}`} />
                    <div
                        className={`timeline-start timeline-box ${activeStep >= 3 ? "bg-primary-color text-whiteino" : "bg-grigiastro text-primary-color"
                            }`}
                    >
                        {activeStep >= 4 || adoption.state == "VISITA_SUPERATA" ? "Visita superata" : "In attesa visita"}
                    </div>
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-5 w-5 ${activeStep >= 3 ? "text-primary-color" : "text-whiteino"} ${activeStep === 3 ? "scale-150" : ""}`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <hr className={`${activeStep >= 4 ? "bg-primary-color" : "bg-whiteino"}`} />
                </li>
                <li>
                    <hr className={`${activeStep >= 4 ? "bg-primary-color" : "bg-whiteino"}`} />
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-5 w-5 ${activeStep >= 4 ? "text-primary-color" : "text-whiteino"} ${activeStep === 4 ? "scale-150" : ""}`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div
                        className={`timeline-end timeline-box ${activeStep >= 4 ? "bg-primary-color text-whiteino" : "bg-grigiastro text-primary-color"
                            }`}
                    >
                        {activeStep >= 4 ? "Adozione completata" : "In attesa firma"}
                    </div>
                </li>
            </ul>
        </>
    );
}

export default AdoptionsProgressBar;
