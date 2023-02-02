export default function ({loggedInUser}) {
    return (
        <>
            <h2>Main</h2>
            <h3>User: {loggedInUser}</h3>
            <a href="http://localhost:4001/auth/logout">Ausloggen</a>
        </>
    );
}
