import { useState } from 'react';
import './App.css';
import Inventory from './components/inventory';
import UserPage from "./components/newUser"

function App() {
  const checkUser = localStorage.getItem("auth")
  const [dark, setDark] = useState(false)

  return (
    <div className={dark? 'darkmode' : 'lightmode'}>
      {checkUser? <Inventory/> : <UserPage/>}
      <button className="darkmodebutton" onClick={() => {
        setDark(!dark)
        }}>{dark? "light mode" : "dark mode"}</button>
    </div>
  );
}

export default App;