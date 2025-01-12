import UserNavbar from "./UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { executemefetch, updateMeDataFetch, uploadAvatar } from "../../redux/meSlice";
import shitsu from "../../assets/shitsu.png";

function CustomProfile() {
    const dispatch = useDispatch();
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const meData = useSelector((state) => state.meFetch.value);
    const meFetchError = useSelector((state) => state.meFetch.error);

    const [avatarFile, setAvatarFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        address: "",
        telephoneNumber: "",
    });

    const updateStatus = useSelector((state) => state.meFetch.updateStatus);

    useEffect(() => {
        dispatch(executemefetch());
    }, [dispatch]);

    useEffect(() => {
        if (meData && (!formData.email || formData.email !== meData.email)) {
            setFormData((currentFormData) => ({
                ...currentFormData,
                name: meData.name || currentFormData.name || "",
                surname: meData.surname || currentFormData.surname || "",
                email: meData.email || currentFormData.email || "",
                address: meData.address || currentFormData.address || "",
                telephoneNumber: meData.telephoneNumber || currentFormData.telephoneNumber || "",
            }));
        }
    }, [meData]);

    const handleAvatarChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleAvatarUpload = async () => {
        if (avatarFile) {
            setIsUploading(true);
            await dispatch(uploadAvatar(avatarFile));
            setIsUploading(false);
        } else {
            alert("Seleziona un file prima di procedere!");
        }
    };

    useEffect(() => {
        if (updateStatus === "succeeded" && !meData?.profileUpdated) {
            setIsModalOpen(true);
        }
    }, [updateStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = { ...formData };
        if (!updatedData.password) {
            delete updatedData.password;
        }
        dispatch(updateMeDataFetch(updatedData));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <UserNavbar />
            <div
                className={`bg-transparent ${toggleState ? "lg:ml-64" : "lg:ml-24"
                    } transition-all duration-300 mt-12 !z-10  relative`}
            >
                <div
                    className="absolute -left-20
                 -bottom-20 p-0 pointer-events-none select-none hidden lg:block
            "
                >
                    <img src={shitsu} alt="shitsu" className="w-2/3" />
                </div>

                <div className="flex justify-center items-center ">
                    <div className="flex flex-col items-center my-6 bg-reddino p-10 rounded-2xl">
                        <form className="flex items-center space-x-6 mb-6">
                            <div className="shrink-0">
                                {isUploading ? (
                                    <div role="status" className="flex justify-center items-center">
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
                                ) : (
                                    <img
                                        className="h-16 w-16 object-cover rounded-full"
                                        src={meData?.profileImage}
                                        alt="Current profile"
                                    />
                                )}
                            </div>
                            <div className="flex justify-center items-center">
                                <label className="block  transition-all duration-300">
                                    <input
                                        type="file"
                                        onChange={handleAvatarChange}
                                        className="block w-full text-xs text-whiteino
                file:mr-4 file:py-2 file:px-2
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-grigiastro file:text-primary-color
                hover:file:bg-grigiastro "
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAvatarUpload}
                                    className="transition-all duration-300 hover:border bg-primary-color hover:bg-black  text-whiteino font-medium py-2 px-4 border rounded-full text-sm border-none"
                                >
                                    Cambia Avatar
                                </button>
                            </div>
                        </form>

                        {meFetchError && (
                            <div className="text-red-800 mb-4">
                                {meFetchError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="w-full max-w-lg">
                            <div className="flex flex-wrap -mx-3 mb-3">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-primary-color text-xs font-bold mb-2">
                                        Nome
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="appearance-none block w-full bg-gray-200 text-primary-color border rounded py-3 px-4 mb-3 leading-tight focus:bg-white focus:border-none"
                                        type="text"
                                        placeholder="Nome"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-primary-color text-xs font-bold mb-2">
                                        Cognome
                                    </label>
                                    <input
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        className="appearance-none block w-full bg-gray-200 text-primary-color border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        placeholder="Cognome"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-primary-color text-xs font-bold mb-2">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="appearance-none block w-full bg-gray-200 text-primary-color border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-primary-color text-xs font-bold mb-2">
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="appearance-none block w-full bg-gray-200 text-primary-color border border-whiteino rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                        type="password"
                                        placeholder="Nuova password"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-primary-color text-xs font-bold mb-2">
                                        Indirizzo
                                    </label>
                                    <input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        placeholder="Indirizzo"
                                    />
                                </div>
                                <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-primary-color text-xs font-bold mb-2">
                                        Numero di Telefono
                                    </label>
                                    <input
                                        name="telephoneNumber"
                                        value={formData.telephoneNumber}
                                        onChange={handleInputChange}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        placeholder="Numero di telefono"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="bg-primary-color text-whiteino font-bold py-2 px-4 rounded-full hover:bg-black transition duration-300"
                                >
                                    Aggiorna Profilo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 px-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative mx-auto text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-20 h-20 fill-primary-color absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                            viewBox="0 0 60 60"
                        >
                            <circle cx="30" cy="30" r="29" data-original="#111C20" />
                            <path
                                fill="#fff"
                                d="m24.262 42.07-6.8-6.642a1.534 1.534 0 0 1 0-2.2l2.255-2.2a1.621 1.621 0 0 1 2.256 0l4.048 3.957 11.353-17.26a1.617 1.617 0 0 1 2.2-.468l2.684 1.686a1.537 1.537 0 0 1 .479 2.154L29.294 41.541a3.3 3.3 0 0 1-5.032.529z"
                                data-original="#ffffff"
                            />
                        </svg>

                        <div className="mt-12">
                            <h3 className="text-gray-800 text-2xl font-bold flex-1">
                                Profilo aggiornato con successo!
                            </h3>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button
                                onClick={closeModal}
                                className="bg-primary-color hover:bg-primary-color-darker px-5 py-2 text-sm rounded-full font-semibold text-white transition-all duration-300"
                            >
                                Chiudi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CustomProfile;
