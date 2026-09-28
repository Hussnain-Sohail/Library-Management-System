import { useContext, useEffect, useState, type PropsWithChildren } from "react";
import { authProvider } from "./TokenProvider.tsx";

function Protector({ children }: PropsWithChildren) {
    const context = useContext(authProvider);
    const [success, setSuccess] = useState<boolean>(false);
    if (context === null) {
        console.error("Context is null");
        setSuccess(false);
    }

    const executor = async () => {
        try {
            const request = await fetch("http://localhost:3500/user/NewAccessToken", {
                method: "POST",
                credentials: "include",
            });

            if (!request.ok) {
                console.error("Request not ok for new access token");
                setSuccess(false);
            }

            const response = await request.json();
            context!.setAccessToken(response.accessToken);
            setSuccess(true);
        } catch (error) {
            console.error(error);
            setSuccess(false);
        }
    };

    useEffect(() => {
        executor();
    }, []);


    return (success === true ? <h1>Loading .....</h1> : children);
};

export default Protector;