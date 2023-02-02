import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function ({loggedInUser, setLoggedInUser}) {
    const navigate = useNavigate()

    const clickHandler = () => {
        fetch("http://localhost:4001/auth/logout", {
            credentials: "include"
        })
        .then(res => {
            if (res.status == 200) {
                setLoggedInUser("")
                navigate("/login")
            }
        })
    }

    useEffect(()=>{
        if(!loggedInUser) navigate("/login")
    },[])

    return (
        <>
            <h2>Main</h2>
            <h3>User: {loggedInUser}</h3>
            <button className="btn btn-primary" onClick={clickHandler}>Ausloggen</button>
        </>
    );
}
