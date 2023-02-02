import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie"
import Container from "react-bootstrap/Container"
import Login from "./views/Login";
import Register from "./views/Register";
import Main from "./views/Main";

function App() {

    const [loggedInUser, setLoggedInUser] = useState("")

    useEffect(()=> {
        const loggedInCookie = Cookies.get("loggedIn")
        if(loggedInCookie)
            setLoggedInUser(loggedInCookie)
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Container>
                    <h1>Coole App</h1>
                    <Routes>
                        <Route path="/login" element={
                            <Login 
                                loggedInUser={loggedInUser}
                                setLoggedInUser={setLoggedInUser}/>
                        } />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={
                            <Main 
                                loggedInUser={loggedInUser}
                                setLoggedInUser={setLoggedInUser}/>
                        } />
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>
    )
}

export default App