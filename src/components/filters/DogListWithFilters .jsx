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
  const [sortCriteria, setSortCriteria] = useState("");

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const dogs = useSelector((state) => state.dogsFetch.value.content);
  const totPages = useSelector((state) => state.dogsFetch.value?.page?.totalPages);

  useEffect(() => {
    dispatch(executemefetch());
    dispatch(executedogsfetch(filters, page, sortCriteria));
  }, [filters, dispatch, page, sortCriteria]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(0); 
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
    setPage(0); 
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const toggleState = useSelector((state) => state.sidebarToggle.value);

  if (!dogs) {
    return <div className="text-center mt-8">Caricamento...</div>;
  }

  return (
    <div
      className={`px-4 bg-transparent ${toggleState ? "lg:ml-72" : "lg:ml-24"
        } transition-all duration-300 min-h-screen mt-3`}
    >
      <div className="rounded shadow mb-4 flex flex-col items-center  p-4">
        <h2 className="text-xl font-bold mb-4">Filtra Cani</h2>
        <div className="flex mb-5 sm:flex-row flex-wrap gap-5 justify-center">
          <div className="min-w-44">
            <label className="block mb-1 text-sm font-medium">Taglia</label>
            <select
              name="dogSize"
              value={filters.dogSize}
              onChange={handleFilterChange}
              className="border p-2 rounded text-black w-full "
            >
              <option value="">Tutte</option>
              <option value="NANA">Nana</option>
              <option value="PICCOLA">Piccola</option>
              <option value="MEDIA">Media</option>
              <option value="GRANDE">Grande</option>
              <option value="GIGANTE">Gigante</option>
            </select>
          </div>

          <div className="min-w-44">
            <label className="block mb-1 text-sm font-medium">Genere</label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="border p-2 rounded text-black w-full bg-white"
            >
              <option value="">Tutti</option>
              <option value="M">Maschio</option>
              <option value="F">Femmina</option>
            </select>
          </div>

          <div className="w-44">
            <label className="block mb-1 text-sm font-medium">Età</label>
            <input
              type="number"
              name="age"
              value={filters.age}
              onChange={handleFilterChange}
              placeholder="Tutte"
              min="0"
              className="border p-2 rounded text-black w-full bg-white"
            />
          </div>

          <div className="min-w-44">
            <label className="block mb-1 text-sm font-medium">Stato di Salute</label>
            <select
              name="healthState"
              value={filters.healthState}
              onChange={handleFilterChange}
              className="border p-2 rounded text-black w-full bg-white"
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

          <div className="min-w-44">
            <label className="block mb-1 text-sm font-medium">Razza</label>
            <select
              name="race"
              value={filters.race}
              onChange={handleFilterChange}
              className="border p-2 rounded text-black w-full bg-white"
            >
              <option value="">Tutte</option>
              {/* Add race options here */}
            </select>
          </div>

          <div className="min-w-44">
            <label className="block mb-1 text-sm font-medium">Ordina per</label>
            <select
              value={sortCriteria}
              onChange={handleSortChange}
              className="border p-2 rounded text-black w-full bg-white"
            >
              <option value="">Nessuno</option>
              <option value="name,asc">Nome A-Z</option>
              <option value="name,desc">Nome Z-A</option>
              <option value="age,asc">Età Crescente</option>
              <option value="age,desc">Età Decrescente</option>
            </select>
          </div>
        </div>
      </div>

      {dogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
          {dogs.map((dog) => (
            <DogCard key={dog.id} {...dog} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Nessun cane trovato con i filtri selezionati.
        </div>
      )}

      {totPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 mb-8">
          <button
            onClick={() => handlePageChange(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2  rounded-l bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Precedente
          </button>

          {[...Array(totPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx)}
              className={`px-4 py-2 rounded ${idx === page
                ? "bg-whiteino  text-primary-color"
                : "bg-black hover:bg-gray-300 hover:text-primary-color text-whiteino"
                } transition-all duration-200`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(totPages - 1, page + 1))}
            disabled={page === totPages - 1}
            className="px-4 py-2 bg-gray-700  rounded-r  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Successiva
          </button>
        </div>
      )}
    </div>
  );
};

export default DogListWithFilters;