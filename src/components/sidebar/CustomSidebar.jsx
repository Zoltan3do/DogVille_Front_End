import { useState } from 'react';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeSidebarState } from '../../redux/sidebarSlice';
import { changeModalState } from "../../redux/loginToggleSlice";
import "./sidebar.css"
import logo from "../../assets/dogvilleLogo-removebg.png"
import { Link, useNavigate } from 'react-router-dom';

function CustomSidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleState = useSelector((state) => state.sidebarToggle.value);
  const meData = useSelector((state) => state.meFetch.value);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleMenu = (menuName) => {
    if (isExpanded) setOpenMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  const handleToggle = (expanded) => {
    setIsExpanded(expanded);
    dispatch(changeSidebarState(expanded));
    if (!expanded) setOpenMenu(null);
  };

  function handleExit() {
    localStorage.removeItem("Access Token")
    navigate("/")
    location.reload()
  }

  return (
    <SideNav
      style={{
        position: "fixed",
        backgroundColor: '#000',
        color: '#fff',
        flexDirection: 'column',
        width: isExpanded ? '250px' : '50px',
        transition: 'all 0.3s ease',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      className="hidden md:w-64 lg:flex"
      onToggle={handleToggle}
      id="sidenav"
    >
      <img
        src={logo}
        alt="Logo del sito"
        style={{
          width: '100%',
          transition: 'all 0.3s ease',
        }}
        className="mx-1"
      />

      <Toggle />
      <div style={{ flex: 1 }} className="mt-5 mb-5">
        <SideNav.Nav defaultSelected="home">

          <NavItem eventKey="home">
            <NavIcon>
              <Link to={"/"}>
                <i className="fa fa-fw fa-home" style={{ fontSize: 15 }}></i></Link>
            </NavIcon>
            <NavText>
              <Link to={"/"}>
                <p>Home</p>
              </Link>
            </NavText>
          </NavItem>

          <NavItem eventKey="about">
            <NavIcon>
              <Link to={"/about"}>
                <i className="fa fa-fw fa-address-card" style={{ fontSize: 15 }}></i>
              </Link>
            </NavIcon>
            <NavText>
              <Link to={"/about"}><p>Chi siamo</p></Link></NavText>
          </NavItem>

          <NavItem eventKey="dogs">
            <NavIcon>
              <Link to={"/dogs"}>
                <i className="fa fa-fw fa-dog" style={{ fontSize: 15 }}></i>
              </Link>
            </NavIcon>
            <NavText>
              <Link to={"/dogs"}>
                <p>Cani</p>
              </Link>
            </NavText>
          </NavItem>

          <NavItem eventKey="services" onClick={() => toggleMenu('services')}>
            <NavIcon>
              <i className="fa fa-fw fa-bell-concierge" style={{ fontSize: 15 }}></i>
            </NavIcon>
            <NavText>Servizi</NavText>
          </NavItem>

          {openMenu === 'services' && (
            <>
              <NavItem className="text-start mx-5">
                <NavText>
                  <Link to={"/dogs"}>
                    <p>Adotta un cane</p>
                  </Link>
                </NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Consegna un cane</NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Studio veterinario H24</NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Vitto e alloggio</NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Microchip identificativo</NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Vaccinazioni e sverminamenti</NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Parti assistiti</NavText>
              </NavItem>
            </>
          )}

          <NavItem eventKey="cure" onClick={() => toggleMenu('cure')}>
            <NavIcon>
              <i className="fa fa-fw fa-virus-slash" style={{ fontSize: 15 }}></i>
            </NavIcon>
            <NavText>Cure</NavText>
          </NavItem>

          {openMenu === 'cure' && (
            <>
              <NavItem className="text-start mx-5">
                <NavText className="">Vaccini avanzati</NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Trattamento antipulci</NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Sterilizzazione e castrazione</NavText>
              </NavItem>
              <NavItem className="text-start mx-5">
                <NavText>Pulizia dentale</NavText>
              </NavItem>
            </>
          )}

          <NavItem eventKey="contacts">
            <NavIcon>
              <Link to={"/contacts"}> <i className="fa fa-fw fa-address-book" style={{ fontSize: 15 }}></i></Link>
            </NavIcon>
            <NavText><Link to={"/contacts"}><p>Contatti</p></Link></NavText>
          </NavItem>
        </SideNav.Nav>
      </div>

      <hr className={toggleState ? `block` : 'hidden'} />
      {/* Sezione inferiore per Login, Sign In e Contattaci */}
      <div className="pt-10 pb-5 text-reddino " >
        <Link to={"/favourites"}>
          <div data-event-key="likes" className={` text-sm ${!toggleState ? "text-center" : ""} flex items-center p-3 pl-6 w-full sideElement cursor-pointer hover:text-white`}>
            <i className="fa fa-regular fa-heart mr-4" style={{ fontSize: 15 }}></i>
            <p className={`${!toggleState ? "hidden" : ""}`}>Preferiti</p>
          </div>
        </Link>
        <div data-event-key="shop" className={`mt-3 text-sm ${!toggleState ? "text-center" : ""} flex items-center p-3 pl-6 w-full sideElement cursor-pointer hover:text-white`}>
          <i className="fa fa-solid fa-bag-shopping mr-4" style={{ fontSize: 15 }}></i>
          <p className={`${!toggleState ? "hidden" : ""}`}>Shop</p>
        </div>

        <a href="tel:+393517416230">
          <div data-event-key="callme" className={`mt-3 text-sm  ${!toggleState ? "sm:hidden text-center" : ""} flex items-center p-3 pl-6 w-full sideElement cursor-pointer hover:text-white`}>
            <i className="fa-solid fa-phone mr-4" style={{ fontSize: 15 }}></i>
            <p className={`${!toggleState ? "hidden" : ""}`}>Chiamaci</p>
          </div>
        </a>

        {
          meData ? (
            <>
              <Link to={"/profilo"}>
                <div data-event-key="register" className={`mt-3 text-sm  ${!toggleState ? "sm:hidden text-center" : ""} flex items-center p-3 pl-6 w-full sideElement cursor-pointer hover:text-white`}>
                  <i className='fa fa-solid fa-user mr-4' style={{ fontSize: 15 }}></i>
                  <p className={`${!toggleState ? "hidden" : ""}`}>Profilo</p>
                </div>
              </Link>

              <div onClick={handleExit} data-event-key="register" className={`mt-3 text-sm  ${!toggleState ? "sm:hidden text-center" : ""} flex items-center p-3 pl-6 w-full sideElement cursor-pointer hover:text-white`}>
                <i className='fa fa-solid fa-right-from-bracket mr-4' style={{ fontSize: 15 }}></i>
                <p className={`${!toggleState ? "hidden" : ""}`}>Esci</p>
              </div>

            </>
          ) : (
            <>
              <div onClick={() => dispatch(changeModalState(true))} data-event-key="login" className={`mt-3 text-sm  ${!toggleState ? "sm:hidden text-center" : ""} flex items-center p-3 pl-6 w-full sideElement cursor-pointer hover:text-white`}>
                <i className='fa fa-solid fa-right-to-bracket mr-4' style={{ fontSize: 15 }}></i>
                <p className={`${!toggleState ? "hidden" : ""}`}>Accedi</p>
              </div>
              <Link to={"/register"}>
                <div data-event-key="register" className={`mt-3 text-sm  ${!toggleState ? "sm:hidden text-center" : ""} flex items-center p-3 pl-6 w-full sideElement cursor-pointer hover:text-white`}>
                  <i className='fa fa-solid fa-address-card mr-4' style={{ fontSize: 15 }}></i>
                  <p className={`${!toggleState ? "hidden" : ""}`}>Registrati</p>
                </div>
              </Link>
            </>
          )
        }
      </div>
    </SideNav>
  );
}

export default CustomSidebar;
