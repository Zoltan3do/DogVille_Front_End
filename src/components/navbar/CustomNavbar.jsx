import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import "./navbar.css";
import { changeModalState } from "../../redux/loginToggleSlice";
import logo from "../../assets/dogvilleLogo-removebg.png";
import { useEffect } from "react";
import { executemefetch } from "../../redux/meSlice";
import Avatar12 from "../Avatar12";
import { Link } from "react-router-dom";

function CustomNavbar() {
  const toggleState = useSelector((state) => state.sidebarToggle.value);
  const meData = useSelector((state) => state.meFetch.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(executemefetch());
  }, []);

  return (
    <nav
      className={`${
        toggleState ? "lg:ml-64" : "lg:ml-24"
      } opacity-90 fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 hidden lg:block`}
      style={{ height: "9rem" }}
      id="navbara"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between sm:px-6 lg:px-8 mx-auto h-full">
        {/* Testo "Adotta un amico" */}
        <Link to={"/dogs"}>
          <div className="sm:block md:w-auto">
            <p className="text-lg font-medium">
              Adotta un amico &nbsp;
              <i className="fa fa-solid fa-arrow-right-long align-middle freccetta"></i>
            </p>
          </div>
        </Link>

        {/* Logo */}
        <Link
          to={"/"}
          className="items-center w-full sm:w-auto justify-center sm:justify-start hidden sm:flex"
        >
          <img src={logo} className="w-32" alt="dogville Logo" />
        </Link>

        {/* Links */}
        <div className="hidden w-full sm:block sm:w-auto overflow-x-auto lg:mr-28">
          <ul className="flex flex-col font-medium p-4 sm:p-0 mt-4 bg-gray-50 sm:flex-row md:space-x-8 sm:mt-0 bg-transparent sm:flex-nowrap">
            <li className="flex items-center">
              <a href="tel:+393517416230">
                <i className="fa-solid fa-phone align-middle"></i>
              </a>
            </li>
            {meData ? (
              <Avatar12 />
            ) : (
              <>
                <li className="flex items-center cursor-pointer">
                  <Button
                    onClick={() => dispatch(changeModalState(true))}
                    className="bg-transparent border-0 text-lg text-whiteino transNone font-semibold"
                  >
                    Accedi
                  </Button>
                </li>
                <Link
                  to={"/register"}
                  className="flex items-center cursor-pointer"
                >
                  <li>
                    <p>Registrati</p>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
