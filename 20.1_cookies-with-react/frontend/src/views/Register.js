export default function () {
    const handleForm = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <h2>Register</h2>
            <form onSubmit={handleForm}>
                <p id="error-message"></p>
                <div className="mb-3">
                    <input id="email" type="email" required placeholder="E-Mail Adresse"/>
                </div>
                <div className="mb-3">
                    <input id="password1" type="password" required placeholder="Passwort"/>
                </div>
                <div className="mb-3">
                    <input id="password2" type="password" required placeholder="Passwort wiederholen"/>
                </div>
                <button type="submit" className="btn btn-primary">Registrieren</button>
            </form>
            <a type="button" href="http://localhost:4001/auth/google" className="login-with-google-btn mt-3" >
                Sign in with Google
            </a>
        </>
    );
}
