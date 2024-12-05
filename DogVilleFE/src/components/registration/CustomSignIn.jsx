import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import './registration.css'
import { executeRegisterFetch } from "../../redux/loginFetchSlice";


function CustomSignIn() {
    const dispatch = useDispatch();
    const formRef = useRef(null)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(executeRegisterFetch(name, surname, address, telephoneNumber, email, password))
        formRef.current.reset()
    }


    const toggleState = useSelector((state) => state.sidebarToggle.value);
    return (
        <div className={`bg-transparent ${toggleState ? "pl-72" : "pl-24"} transition-all duration-300 flex-grow p-4 sm:relative lg:flex flex-row-reverse mt-5 `}>
            <img src="src/assets/pastoreTedesco.png" alt="pt" className="md:block hidden  lg:w-2/4" />
            <Card color="transparent" shadow={false} className="">
                <Typography variant="h4" color="white">
                    Registrati
                </Typography>
                <Typography color="white" className="mt-1 font-normal">
                    Felice di conoscerti! Inserisci i tuoi dettagli per registrarti
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" ref={formRef}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="white" className="-mb-3">
                            Il tuo nome
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Manuel"
                            className=" !border-t-white focus:!border-t-gray-900 text-whiteino !mr-10"
                            labelProps={{
                                className: "before:content-none after:content-none ",
                            }}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Typography variant="h6" color="white" className="-mb-3">
                            Il tuo cognome
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Barone"
                            className=" !mr-10 text-whiteino "
                            labelProps={{
                                className: "before:content-none after:content-none ",
                            }}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <Typography variant="h6" color="white" className="-mb-3">
                            Il tuo indirizzo
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Via Vialetto 76, Napoli"
                            className=" !mr-10 text-whiteino "
                            labelProps={{
                                className: "before:content-none after:content-none ",
                            }}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Typography variant="h6" color="white" className="-mb-3">
                            Il tuo numero di telefono
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="+393573893483"
                            className="  !mr-10 text-whiteino "
                            labelProps={{
                                className: "before:content-none after:content-none ",
                            }}
                            onChange={(e) => setTelephoneNumber(e.target.value)}
                        />
                        <Typography variant="h6" color="white" className="-mb-3">
                            La tua email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !mr-10 text-whiteino "
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography variant="h6" color="white" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className="  !mr-10 noBlu text-whiteino !border-white"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"

                                className="flex items-center font-normal text-whiteino "
                            >
                                Accetto i
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-g !mr-10"
                                >
                                    &nbsp;Termini e Condizioni
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5 checkbox-label" }} required


                    />
                    <Button className="mt-6 bg-grigino text-whiteino " fullWidth onClick={handleRegister}>
                        Registrati
                    </Button>
                    <Typography className="mt-4 text-center font-normal text-whiteino ">
                        Hai già un account?{" "}
                        <a href="#" className="font-medium text-white">
                            Accedi
                        </a>
                    </Typography>
                </form>
            </Card>

            <img src="src/assets/pastoreTedesco.png" alt="pt2" className="block md:hidden lg:w-2/4" />
        </div>

    )
}
export default CustomSignIn; 