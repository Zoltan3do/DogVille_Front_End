import { useSelector } from "react-redux";


function Terms() {
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    
    return (
        <div className={`min-h-screen bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300`}>
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-transparent rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-whiteino mb-8">Termini di Servizio</h1>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold whiteino mb-4">1. Accettazione dei Termini</h2>
                        <div className="prose text-whiteino">
                            <p>Accedendo e utilizzando questo sito web, accetti e concordi di essere vincolato dai termini e dalle disposizioni di questo accordo.</p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-whiteino mb-4">2. Licenza di Utilizzo</h2>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex gap-3">
                                    <svg className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>È consentito scaricare temporaneamente una copia del materiale per una visione personale e transitoria non commerciale.</span>
                                </li>
                                <li className="flex gap-3">
                                    <svg className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Questa è la concessione di una licenza, non un trasferimento di proprietà.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-whiteino mb-4">3. Esclusione di Responsabilità</h2>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        I materiali su questo sito web sono forniti &apos;così come sono&apos;. Non forniamo garanzie esplicite o implicite e decliniamo tutte le altre garanzie, comprese, senza limitazioni, garanzie implicite di commerciabilità, idoneità per uno scopo particolare o non violazione di proprietà intellettuale o altri diritti.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-whiteino mb-4">4. Limitazioni</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-2">Limitazioni Temporali</h3>
                                <p className="text-gray-600">I reclami devono essere presentati entro 30 giorni dall&apos;incidente.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-2">Responsabilità</h3>
                                <p className="text-gray-600">Non saremo ritenuti responsabili per eventuali danni.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-whiteino mb-4">5. Revisioni</h2>
                        <div className="prose text-whiteino">
                            <p>Potremmo modificare questi termini di servizio in qualsiasi momento senza preavviso. Utilizzando questo sito web, accetti di essere vincolato dalla versione corrente di questi termini di servizio.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-whiteino mb-4">6. Contatti</h2>
                        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
                            <p className="text-gray-600">Domande sui Termini di Servizio?</p>
                            <a href="mailto:baronemanuel05@gmail.com" className="inline-flex items-center text-grigino hover:text-primary-color">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contattaci
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default Terms