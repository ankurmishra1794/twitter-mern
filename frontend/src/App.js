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
            <Route path='/home' element={<Feed/>}/>
            <Route path='/profile/:id' element={<Profile/>}/>           
            <Route path='/login' element={<Login/>}/> 
          </Routes>                
       </BrowserRouter> 
       <Toaster/>              
    </>                                  
  );
}

export default App;
