import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ({loggedInUser, setLoggedInUser}) {

    const [state, setState] = useState({
        emailInput: "",
        passwordInput: "",
        errorMessage: ""
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        e.preventDefault()


        fetch("http://localhost:4001/auth/login", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: state.emailInput,
                password: state.passwordInput
            })
        })
        .then(res => {
            if(res.status == 200) return res.json()
            else throw Error("Login nicht erfolgreich")
        })
        .then(json => {
            setLoggedInUser(json.id)
            navigate("/")
        })
        .catch((err) => setState({...state, errorMessage: err.message}))
    }

    useEffect(()=>{
        console.log(loggedInUser)
        if(loggedInUser) navigate("/")
    },[loggedInUser])

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleForm}>
                <p id="error-message">{state.errorMessage}</p>
                <div className="mb-3">
                    <input 
                        value={state.emailInput}
                        onChange={(e)=>setState({...state, emailInput: e.target.value})}
                        type="email" 
                        required 
                        placeholder="E-Mail Adresse"/>
                </div>
                <div className="mb-3">
                    <input 
                        value={state.passwordInput}
                        onChange={(e)=>setState({...state, passwordInput: e.target.value})}
                        type="password" 
                        required 
                        placeholder="Passwort"/>
                </div>
                <button type="submit" className="btn btn-primary">Anmelden</button>
            </form>
            <Link to="/register">Noch keinen Account? Jetzt registrieren</Link>
        </>
    );
}
