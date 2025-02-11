
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/Products";
import Navbar from "./navbar";
import Login from "./pages/Login";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/products" element={<About />} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Router>
    );
}

export default App;
