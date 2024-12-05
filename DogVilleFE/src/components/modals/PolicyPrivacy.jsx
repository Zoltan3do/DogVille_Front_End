function PolicyPrivacy() {
    return (

        <div
            data-dialog-backdrop="dialog"
            data-dialog-backdrop-close="true"
            className="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300"
        >
            <div
                data-dialog="dialog"
                className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
            >
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
                    Privacy Policy
                </div>
                <h2>Informazioni che raccogliamo</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Raccogliamo diverse tipologie di informazioni quando visiti il nostro sito o interagisci con i suoi servizi:

                    Informazioni fornite dall'utente: ad esempio, nome, indirizzo email, numero di telefono, informazioni di pagamento, e qualsiasi altro dato che fornisci volontariamente tramite form di registrazione, acquisto o altre funzionalità interattive.

                    Informazioni raccolte automaticamente: quando visiti il nostro sito, raccogliamo automaticamente alcune informazioni tecniche, come indirizzo IP, tipo di browser, dati di navigazione (pagine visitate, tempo trascorso sul sito, ecc.), informazioni sul dispositivo utilizzato e informazioni tramite cookie.
                </div>
                <h2>Uso delle informazioni</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Utilizziamo le tue informazioni personali per i seguenti scopi:

                    Fornire i nostri servizi: elaborare ordini, rispondere a richieste di supporto, inviare notifiche importanti relative ai nostri servizi.
                    Personalizzazione dell'esperienza: migliorare l'esperienza di navigazione del sito, mostrando contenuti e annunci personalizzati in base alle tue preferenze.
                    Comunicazioni: inviarti aggiornamenti, promozioni o altre comunicazioni riguardanti i nostri prodotti e servizi, qualora tu abbia acconsentito a riceverle.
                    Miglioramento dei nostri servizi: analizzare come gli utenti interagiscono con il sito per ottimizzare le funzionalità e il design.
                </div>
                <h2>Condivisione delle informazioni</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Non vendiamo, affittiamo o scambiamo le tue informazioni personali. Potremmo condividere i tuoi dati con terze parti nelle seguenti circostanze:

                    Fornitori di servizi: collaboriamo con aziende terze che ci assistono nel gestire il sito, nel processare i pagamenti o nell'inviare comunicazioni. Questi fornitori di servizi trattano i tuoi dati solo per conto nostro e in conformità con le leggi sulla privacy.
                    Obblighi legali: potremmo essere obbligati a divulgare le tue informazioni per rispettare obblighi legali, rispondere a richieste governative o per proteggere i nostri diritti legali.
                </div>
                <h2>Cookies e tecnologie simili</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Il nostro sito utilizza cookie e altre tecnologie di tracciamento per migliorare l'esperienza dell'utente. I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo per memorizzare preferenze e altre informazioni.

                    Puoi gestire o disabilitare i cookie tramite le impostazioni del tuo browser, ma disabilitare i cookie potrebbe influire sulla tua esperienza sul nostro sito.
                </div>
                <h2>Sicurezza dei dati</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Adottiamo misure di sicurezza per proteggere i tuoi dati personali da accessi non autorizzati, modifiche o distruzioni. Tuttavia, nessun metodo di trasmissione dei dati su internet è sicuro al 100%, quindi non possiamo garantire la sicurezza assoluta dei tuoi dati.
                </div>
                <h2> Diritti degli utenti</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Secondo la legislazione applicabile, hai il diritto di:

                    Accedere ai tuoi dati personali: richiedere una copia dei dati che abbiamo raccolto su di te.
                    Correggere o aggiornare i tuoi dati: se i dati che conserviamo sono errati o incompleti, puoi chiederci di correggerli.
                    Chiedere la cancellazione dei dati: puoi richiedere che i tuoi dati vengano cancellati, se non sono più necessari per il trattamento o se hai revocato il tuo consenso.
                    Opporsi al trattamento dei dati: hai il diritto di opporti al trattamento dei tuoi dati, in particolare nel caso di marketing diretto.
                    Ritirare il consenso: se hai fornito il consenso per il trattamento dei tuoi dati, puoi ritirarlo in qualsiasi momento.
                </div>
                <h2>Conservazione dei dati</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Conserviamo i tuoi dati personali solo per il tempo necessario a soddisfare gli scopi descritti nella nostra Privacy Policy, salvo che una conservazione più lunga non sia richiesta o permessa dalla legge.
                </div>

                <h2>Trasferimento internazionale dei dati</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Poiché il nostro sito è accessibile a livello globale, i tuoi dati potrebbero essere trasferiti e trattati in paesi al di fuori della tua giurisdizione. In tali casi, garantiamo che vengano adottate misure appropriate per proteggere i tuoi dati in conformità con la normativa sulla privacy applicabile.
                </div>

                <h2>Modifiche alla Privacy Policy</h2>
                <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                    Ci riserviamo il diritto di aggiornare questa Privacy Policy in qualsiasi momento. In caso di modifiche, pubblicheremo la nuova versione sul nostro sito e aggiorneremo la data dell'ultimo aggiornamento. Ti invitiamo a consultare regolarmente questa pagina per essere sempre informato su come trattiamo i tuoi dati.
                </div>

                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button data-dialog-close="true" className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Cancella
                    </button>
                    <button data-dialog-close="true" className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                        Conferma
                    </button>
                </div>
            </div>
        </div>

    )

}
export default PolicyPrivacy