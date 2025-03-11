
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/common/NavBar";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Logout from "./pages/Logout";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/inventory" element={<Inventory/>} />
                <Route path="/logout" element={<Logout/>} />
            </Routes>
        </Router>
    );
}

export default App;
