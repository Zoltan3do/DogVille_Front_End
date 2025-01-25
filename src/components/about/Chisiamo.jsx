/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import parto from "../../assets/parto.jpg";
import chip from "../../assets/chip.jpeg";
import consegna from "../../assets/consegna.jpeg";
import hero from "../../assets/hero.jpeg";
import studio from "../../assets/studio.jpeg";
import adotta from "../../assets/adotta.jpeg";
import vaccinazione from "../../assets/vaccinazione.jpeg";
import logo from "../../assets/dogvilleLogo-removebg.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { executedogsfetch } from "../../redux/dogsListFetchSlice";
import { Link } from "react-router-dom";

function Chisiamo() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogsFetch.value.content);
  const toggleState = useSelector((state) => state.sidebarToggle.value);
  const filters = {
    dogSize: "",
    gender: "",
    race: "",
    healthState: "",
    age: "",
  };

  useEffect(() => {
    dispatch(executedogsfetch(filters, 0));
    console.log(dogs);
  }, [dispatch]);

  return (
    <>
      <div
        className={`bg-transparent ${
          toggleState ? "lg:ml-64 " : "lg:ml-24"
        } transition-all duration-300`}
      >
        <div className="relative w-full h-[320px]" id="home">
          <div className="absolute inset-0 opacity-70">
            <img
              src={hero}
              alt="Background Image"
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="absolute inset-9 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h1 className="text-grey-700 font-medium text-4xl md:text-5xl leading-tight mb-2">
                DogVille
              </h1>
              <p className="font-regular text-xl mb-8 mt-4">
                Cura, protezione e amore: tutto per il tuo migliore amico.
              </p>
              <Link
                to={"/contacts"}
                className="px-6 py-3 bg-primary-color text-white font-medium rounded-full hover:bg-grigino  transition duration-200"
              >
                Contattaci
              </Link>
            </div>
          </div>
        </div>
        <section className="py-10" id="services">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-whiteino mb-8 text-center">
              I Nostri Servizi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-primary-color rounded-lg shadow-md overflow-hidden">
                <img
                  src={adotta}
                  alt="wheat flour grinding"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium text-whiteino mb-2">
                    Adotta Un Cane
                  </h3>
                  <p className="text-whiteino text-base">
                    Regala una seconda possibilità a un amico a quattro zampe!
                    Nel nostro canile, tanti cani di tutte le taglie, età e
                    caratteri ti aspettano per entrare a far parte della tua
                    famiglia. Il nostro team ti aiuterà a trovare il compagno
                    perfetto per te, fornendo consigli e supporto per
                    un&apos;adozione responsabile e felice.
                  </p>
                </div>
              </div>
              <div className="bg-primary-color rounded-lg shadow-md overflow-hidden">
                <img
                  src={consegna}
                  alt="Coffee"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium text-whiteino mb-2">
                    Consegna Un Cane
                  </h3>
                  <p className="text-whiteino text-base">
                    Non puoi più occuparti del tuo amico a quattro zampe? Siamo
                    qui per aiutarti. Offriamo un servizio dedicato per
                    accogliere cani che, per vari motivi, non possono più
                    restare con le loro famiglie. Portandolo a noi, garantisci
                    che il tuo cane riceva cure, amore e la possibilità di
                    trovare una nuova famiglia. Il nostro team ti assisterà
                    durante il processo, assicurandoti che il tuo cane sia in
                    mani sicure e affettuose.
                  </p>
                </div>
              </div>
              <div className="bg-primary-color rounded-lg shadow-md overflow-hidden">
                <img
                  src={studio}
                  alt="Coffee"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium text-whiteino mb-2">
                    Studio Veterinario H24
                  </h3>
                  <p className="text-whiteino text-base">
                    Il nostro studio veterinario è aperto 24 ore su 24, 7 giorni
                    su 7, per garantire che i tuoi amici a quattro zampe
                    ricevano cure tempestive e di alta qualità in qualsiasi
                    momento. Offriamo un&apos;ampia gamma di servizi, tra cui
                    visite di routine, vaccinazioni, esami diagnostici,
                    interventi chirurgici e assistenza per emergenze, sempre con
                    attrezzature moderne e tecnologie all&apos;avanguardia.
                  </p>
                  <details>
                    <summary className="cursor-pointer">Leggi Altro</summary>
                    <p>
                      Il nostro team di veterinari esperti e personale
                      qualificato lavora con passione per assicurare il massimo
                      benessere del tuo animale, rispondendo con prontezza a
                      ogni necessità.{" "}
                    </p>
                  </details>
                </div>
              </div>
              <div className="bg-primary-color rounded-lg shadow-md overflow-hidden">
                <img
                  src={chip}
                  alt="Coffee"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium text-whiteino mb-2">
                    Microchip Identificativo
                  </h3>
                  <p className="text-whiteino text-base">
                    Il microchip è un sistema di identificazione permanente e
                    sicuro per il tuo cane. Grazie a un piccolo impianto
                    sottocutaneo, il microchip permette di registrare i dati del
                    tuo animale in modo univoco, facilitando il suo ritorno a
                    casa in caso di smarrimento.
                    <details>
                      <summary className="cursor-pointer">Leggi Altro</summary>
                      <p>
                        {" "}
                        Il nostro servizio di applicazione del microchip è
                        rapido, indolore e conforme alla normativa vigente,
                        garantendo una protezione completa per il tuo amico a
                        quattro zampe.
                      </p>
                    </details>
                  </p>
                </div>
              </div>
              <div className="bg-primary-color rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg overflow-hidden min-h-full">
                <div className="text-center text-primary-color font-medium">
                  Servizio Speciale
                </div>
                <img
                  src={parto}
                  alt="Coffee"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6 bg-primary-color text-center rounded-b-lg md:min-h-full">
                  <h3 className="text-xl font-medium text-whiteino mb-2">
                    Parti Assistiti
                  </h3>
                  <p className="text-whiteino text-base">
                    Offriamo assistenza completa durante il parto della tua
                    cagna, garantendo la sicurezza della mamma e dei cuccioli.
                    Il nostro team veterinario è pronto a monitorare e
                    intervenire in ogni fase del travaglio, per assicurare
                    un’esperienza serena e protetta per tutti.
                  </p>
                </div>
              </div>
              <div className="bg-primary-color rounded-lg shadow-md overflow-hidden">
                <img
                  src={vaccinazione}
                  alt="papad"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium text-whiteino mb-2">
                    Vaccinazioni e Sverminamenti
                  </h3>
                  <p className="text-whiteino text-base">
                    Offriamo un servizio completo di vaccinazioni e
                    sverminamenti per proteggere la salute del tuo cane. Le
                    vaccinazioni sono fondamentali per prevenire malattie gravi,
                    mentre gli sverminamenti aiutano a mantenere il tuo amico a
                    quattro zampe libero da parassiti.
                    <details>
                      <summary className="cursor-pointer">Leggi Altro</summary>
                      <p>
                        {" "}
                        Il nostro team veterinario ti guiderà nel programma più
                        adatto alle necessità del tuo cane, per garantire una
                        vita lunga e sana.
                      </p>
                    </details>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-primary-color" id="aboutus">
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold text-whiteino mb-8 text-center">
                  Chi siamo
                </h2>
                <p className="mt-4 text-whiteino text-lg">
                  DogVille offre ai suoi clienti i migliori servizi e cure per i
                  loro amici a quattro zampe. Siamo specializzati
                  nell&apos;accoglienza e nel benessere degli animali, offrendo
                  una vasta gamma di servizi, tra cui adozioni, assistenza
                  veterinaria, e attività stimolanti per cani di tutte le taglie
                  e razze. Il nostro obiettivo è sempre quello di garantire
                  un&apos;esperienza positiva e sicura per ogni cane che entra
                  nel nostro rifugio. Siamo impegnati a fornire ai nostri
                  clienti il massimo supporto, con prezzi competitivi,
                  assistenza dedicata e un team esperto pronto a rispondere a
                  ogni domanda. Se stai cercando un canile che possa offrire i
                  migliori servizi per il tuo amico peloso, siamo la scelta
                  giusta per te. Non vediamo l&apos;ora di aiutarti a trovare la
                  soluzione perfetta per le esigenze del tuo cane!
                </p>
              </div>
              <div className="mt-12 md:mt-0">
                <img
                  src={logo}
                  alt="About Us Image"
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="text-whiteino body-font mt-10">
          <div className="flex justify-center text-3xl font-bold text-whiteino text-center">
            Perchè noi?
          </div>
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-wrap text-center justify-center">
              <div className="p-4 md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div className="flex justify-center">
                    <img
                      src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp"
                      className="w-32 mb-3"
                    />
                  </div>
                  <h2 className="title-font font-regular text-2xl text-whiteino">
                    Cura e Benessere Personalizzati
                  </h2>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div className="flex justify-center">
                    <img
                      src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp"
                      className="w-32 mb-3"
                    />
                  </div>
                  <h2 className="title-font font-regular text-2xl text-whiteino">
                    Servizi Completi e di Qualità
                  </h2>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div className="flex justify-center">
                    <img
                      src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp"
                      className="w-32 mb-3"
                    />
                  </div>
                  <h2 className="title-font font-regular text-2xl text-whiteino">
                    Un Ambiente Sicuro e Stimolante
                  </h2>
                </div>
              </div>
              <div className="p-4 md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div className="flex justify-center">
                    <img
                      src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp"
                      className="w-32 mb-3"
                    />
                  </div>
                  <h2 className="title-font font-regular text-2xl text-whiteino">
                    Personale Esperto e Affettuoso
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="text-whiteino body-font" id="gallery">
          <div className="flex justify-center text-3xl font-bold text-whiteino text-center py-10">
            Galleria
          </div>
          {dogs?.length > 0 ? (
            <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {dogs.slice(0, 4).map((dog, i) => (
                <div key={i} className="group relative">
                  <img
                    src={dog.profileImage}
                    alt={`dog${i}`}
                    className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              role="status"
              className="flex justify-center items-center w-full"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-color"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Caricamento...</span>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
export default Chisiamo;
