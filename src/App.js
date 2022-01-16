import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { useState } from 'react'

function App() {
  const [alert, setAlert] = useState(null); //alert will be by default null
  const showAlert = (message, type) => { //showAlert func will take 2 parameters- message, type
      // will try to set alert using  this func where setAlert here is the object.
      setAlert({
          msg: message,
          type: type
      })
      // will remove the showAlert after 3seconds
      setTimeout(() => {
          setAlert(null);
      }, 2000)
  }

  return (
    <>
      <NoteState>
        {/* react-router-dom version 6+ */}
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert_prop={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signin" element={<SignIn showAlert_prop={showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert_prop={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
