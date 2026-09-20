import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authProvider } from "./TokenProvider";
import styles from "./css/Login.module.css"
function LogIn() {

    const [userName, setUserName] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const [responseMessage, setResponseMessage] = useState<string>("");

    const context = useContext(authProvider);
    if (!context)
        console.error("Could not load context");

    const getValueString = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        }
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const request = await fetch("http://localhost:3500/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Credentilas": "include",
                },
                body: JSON.stringify({ userName, userPassword }),
            });

            if (!request.ok) {
                setResponseMessage("Could not send requeest");
                console.error("Request not ok in login.tsx");
            }
            else {
                const response = await request.json();
                setResponseMessage(response.message);
                context!.setAccessToken(response.accessToken);
            }

        }
        catch (error) {
            console.error(error);
            setResponseMessage("Could not send requeest");
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <h1>Login to your'e Account</h1>
                <h3>Dont have an Account !</h3>
                <Link to='/user/login'>
                    <p>Sign Up</p>
                </Link>
            </div>

            <div className={styles.right}>
                <form onSubmit={submit}>

                    <label>Enter Name</label><br />
                    <input type="text" onChange={getValueString(setUserName)} required /><br />

                    <label>Enter Password</label><br />
                    <input type="password" onChange={getValueString(setUserPassword)} required /><br />

                    <button>Submit Request</button>

                    {responseMessage && <p style={{ color: "white", font: "20px", marginTop: "5px" }}>{responseMessage}</p>}

                </form>
            </div>

        </div>
    )
}

export default LogIn;