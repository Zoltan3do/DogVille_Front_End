import UserNavbar from "./UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { executemefetch, updateMeDataFetch, uploadAvatar } from "../../redux/meSlice";

function CustomProfile() {
    const dispatch = useDispatch();
    const toggleState = useSelector((state) => state.sidebarToggle.value);
    const meData = useSelector((state) => state.meFetch.value);
    const meFetchError = useSelector((state) => state.meFetch.error);

    const [avatarFile, setAvatarFile] = useState(null);

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
            setFormData(currentFormData => ({
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

    const handleAvatarUpload = () => {
        if (avatarFile) {
            dispatch(uploadAvatar(avatarFile));
        } else {
            alert("Seleziona un file prima di procedere!");
        }
    };


    useEffect(() => {
        if (updateStatus === 'succeeded') {
            setIsModalOpen(true);
        }
    }, [updateStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
            <div className={`bg-transparent ${toggleState ? "!ml-64" : "!ml-24"} transition-all duration-300 mt-20 z-30`}>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center my-6 bg-reddino p-10 rounded-2xl">
                        {/* Form update immagine profilo */}
                        <form className="flex items-center space-x-6 mb-6">
                            <div className="shrink-0">
                                <img
                                    className="h-16 w-16 object-cover rounded-full"
                                    src={meData?.profileImage}
                                    alt="Current profile"
                                />
                            </div>
                            <label className="block transition-all duration-300">
                                <input
                                    type="file"
                                    onChange={handleAvatarChange}
                                    className="block w-full text-sm text-whiteino
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-grigiastro file:text-primary-color
                hover:file:bg-grigiastro"
                                />
                            </label>
                            <button
                                type="button"
                                onClick={handleAvatarUpload}
                                className="transition-all duration-300 hover:border bg-primary-color hover:bg-black  text-whiteino font-medium py-2 px-4 border rounded-full text-sm border-none"
                            >
                                Cambia Avatar
                            </button>
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
                                    className="bg-primary-color text-whiteino font-bold py-2 px-4 rounded hover:bg-black transition duration-300"
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
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-20 h-20 fill-primary-color absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="29" data-original=' #111C20' />
                            <path fill="#fff"
                                d="m24.262 42.07-6.8-6.642a1.534 1.534 0 0 1 0-2.2l2.255-2.2a1.621 1.621 0 0 1 2.256 0l4.048 3.957 11.353-17.26a1.617 1.617 0 0 1 2.2-.468l2.684 1.686a1.537 1.537 0 0 1 .479 2.154L29.294 41.541a3.3 3.3 0 0 1-5.032.529z"
                                data-original="#ffffff" />
                        </svg>

                        <div className="mt-12">
                            <h3 className="text-gray-800 text-2xl font-bold flex-1">Profilo Aggiornato!</h3>
                            <p className="text-sm text-gray-600 mt-3">Il tuo profilo è stato aggiornato con successo.</p>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-2.5 mt-8 w-full rounded-md text-white text-sm font-semibold tracking-wide border-none outline-none bg-primary-color hover:bg-black"
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