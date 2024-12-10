
import { useSelector } from "react-redux";
import { animateCount } from "../../Utils.js"
import { useEffect } from "react";
import "./homepage.css"


function HomepageCustom() {
    const toggleState = useSelector((state) => state.sidebarToggle.value);

    useEffect(() => {
        const countElements = document.querySelectorAll(".count");
        countElements.forEach((element) => {
            const endValue = parseFloat(element.textContent);
            animateCount(element, 0, endValue, 10000, 0);
        });
    }, []);


    return (
        <>
            <div className={`bg-transparent ${toggleState ? "!ml-64 " : "!ml-24"} transition-all duration-300 flex-grow p-4 justify-center sm:relative mt-10`}>
                <div className="select-none planning text-xl sm:text-2xl transition-all duration-300 sm:absolute right-16 top-24 lg:top-36 lg:right-1/3 sm:top-6 md:right-6
                    ">
                    <p>Stai pensando di</p><p> adottare un cane?</p>
                </div>
                <div className="immagineCentrale mb-5 sm:mb-0 my-10 select-none">
                    <img src="src/assets/caneRimosso.png" alt="caniello" className="sm:w-9/12 w-full" />
                </div>
                <div className="select-none downContainer sm:flex items-center justify-between sm:absolute bottom-0 lg:bottom-10 w-11/12 transition-all duration-300 ">
                    <div className="conteggi">
                        <div className="nearYou mb-10">
                            <p className="count sm:text-6xl sm:mb-3 text-4xl mb-2 transition-all duration-300">600<span>+</span></p>
                            <p className="text-sm">Cani disponibili nelle tue vicinanze</p>
                        </div>
                        <div className="shopItems">
                            <p className="count sm:text-6xl sm:mb-3 text-4xl mb-2 transition-all duration-300">450<span>+</span></p>
                            <p className="text-sm">Accessori e cibo per cani</p>
                        </div>
                    </div>
                    <div className="select-none motto text-3xl mt-10 md:text-4xl lg:text-5xl font-thin transition-all duration-300 ">
                        <p>Il tuo migliore amico,</p>
                        <p>è in buone mani</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomepageCustom;
