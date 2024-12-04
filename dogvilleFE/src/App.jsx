import { Provider } from 'react-redux'
import './App.css'
import store from "./redux/store"

import HomepageCustom from './components/homepage/HomepageCustom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage'
import CustomNavbar from './components/navbar/CustomNavbar'
import CustomSidebar from './components/sidebar/CustomSidebar'
import LoginModal from "./components/modals/LoginModal.jsx";
import CustomSignIn from './components/registration/CustomSignIn.jsx'
import CustomFooter from './components/footer/CustomFooter.jsx'
import DogListWithFilters from './components/filters/DogListWithFilters .jsx'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className="flex flex-col mb-32">
            <CustomNavbar />
          </div>

          {/* Sidebar e Contenuto */}
          <div className="flex flex-grow">
            <div className="flex-shrink-0">
              <CustomSidebar />
            </div>
          </div>
          <Routes>
            <Route path="/" element={
              <HomepageCustom></HomepageCustom>
            }>
            </Route>
            <Route path="/register" element={
              <CustomSignIn></CustomSignIn>
            }>
            </Route>
            <Route path="/dogs" element={
              <DogListWithFilters></DogListWithFilters>
            }>
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
          <div className=''>
            <CustomFooter></CustomFooter>
          </div>
        </BrowserRouter>

        <LoginModal />
      </Provider >

    </>
  )
}

export default App
