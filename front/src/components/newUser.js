import { useState } from "react"

const UserPage = () => {
    const [newuser, setNew] = useState(false)
    const [company, setCompany] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('/login-user' , {
            method: 'POST',
            body: JSON.stringify({company, password}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await res.json()
        console.log("res", res);
        console.log("json", json);
        
        if(!res.ok) {
            return alert(json.msg)
        }
        localStorage.setItem("company", json.company)
        localStorage.setItem("auth", json.auth)
        window.location.reload()
    }
    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await fetch('/create-user' , {
            method: 'POST',
            body: JSON.stringify({company, oldpassword : password}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await res.json()

        console.log("res", res);
        console.log("json", json);
        
        if(!res.ok) {
            return alert(json.msg)
        }
        alert("kindly login now")
        setNew(true)
    }

    return(
        <div className="userPage">
            <button onClick={() => setNew(!newuser)} className="setuser"><h2>wanna, {newuser? "signup" : "login"} ?</h2></button>
            <p>{newuser? "login page it is" : "sign-up page it is"}</p>
            <form>
                <input type="text" placeholder="company name" value={company} onChange={e => setCompany(e.target.value)}/>
                <input type="password" placeholder="organisation password" value={password} onChange={e => setPassword(e.target.value)}/>

            </form>
            <button onClick={newuser? (e) => handleLogin(e) : (e) => handleSignup(e)} className="login"> {newuser? "login": "sign up"} </button>
        </div>
    )
}

export default UserPage