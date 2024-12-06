import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { changeModalState } from "../../redux/loginToggleSlice";
import "./login.css"
import { executeLoginFetch } from "../../redux/loginFetchSlice";
import { useState } from "react";
import '../registration/registration.css'


function LoginModal() {

    const dispatch = useDispatch();
    const open = useSelector((state) => state.loginModalToggle.value);
    // const loginState = useSelector((state) => state.loginFetch.value);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOpen = () => {
        dispatch(changeModalState(!open));
    };

    const handleLogin = async () => {
        try {
            const result = await dispatch(executeLoginFetch(email, password));
            if (result == true) {
                resetFields();
                handleOpen();
                location.reload()
            } else {
                console.error("Login fallito");
            }
        } catch (error) {
            console.error("Errore inatteso durante il login:", error);
        }
    };


    const resetFields = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" className="text-primary-color">
                            Accedi
                        </Typography>
                        <Typography
                            className="mb-3 font-normal text-primary-color"
                            variant="paragraph"
                        >
                            Inserisci le tue Email e Password per accedere.
                        </Typography>
                        <Typography className="-mb-2 text-primary-color" variant="h6" >
                            La tua e-mail
                        </Typography>
                        <Input placeholder="Email" size="lg" value={email}
                            onChange={(e) => setEmail(e.target.value)} type="email" className="noBlu" />
                        <Typography className="-mb-2 text-primary-color noBlu" variant="h6" required>
                            La tua password
                        </Typography>
                        <Input placeholder="Password" size="lg" value={password}
                            onChange={(e) => setPassword(e.target.value)} type="password" required className="noBlu" />
                        <div className="-ml-2.5 -mt-3">
                            <Checkbox label="Ricordami" className="text-primary-color focus:ring-0 focus:outline-none border-primary-color border-1 focus:border-1" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleLogin} fullWidth className="bg-primary-color " >
                            Accedi
                        </Button>
                        <Typography variant="small" className="mt-4 flex justify-center">
                            Non hai un account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                className="ml-1 font-bold text-primary-color"
                                onClick={handleOpen}
                            >
                                Registrati
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    )
}

export default LoginModal;