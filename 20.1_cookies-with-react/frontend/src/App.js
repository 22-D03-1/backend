import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Login from "./views/Login";
import Register from "./views/Register";
import Main from "./views/Main";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Container>
                    <h1>Coole App</h1>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>
    )
}

export default App