import { useSelector } from "react-redux";

function PrivacyPolicy() {
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    return (
        <div className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300`}>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Informativa sulla Privacy</h1>

                <p className="mb-4">
                    Questa informativa sulla privacy descrive come il nostro sito web utilizza e protegge qualsiasi informazione
                    che ci fornisci quando utilizzi questo sito web.
                </p>

                <h2 className="text-2xl font-bold mb-2">Informazioni che Raccogliamo</h2>

                <p className="mb-4">
                    Potremmo raccogliere le seguenti informazioni:
                </p>

                <ul className="list-disc list-inside mb-4">
                    <li>Il tuo nome e le tue informazioni di contatto</li>
                    <li>Informazioni demografiche</li>
                    <li>Altre informazioni rilevanti per sondaggi e/o offerte ai clienti</li>
                </ul>

                <h2 className="text-2xl font-bold mb-2">Come Utilizziamo le Informazioni</h2>

                <p className="mb-4">
                    Abbiamo bisogno di queste informazioni per comprendere le tue esigenze e fornirti un servizio migliore, in particolare
                    per i seguenti motivi:
                </p>

                <ul className="list-disc list-inside mb-4">
                    <li>Tenuta dei registri interni</li>
                    <li>Miglioramento dei nostri prodotti e servizi</li>
                    <li>Invio di email promozionali su nuovi prodotti, offerte speciali o altre informazioni che riteniamo possano
                        interessarti</li>
                    <li>Occasionalmente, potremmo anche utilizzare le tue informazioni per contattarti a scopi di ricerca di mercato.
                        Potremmo contattarti tramite email, telefono o posta. Potremmo utilizzare le informazioni per personalizzare
                        il sito web in base ai tuoi interessi.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-2">Sicurezza</h2>

                <p className="mb-4">
                    Siamo impegnati a garantire che le tue informazioni siano al sicuro. Per prevenire l&aspos;accesso o la divulgazione non
                    autorizzati, abbiamo messo in atto adeguate procedure fisiche, elettroniche e manageriali per salvaguardare e
                    proteggere le informazioni che raccogliamo online.
                </p>

                <h2 className="text-2xl font-bold mb-2">Cookie</h2>

                <p className="mb-4">
                    Un cookie è un piccolo file che richiede il permesso di essere posizionato sul disco rigido del tuo computer. Una
                    volta che acconsenti, il file viene aggiunto e il cookie aiuta ad analizzare il traffico web o ti avvisa quando
                    visiti un determinato sito. I cookie permettono alle applicazioni web di rispondere a te come individuo.
                    L&aspos;applicazione web può personalizzare le sue operazioni in base alle tue esigenze, preferenze e antipatie raccogliendo
                    e memorizzando informazioni sulle tue preferenze.
                </p>

                <p className="mb-4">
                    In generale, i cookie ci aiutano a fornirti un sito web migliore, consentendoci di monitorare quali pagine trovi
                    utili e quali no. Un cookie non ci dà in alcun modo accesso al tuo computer o a qualsiasi informazione su di te,
                    oltre ai dati che scegli di condividere con noi.
                </p>

                <h2 className="text-2xl font-bold mb-2">Link ad Altri Siti Web</h2>

                <p className="mb-4">
                    Il nostro sito web può contenere link ad altri siti di interesse. Tuttavia, una volta utilizzati questi link per
                    lasciare il nostro sito, devi notare che non abbiamo alcun controllo su quei siti web. Pertanto, non possiamo essere
                    responsabili per la protezione e la privacy di qualsiasi informazione che fornisci durante la visita a tali siti e
                    tali siti non sono regolati dalla presente informativa sulla privacy. Ti consigliamo di prestare attenzione e di
                    consultare l&aspos;informativa sulla privacy applicabile al sito web in questione.
                </p>

                <h2 className="text-2xl font-bold mb-2">Controllo delle Tue Informazioni Personali</h2>

                <p className="mb-4">
                    Puoi scegliere di limitare la raccolta o l&aspos;uso delle tue informazioni personali nei seguenti modi:
                </p>

                <ul className="list-disc list-inside mb-4">
                    <li>Se hai precedentemente acconsentito all&aspos;uso delle tue informazioni personali per scopi di marketing diretto,
                        puoi cambiare idea in qualsiasi momento scrivendoci o inviandoci un&aspos;email all&aspos;indirizzo [email protected]</li>
                    <li>Non venderemo, distribuiremo o cederemo le tue informazioni personali a terzi a meno che non abbiamo il tuo consenso
                        o siamo obbligati per legge a farlo. Potremmo utilizzare le tue informazioni personali per inviarti informazioni
                        promozionali su terze parti che riteniamo possano interessarti se ci comunichi che desideri che ciò accada.</li>
                    <li>Puoi richiedere dettagli sulle informazioni personali che deteniamo su di te. Se desideri una copia delle informazioni
                        che abbiamo su di te, scrivi a [Nome Azienda, Indirizzo, Città, Stato, CAP] o invia un&aspos;email a [email protected]</li>
                    <li>Se ritieni che qualsiasi informazione in nostro possesso su di te sia errata o incompleta, ti preghiamo di scriverci
                        o inviarci un&aspos;email il prima possibile all&aspos;indirizzo sopra indicato. Correggeremo prontamente qualsiasi informazione
                        risulti errata.
                    </li>
                </ul>

                <p className="mb-4">
                    Questa informativa sulla privacy è soggetta a modifiche senza preavviso.
                </p>
            </div>
        </div>

    )
}

export default PrivacyPolicy