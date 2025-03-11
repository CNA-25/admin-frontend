// NavBar.js
import "../../style/NavBar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/inventory">Inventory</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
