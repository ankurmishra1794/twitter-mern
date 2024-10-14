import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Login from './components/Login';
import './App.css';
import {Toaster} from 'react-hot-toast';

function App() {  
  return (
    <>
        <BrowserRouter>           
          <Routes>
            <Route exact path='/home' element={<Feed/>}/>
            <Route exact path='/profile/:id' element={<Profile/>}/>           
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/' element={<Login/>}/> 
          </Routes>                
       </BrowserRouter> 
       <Toaster/>              
    </>                                  
  );
}

export default App;
