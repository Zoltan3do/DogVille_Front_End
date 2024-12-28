import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import './registration.css'
import { executeRegisterFetch, clearError } from "../../redux/loginFetchSlice";
import { useNavigate } from 'react-router-dom';
import { changeModalState } from "../../redux/loginToggleSlice";

function CustomSignIn() {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        address: '',
        telephoneNumber: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false);

    const { status, error } = useSelector((state) => state.loginFetches);
    const toggleState = useSelector((state) => state.sidebarToggle.value);

    useEffect(() => {
        // Pulisce gli errori quando il componente viene smontato
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Il nome è obbligatorio';
        }

        if (!formData.surname.trim()) {
            newErrors.surname = 'Il cognome è obbligatorio';
        }

        if (!formData.address.trim()) {
            newErrors.address = "L'indirizzo è obbligatorio";
        }

        if (!formData.telephoneNumber.trim()) {
            newErrors.telephoneNumber = 'Il numero di telefono è obbligatorio';
        } else if (!/^\+?[0-9\s-]{10,}$/.test(formData.telephoneNumber)) {
            newErrors.telephoneNumber = 'Inserire un numero di telefono valido';
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email è obbligatoria";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Inserire un indirizzo email valido';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'La password è obbligatoria';
        } else if (formData.password.length < 8) {
            newErrors.password = 'La password deve essere di almeno 8 caratteri';
        }

        if (!termsAccepted) {
            newErrors.terms = 'Devi accettare i Termini e Condizioni';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Rimuove l'errore quando l'utente inizia a digitare
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            await dispatch(executeRegisterFetch({
                name: formData.name,
                surname: formData.surname,
                address: formData.address,
                telephoneNumber: formData.telephoneNumber,
                email: formData.email,
                password: formData.password
            })).unwrap();
            
            formRef.current.reset();
            navigate('/');
        } catch (err) {
            // Gli errori del server vengono gestiti automaticamente dallo slice
            console.error('Errore durante la registrazione:', err);
        }
    };

    return (
        <div className={`bg-transparent ${toggleState ? "ml-72" : "ml-24"} transition-all duration-300 flex-grow sm:relative lg:flex flex-row-reverse mt-16`}>
            <div className="">
                <img src="src/assets/pastoreTedesco.png" alt="pt" className="h-full" />
            </div>

            <Card color="transparent" shadow={false} className="">
                <Typography variant="h4" color="white">
                    Registrati
                </Typography>
                <Typography color="white" className="mt-1 font-normal">
                    Felice di conoscerti! Inserisci i tuoi dettagli per registrarti
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" ref={formRef} onSubmit={handleRegister}>
                    <div className="mb-1 flex flex-col gap-4">
                        <div>
                            <Typography variant="h6" color="white" className="mb-1">
                                Il tuo nome
                            </Typography>
                            <Input
                                name="name"
                                size="lg"
                                placeholder="Manuel"
                                className="!border-t-white focus:!border-t-gray-900 text-whiteino !mr-10"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                value={formData.name}
                            />
                            {errors.name && (
                                <Typography color="red" className="text-xs mt-1">
                                    {errors.name}
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Typography variant="h6" color="white" className="mb-1">
                                Il tuo cognome
                            </Typography>
                            <Input
                                name="surname"
                                size="lg"
                                placeholder="Barone"
                                className="!mr-10 text-whiteino"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleInputChange}
                                error={!!errors.surname}
                                value={formData.surname}
                            />
                            {errors.surname && (
                                <Typography color="red" className="text-xs mt-1">
                                    {errors.surname}
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Typography variant="h6" color="white" className="mb-1">
                                Il tuo indirizzo
                            </Typography>
                            <Input
                                name="address"
                                size="lg"
                                placeholder="Via Vialetto 76, Napoli"
                                className="!mr-10 text-whiteino"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleInputChange}
                                error={!!errors.address}
                                value={formData.address}
                            />
                            {errors.address && (
                                <Typography color="red" className="text-xs mt-1">
                                    {errors.address}
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Typography variant="h6" color="white" className="mb-1">
                                Il tuo numero di telefono
                            </Typography>
                            <Input
                                name="telephoneNumber"
                                size="lg"
                                placeholder="+393573893483"
                                className="!mr-10 text-whiteino"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleInputChange}
                                error={!!errors.telephoneNumber}
                                value={formData.telephoneNumber}
                            />
                            {errors.telephoneNumber && (
                                <Typography color="red" className="text-xs mt-1">
                                    {errors.telephoneNumber}
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Typography variant="h6" color="white" className="mb-1">
                                La tua email
                            </Typography>
                            <Input
                                name="email"
                                size="lg"
                                placeholder="name@mail.com"
                                className="!mr-10 text-whiteino"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                value={formData.email}
                            />
                            {errors.email && (
                                <Typography color="red" className="text-xs mt-1">
                                    {errors.email}
                                </Typography>
                            )}
                        </div>

                        <div>
                            <Typography variant="h6" color="white" className="mb-1">
                                Password
                            </Typography>
                            <Input
                                name="password"
                                type="password"
                                size="lg"
                                placeholder="********"
                                className="!mr-10 noBlu text-whiteino !border-white"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                value={formData.password}
                            />
                            {errors.password && (
                                <Typography color="red" className="text-xs mt-1">
                                    {errors.password}
                                </Typography>
                            )}
                        </div>
                    </div>

                    {/* Errore generale dal server */}
                    {error && (
                        <Typography color="red" className="text-sm text-center mt-2">
                            {error.message}
                        </Typography>
                    )}

                    <div className="mt-4">
                        <Checkbox
                            label={
                                <Typography variant="small" className="flex items-center font-normal text-whiteino">
                                    Accetto i
                                    <a href="#" className="font-medium transition-colors hover:text-g !mr-10">
                                        &nbsp;Termini e Condizioni
                                    </a>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5 checkbox-label" }}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        {errors.terms && (
                            <Typography color="red" className="text-xs mt-1">
                                {errors.terms}
                            </Typography>
                        )}
                    </div>

                    <Button 
                        className="mt-6 bg-grigino text-whiteino"
                        fullWidth 
                        type="submit"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Registrazione in corso...' : 'Registrati'}
                    </Button>

                    <Typography className="mt-4 text-center font-normal text-whiteino">
                        Hai già un account?{" "}
                        <a 
                            href="#" 
                            className="font-medium text-white" 
                            onClick={() => dispatch(changeModalState(true))} 
                            data-event-key="login"
                        >
                            Accedi
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}

export default CustomSignIn;