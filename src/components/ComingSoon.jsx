import { useSelector } from "react-redux";

function ComingSoon() {
  const toggleState = useSelector((state) => state.sidebarToggle.value);
  return (
    <div
      className={`flex flex-col bg-center bg-cover bg-no-repeat bg-transparent ${
        toggleState ? "lg:ml-64" : "lg:ml-24"
      } transition-all duration-300`}
    >
      <div className="grid place-items-center w-4/5 mx-auto p-10 my-20 sm:my-auto bg-white-600 border-4 border-whiteino bg-opacity-70 rounded-xl shadow-2xl space-y-5 text-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="h-24 w-24 text-whiteino"
          viewBox="0 0 16 16"
        >
          <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z"></path>
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"></path>
        </svg>
        <h1 className="text-4xl font-bold uppercase text-whiteino transition duration-500">
          disponibile a breve
        </h1>
        <h2 className="text-xl text-whiteino transition duration-500">
          Il meglio deve ancora arrivare. Sto lavorando per rendere tutto
          perfetto, resta sintonizzato!
        </h2>
      </div>
    </div>
  );
}

export default ComingSoon;
