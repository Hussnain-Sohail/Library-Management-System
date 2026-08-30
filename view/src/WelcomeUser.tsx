import { Link } from "react-router-dom"

function WelcomeUser() {
    return (
        <div id="root">
            <h1>Welcome User</h1>
            <h2>Please Select 1 Option</h2>
            <Link to="/user/signup">
                <h2>Create My Account</h2>
            </Link>
            <Link to="/user/login">
                <h2>LogIn to My Account</h2>
            </Link>
        </div>
    )
}
export default WelcomeUser;