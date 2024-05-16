import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Footer from './components/Footer';
import MyPagePerson from './pages/MyPagePerson';
import MyPageGroup from './pages/MyPageGroup';
import Login from './pages/Login';
import Join from './pages/Join';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/mypagePerson' element={<MyPagePerson />} />
          <Route path='/mypageGroup' element={<MyPageGroup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join/:joinId' element={<Join />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
      
  );
}

export default App;
