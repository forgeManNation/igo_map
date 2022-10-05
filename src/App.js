import React, {useEffect} from 'react';
import './app.scss';
import Table from './features/table/Table';
import Sidebar from "./features/sidebar/Sidebar.js"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/authentication/userSlice';
import { auth, onAuthStateChanged } from './firebase';
import SignIn from './features/authentication/SignIn';


function App() {

const user = useSelector(selectUser);
const dispatch = useDispatch();

useEffect(() => {

  onAuthStateChanged(auth, (userAuth) => {
    if(userAuth){


      console.log(userAuth, "now i am logging in");

      dispatch(
        login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        })
      );
    } else {

      console.log("so now i am logging out :)))))");
      
      dispatch(logout());
    }
})

  }, [])


  



  return <>
  {/* user */}
    {user ? <div className="App d-flex flex-row">
        <Sidebar></Sidebar>
        <Table></Table>
    </div>
    :
    <SignIn></SignIn>
    }
    </>
}

export default App;
