import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomepageCustom from "./components/homepage/HomepageCustom";
import NotFoundPage from "./components/NotFoundPage";
import CustomNavbar from "./components/navbar/CustomNavbar";
import CustomSidebar from "./components/sidebar/CustomSidebar";
import LoginModal from "./components/modals/LoginModal.jsx";
import CustomSignIn from "./components/registration/CustomSignIn.jsx";
import CustomFooter from "./components/footer/CustomFooter.jsx";
import DogListWithFilters from "./components/filters/DogListWithFilters .jsx";
import DogDetail from "./components/detailPages/DogDetail.jsx";
import CustomProfile from "./components/UserEdit/CustomProfile";
import UserAdoptions from "./components/UserEdit/adoptions/UserAdoptions";
import UserQuiz from "./components/UserEdit/UserQuiz";
import { useSelector } from "react-redux";
import BottomBar from "./components/bottombar/BottomBar.jsx";
import { useEffect } from "react";
import Favourites from "./components/Likes/Likes.jsx";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy.jsx";
import Terms from "./components/privacyPolicy/Terms.jsx";
import Chisiamo from "./components/about/Chisiamo.jsx";
import Contacts from "./components/about/Contacts.jsx";
import ComingSoon from "./components/ComingSoon.jsx";

function App() {
  const user = useSelector((state) => state.meFetch.value);

  useEffect(() => {}, [user]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex flex-col lg:mb-32 main-content">
          <CustomNavbar />
        </div>

        <div className="flex flex-grow -mt-32 ">
          <CustomSidebar />

          <div className="flex-grow min-h-screen">
            <Routes>
              <Route path="/" element={<HomepageCustom />} />
              {!user && <Route path="/register" element={<CustomSignIn />} />}
              <Route
                path="/dogs"
                element={user ? <DogListWithFilters /> : <CustomSignIn />}
              />
              <Route path="/dog/:id" element={<DogDetail />} />
              <Route
                path="/profilo"
                element={user ? <CustomProfile /> : <CustomSignIn />}
              />
              <Route
                path="/quiz"
                element={user ? <UserQuiz /> : <CustomSignIn />}
              />
              <Route
                path="/adozioni"
                element={user ? <UserAdoptions /> : <CustomSignIn />}
              />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about" element={<Chisiamo />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
            </Routes>
          </div>
        </div>
        <CustomFooter />
        <BottomBar></BottomBar>
        <LoginModal />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
