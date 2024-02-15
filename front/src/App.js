import { useState } from 'react';
import './App.css';
import Inventory from './components/inventory';
import UserPage from "./components/newUser"

function App() {
  const checkUser = localStorage.getItem("auth")
  const checkTheme = localStorage.getItem("pathMode")
  let theme = (checkTheme)? checkTheme : null
  const [dark, setDark] = useState(theme)

  return (
    <div className={dark? 'darkmode' : 'lightmode'}>
      {checkUser? <Inventory/> : <UserPage/>}
      <button className="darkmodebutton" onClick={() => {
        setDark(!dark)
        localStorage.removeItem('pathMode')
        localStorage.setItem('pathMode', !dark)
        }}>{dark? "light mode" : "dark mode"}</button>
    </div>
  );
}

export default App;