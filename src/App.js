
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Maincontainer from './components/Maincontainer/Maincontainer';
import Login from './components/LoginComp/Login';
import Register from './components/Register/Register';
import Creategroup from './components/CreateGroup/Creategroup.js';
import Adduser from './components/AddUser/Adduser';
import Welcome from './components/Welcome/Welcome';
import Chatarea from './components/ChatArea/Chatarea';
import Allgroups from './components/CreateGroup/Allgroups';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='app' element={<Maincontainer/>}>
          <Route path='welcome' element={<Welcome/>}></Route>
          <Route path='chat/:id' element={<Chatarea/>}></Route>
          <Route path='register' element={<Register/>}></Route>
          <Route path='creategroup' element={<Creategroup/>}></Route>
          <Route path='Allgroups' element={<Allgroups/>}></Route>
          <Route path='adduser' element={<Adduser/>}></Route>
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
