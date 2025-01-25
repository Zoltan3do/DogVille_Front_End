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
  const totPages = useSelector(
    (state) => state.dogsFetch.value?.page?.totalPages
  );

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
    return (
      <div
        role="status"
        className={`flex justify-center items-center  ${
          toggleState ? "lg:ml-72" : "lg:ml-24"
        } transition-all duration-300`}
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
    );
  }

  return (
    <div
      className={`px-4 bg-transparent ${
        toggleState ? "lg:ml-72" : "lg:ml-24"
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
            <label className="block mb-1 text-sm font-medium">
              Stato di Salute
            </label>
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
              className={`px-4 py-2 rounded ${
                idx === page
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
