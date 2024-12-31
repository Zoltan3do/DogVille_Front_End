import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeModalState } from "../../redux/loginToggleSlice";

function BottomBar() {
    const meData = useSelector((state) => state.meFetch.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleExit() {
        localStorage.removeItem("Access Token")
        navigate("/")
        location.reload()
    }

    return (
        <>
            <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-black dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    <Link to={"/"} className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-grigino group">
                        <button
                            type="button"
                            className="inline-flex flex-col items-center justify-center group"
                        >
                            <i className="mb-1 fa fa-fw fa-home text-gray-500 dark:text-gray-400 group-hover:text-grigino dark:group-hover:text-whiteino" style={{ fontSize: 15 }}></i>
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-whiteino">
                                Home
                            </span>
                        </button>
                    </Link>
                    <Link to={"/dogs"} className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-grigino group">
                        <button type="button" className="inline-flex flex-col items-center justify-center px-5  group">
                            <i className="mb-1 fa fa-fw fa-dog" style={{ fontSize: 15 }}></i>
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-whiteino dark:group-hover:text-whiteino">Cani</span>
                        </button>
                    </Link>
                    {meData ? (
                        <>
                            <Link to={"/profilo"} className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-grigino group">
                                <button type="button" className="inline-flex flex-col items-center justify-center px-5  group">
                                    <i className='fa fa-solid fa-right-to-bracket' style={{ fontSize: 15 }}></i>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-whiteino dark:group-hover:text-whiteino">Profilo</span>
                                </button>
                            </Link>

                            <button onClick={handleExit} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-grigino group">
                                <i className='fa fa-solid fa-right-from-bracket' style={{ fontSize: 15 }}></i>
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-whiteino dark:group-hover:text-whiteino">Esci</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => dispatch(changeModalState(true))} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-grigino group">
                                <i className='fa fa-solid fa-user mb-1' style={{ fontSize: 15 }}></i>
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-whiteino dark:group-hover:text-whiteino">Accedi</span>
                            </button>
                            <Link to={"/register"} className="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-grigino group">
                                <button type="button" className="inline-flex flex-col items-center justify-center px-5  group">
                                    <i className='fa fa-solid fa-address-card' style={{ fontSize: 15 }}></i>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-whiteino dark:group-hover:text-whiteino">Registrati</span>
                                </button>
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}

export default BottomBar;