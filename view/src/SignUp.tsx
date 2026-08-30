import { useState } from "react";

function SignUp() {

    const [name, setUserName] = useState<string>("");
    const [age, setUserAge] = useState<number>(18);
    const [password, setUserPassword] = useState<string>("");

    const [responseMessage, setResponseMessage] = useState<string>("");

    const getValueString = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            //React.Dispatch<React.SetStateAction<string>>
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, age, password }),
            });

            if (!request.ok)
                setResponseMessage("Could not send requeest");

            const response = await request.json();
            setResponseMessage(response.message);

        }
        catch (error) {
            console.error(error);
            setResponseMessage("Could not send requeest");
        }
    }

    return (
        <form onSubmit={submit}>

            <label>Enter Name</label><br />
            <input type="text" onChange={getValueString(setUserName)} required /><br />

            <label>Enter Age</label><br />
            <input type="number" onChange={getValueIntegral(setUserAge)} required min={18} /><br />

            <label>Enter Password</label><br />
            <input type="password" onChange={getValueString(setUserPassword)} required /><br />

            <button>Submit Request</button>

            {responseMessage && <p>{responseMessage}</p>}

        </form>
    )
}

export default SignUp;