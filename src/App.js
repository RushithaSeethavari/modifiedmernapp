//import logo from './logo.svg';
//import styles from './App.css';
import { BrowserRouter,Switch,Link,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import { useState } from 'react'
import Test from './components/Test'
//import AddProduct from './components/AddProduct'
import AdminProfile from './components/AdminProfile'

function App() {

  let [userLoginStatus,setUserLoginStatus]=useState('');


  const logOutuser=()=>{
    localStorage.clear();
    setUserLoginStatus(false)
  }
  return (

    <BrowserRouter>
    <div className='App'>

      <ul className="nav bg-light justify-content-end ">
        <li className="nav-item">
          <Link to ="/home" className="nav-link">Home</Link>
        </li>

        <li className="nav-item">
        <Link to ="/register" className="nav-link">Register</Link>
        </li>

        <li className="nav-item">
        <Link to ="/test" className="nav-link">Test</Link>
        </li>

        


        {
          !userLoginStatus ?
        <li className="nav-item">
        <Link to ="/login" className="nav-link">Login</Link>
        </li> :
        <li className="nav-item">
        <Link to ="/login" className="nav-link" onClick={()=>logOutuser}>Logout</Link>
        </li>
        }

      </ul>
    </div>
     {/*switches for components*/}
   <Switch>
    {/*route for home component*/}
     
       <Route path="/register"><Register/>
       </Route>
       <Route path="/login">
         <Login setUserLoginStatus={setUserLoginStatus}/>
       </Route>
       <Route path="/test"><Test/>
       </Route>
       <Route path="/userprofile/:username">
         <UserProfile/>
       </Route>
       <Route path="/adminprofile/:username">
         <AdminProfile/>
       </Route>

       <Route path="/">
         <Home />

       </Route>

      
      </Switch> 

    
    </BrowserRouter>
 );
}


    

export default App;
