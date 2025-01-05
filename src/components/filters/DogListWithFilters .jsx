import { useEffect, useState } from "react";
import { DogCard } from "./DogCard";
import { useSelector, useDispatch } from "react-redux";
import { executedogsfetch } from "../../redux/dogsListFetchSlice";
import { executemefetch } from "../../redux/meSlice";

const DogListWithFilters = () => {
  const [filters, setFilters] = useState({
    dogSize: "",
    gender: "",
    race: "",
    healthState: "",
    age: "",
  });

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const dogs = useSelector((state) => state.dogsFetch.value.content);
  const totPages = useSelector((state) => state.dogsFetch.value?.page?.totalPages);

  useEffect(() => {
    dispatch(executemefetch())
    dispatch(executedogsfetch(filters, page));
  }, [filters, dispatch, page]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const toggleState = useSelector((state) => state.sidebarToggle.value);

  const filteredDogs = Array.isArray(dogs) ? dogs.filter((dog) => {
    return (
      (filters.dogSize === "" || dog.dogSize === filters.dogSize) &&
      (filters.gender === "" || dog.gender === filters.gender) &&
      (filters.race === "" || dog.race === filters.race) &&
      (filters.healthState === "" || dog.healthState === filters.healthState) &&
      (filters.age === "" || dog.age === parseInt(filters.age))
    );
  }) : [];

  return (
    <div className={`px-4 bg-transparent ${toggleState ? "lg:ml-72" : "lg:ml-24"} transition-all duration-300 min-h-screen`}>
      {/* Filtri */}
      <div className=" rounded shadow mb-4 flex flex-col" >
        <h2 className="text-xl font-bold mb-4">Filtra Cani</h2>
        <div className="flex justify-between mb-5 sm:flex-row flex-wrap gap-5">
          
          <div className="min-w-44">
            <label className="block mb-1 text-sm font-medium ">Taglia</label>
            <select
              name="dogSize"
              value={filters.dogSize}
              onChange={handleFilterChange}
              className="border p-2 rounded text-black w-full "
            >
              <option value="" >Tutte</option>
              <option value="NANA">Nana</option>
              <option value="PICCOLA">Piccola</option>
              <option value="MEDIA">Media</option>
              <option value="GRANDE">Grande</option>
              <option value="GIGANTE">Gigante</option>
            </select>
          </div>

          
          <div className="min-w-44">
            <label className="block mb-1 text-sm font-medium ">Genere</label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="border p-2 rounded text-black w-full"
            >
              <option value="">Tutti</option>
              <option value="M">Maschio</option>
              <option value="F">Femmina</option>
            </select>
          </div>

          <div className="max-w-44">
            <label className="block mb-1 text-sm font-medium">Età</label>
            <input
              type="number"
              name="age"
              value={filters.age}
              onChange={handleFilterChange}
              placeholder="Tutte"
              className="border p-2 rounded text-black w-full"
            />
          </div>

        
          <div>
            <label className="block mb-1 text-sm font-medium">Stato di Salute</label>
            <select
              name="healthState"
              value={filters.healthState}
              onChange={handleFilterChange}
              className="border p-2 rounded text-black"
            >
              <option value="">Tutti</option>
              <option value="IN_SALUTE">In Salute</option>
              <option value="PROBLEMI_MINORI">Problemi Minori</option>
              <option value="CONDIZIONI_CRONICHE">Condizioni Croniche</option>
              <option value="SOTTO_TRATTAMENTI">Sotto Trattamenti</option>
              <option value="DISABILE">Disabile</option>
              <option value="VECCHIAIA">Vecchiaia</option>
              <option value="CONDIZIONI_TERMINALI">Condizioni Terminali</option>
            </select>
          </div>

          <div className="max-w-44">
            <label className="block mb-1 text-sm font-medium">Razza</label>
            <select
              name="race"
              value={filters.race}
              onChange={handleFilterChange}
              className="border p-2 rounded text-black w-full"
            >
              <option value="">Tutte</option>
              <option value="Pastore Tedesco">Pastore Tedesco</option>
              <option value="Border Collie">Border Collie</option>
              <option value="Collie">Collie</option>
              <option value="Pastore Australiano">Pastore Australiano</option>
              <option value="Shetland Sheepdog">Shetland Sheepdog</option>
              <option value="Corgi Gallese (Cardigan e Pembroke)">Corgi Gallese (Cardigan e Pembroke)</option>
              <option value="Pastore Maremmano-Abruzzese">Pastore Maremmano-Abruzzese</option>
              <option value="Komondor">Komondor</option>
              <option value="Cane da pastore bergamasco">Cane da pastore bergamasco</option>
              <option value="Dobermann">Dobermann</option>
              <option value="Rottweiler">Rottweiler</option>
              <option value="Boxer">Boxer</option>
              <option value="Cane Corso">Cane Corso</option>
              <option value="Mastino Napoletano">Mastino Napoletano</option>
              <option value="Schnauzer (Miniature, Standard e Gigante)">Schnauzer (Miniature, Standard e Gigante)</option>
              <option value="Bovaro del Bernese">Bovaro del Bernese</option>
              <option value="Terranova">Terranova</option>
              <option value="San Bernardo">San Bernardo</option>
              <option value="Yorkshire Terrier">Yorkshire Terrier</option>
              <option value="Jack Russell Terrier">Jack Russell Terrier</option>
              <option value="Fox Terrier">Fox Terrier</option>
              <option value="West Highland White Terrier">West Highland White Terrier</option>
              <option value="Staffordshire Bull Terrier">Staffordshire Bull Terrier</option>
              <option value="American Staffordshire Terrier">American Staffordshire Terrier</option>
              <option value="Airedale Terrier">Airedale Terrier</option>
              <option value="Bassotto Tedesco (a pelo corto, lungo, ruvido)">Bassotto Tedesco (a pelo corto, lungo, ruvido)</option>
              <option value="Husky Siberiano">Husky Siberiano</option>
              <option value="Alaskan Malamute">Alaskan Malamute</option>
              <option value="Akita Inu">Akita Inu</option>
              <option value="Shiba Inu">Shiba Inu</option>
              <option value="Chow Chow">Chow Chow</option>
              <option value="Samoiedo">Samoiedo</option>
              <option value="Spitz Tedesco (Miniatura, Nano, Medio, Grande)">Spitz Tedesco (Miniatura, Nano, Medio, Grande)</option>
              <option value="Basenji">Basenji</option>
              <option value="Beagle">Beagle</option>
              <option value="Segugio Italiano">Segugio Italiano</option>
              <option value="Bloodhound">Bloodhound</option>
              <option value="Bassethound">Bassethound</option>
              <option value="Rhodesian Ridgeback">Rhodesian Ridgeback</option>
              <option value="Setter Irlandese">Setter Irlandese</option>
              <option value="Setter Inglese">Setter Inglese</option>
              <option value="Pointer">Pointer</option>
              <option value="Bracco Italiano">Bracco Italiano</option>
              <option value="Weimaraner">Weimaraner</option>
              <option value="Kurzhaar (Bracco Tedesco a pelo corto)">Kurzhaar (Bracco Tedesco a pelo corto)</option>
              <option value="Labrador Retriever">Labrador Retriever</option>
              <option value="Golden Retriever">Golden Retriever</option>
              <option value="Flat-Coated Retriever">Flat-Coated Retriever</option>
              <option value="Spaniel Inglese (Cocker, Springer, ecc.)">Spaniel Inglese (Cocker, Springer, ecc.)</option>
              <option value="Barbet">Barbet</option>
              <option value="Barboncino (Toy, Nano, Medio, Standard)">Barboncino (Toy, Nano, Medio, Standard)</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Maltese">Maltese</option>
              <option value="Cavalier King Charles Spaniel">Cavalier King Charles Spaniel</option>
              <option value="Shih Tzu">Shih Tzu</option>
              <option value="Carlino">Carlino</option>
              <option value="Boston Terrier">Boston Terrier</option>
              <option value="Bulldog Francese">Bulldog Francese</option>
              <option value="Levriero Afgano">Levriero Afgano</option>
              <option value="Greyhound">Greyhound</option>
              <option value="Whippet">Whippet</option>
              <option value="Saluki">Saluki</option>
              <option value="Borzoi">Borzoi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista dei cani */}
      {filteredDogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {filteredDogs.map((dog) => (
            <DogCard key={dog.id} {...dog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Nessun cane trovato con i filtri selezionati.</p>
      )}

      {/* Paginazione */}
      <div className="flex justify-center mt-6 text-black">
        <button
          onClick={() => handlePageChange(Math.max(0, page - 1))}
          disabled={page === 0}
          className="bg-gray-200 px-4 py-2 rounded-l"
        >
          Precedente
        </button>
        {[...Array(totPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx)}
            className={`px-4 py-2 ${idx === page ? 'bg-black text-white' : 'bg-gray-200'} rounded`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(Math.min(totPages - 1, page + 1))}
          disabled={page === totPages - 1}
          className="bg-gray-200 px-4 py-2 rounded-r"
        >
          Successiva
        </button>
      </div>
    </div>
  );
};

export default DogListWithFilters;
