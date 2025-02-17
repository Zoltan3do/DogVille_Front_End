/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function UserNavbar({ showModal = false }) {
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'text-white bg-reddino'
            : 'text-primary-color bg-grigiastro hover:bg-reddino hover:text-whiteino';
    };

    return (
        <div className={`mt-10 bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"} transition-all duration-300 !z-30 ${!showModal ? '' : 'sticky'}`}>
            <div className="mb-3 flex justify-center">
                <ul className="flex justify-center gap-2 fixed py-5 bg-whiteino rounded-full px-10">
                    <li>
                        <Link
                            to="/profilo"
                            className={`px-5 py-1 rounded-full cursor-pointer transition-all duration-300 font-medium ${getLinkClass('/profilo')}`}
                        >
                            PROFILO
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/quiz"
                            className={`px-5 py-1 rounded-full cursor-pointer transition-all duration-300 font-medium ${getLinkClass('/quiz')}`}
                        >
                            QUIZ
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/adozioni"
                            className={`px-5 py-1 rounded-full cursor-pointer transition-all duration-300 font-medium ${getLinkClass('/adozioni')}`}
                        >
                            ADOZIONI
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserNavbar;