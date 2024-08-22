import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {

    let loggedUserData = useContext(UserContext);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("nutrify-user");
        loggedUserData.setLoggedUser(null);
        navigate("/login");
    }

    return (
        <div className="header">
            <span><Link to="/track">Track</Link></span>
            <span><Link to="/diet">Diet</Link></span>
            <span className="logout-btn" onClick={logout}>Logout</span>
        </div>
    )
}