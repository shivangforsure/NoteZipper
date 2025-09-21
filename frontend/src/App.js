import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import LandingPage from './Screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNotes from './Screens/MyNotes/MyNotes';
import LoginScreen from './Screens/LoginPage/LoginScreen'
import RegisterScreen from './Screens/RegisterPage/RegisterScreen';
import CreateNote from './Screens/CreateNote/CreateNote'
import SingleNote from './Screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
function App() {

  const [search, setSearch] = useState("")


  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path='/' Component={LandingPage} exact />
          <Route path='/login' Component={LoginScreen} exact />
          <Route path='/profile' Component={ProfileScreen} exact />
          <Route path='/register' Component={RegisterScreen} exact />
          <Route path='/createnote' Component={CreateNote} />
          <Route path='/note/:id' Component={SingleNote} />
          <Route path='/mynotes' Component={() => <MyNotes search={search} />} />
        </Routes>

      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
