import { useState, useContext } from "react";
import { authProvider } from "./TokenProvider";
import { Link } from "react-router-dom";
import styles from "./css/SignUp.module.css"
function SignUp() {

    const [userName, setUserName] = useState<string>("");
    const [userAge, setUserAge] = useState<number>(18);
    const [userPassword, setUserPassword] = useState<string>("");

    const [responseMessage, setResponseMessage] = useState<string>("");

    const context = useContext(authProvider);
    if (!context)
        console.error("Could not load context")

    const getValueString = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        }
    }

    const getValueIntegral = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(Number(event.target.value));
        }
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const request = await fetch("http://localhost:3500/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ userName, userAge, userPassword }),
            });
            2
            if (!request.ok) {
                setResponseMessage("Could not send requeest");
                console.log("request not ok");
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
        <div className={styles.root}>

            <div className={styles.left}>
                <h1>Sign Up And</h1>
                <h1>Create Your'e Account</h1>
                <p>Already have an Account !</p>
                <Link to='/user/login'>
                    <p>Log in to my Account</p>
                </Link>
            </div>

            <div className={styles.right}>
                <form onSubmit={submit}>

                    <label>Enter Name</label><br />
                    <input type="text" onChange={getValueString(setUserName)} required /><br />

                    <label>Enter Age</label><br />
                    <input type="number" onChange={getValueIntegral(setUserAge)} required min={18} /><br />

                    <label>Enter Password</label><br />
                    <input type="password" onChange={getValueString(setUserPassword)} required /><br />

                    <button>Submit Request</button>
                </form>
                {responseMessage && <p style={{ color: "white", fontSize: "20px", marginTop: "3px" }}>{responseMessage}</p>}
            </div>
        </div>
    )
}

export default SignUp;