import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomepageCustom from './components/homepage/HomepageCustom';
import NotFoundPage from './components/NotFoundPage';
import CustomNavbar from './components/navbar/CustomNavbar';
import CustomSidebar from './components/sidebar/CustomSidebar';
import LoginModal from './components/modals/LoginModal.jsx';
import CustomSignIn from './components/registration/CustomSignIn.jsx';
import CustomFooter from './components/footer/CustomFooter.jsx';
import DogListWithFilters from './components/filters/DogListWithFilters .jsx';
import DogDetail from './components/detailPages/dogDetail.jsx';
import CustomProfile from './components/UserEdit/CustomProfile';
import UserAdoptions from './components/UserEdit/adoptions/UserAdoptions';
import UserQuiz from './components/UserEdit/UserQuiz';
import { useSelector } from 'react-redux';
import BottomBar from './components/bottombar/BottomBar.jsx';

function App() {
  const user = useSelector((state) => state.meFetch.value);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex flex-col lg:mb-32 main-content">
          <CustomNavbar />
        </div>

        <div className="flex flex-grow -mt-32 ">
          <CustomSidebar />

          <div className="flex-grow ">
            <Routes>
              <Route path="/" element={<HomepageCustom />} />
              {!user && <Route path="/register" element={<CustomSignIn />} />}
              <Route path="/dogs" element={<DogListWithFilters />} />
              <Route path="/dog/:id" element={<DogDetail />} />
              <Route path="/profilo" element={<CustomProfile />} />
              <Route path="/quiz" element={<UserQuiz />} />
              <Route path="/adozioni" element={<UserAdoptions />} />
              <Route path="*" element={<NotFoundPage />} />
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
