import { Link } from "react-router-dom";

export default function () {
    const handleForm = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleForm}>
                <p id="error-message"></p>
                <div className="mb-3">
                    <input id="email" type="email" required placeholder="E-Mail Adresse"/>
                </div>
                <div className="mb-3">
                    <input id="password" type="password" required placeholder="Passwort"/>
                </div>
                <button type="submit" className="btn btn-primary">Anmelden</button>
            </form>
            <Link to="/register">Noch keinen Account? Jetzt registrieren</Link>
        </>
    );
}
