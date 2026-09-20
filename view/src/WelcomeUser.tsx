import { Link } from "react-router-dom"
import "./css/WelcomeUser.css"

function WelcomeUser() {
    return (
        <div id="root">
            <div id="bodyWelcome">

                <h1>Welcome</h1>
                <h1>To My Library</h1>
                <h1>Please Select</h1>


                <Link to='/user/signup'>
                    <button>
                        SingUp
                    </button>
                </Link>
                <Link to='/user/login'>
                    <button>
                        Log In
                    </button>
                </Link>

            </div>
        </div>
    );
}
export default WelcomeUser;