import { useContext } from "react";
import { authProvider } from "./TokenProvider";

async function GetNewAccessToken(): Promise<boolean> {
    try {
        const context = useContext(authProvider);
        if (context === null) {
            console.error("Context is null");
            return false;
        }

        const request = await fetch("http://localhost:3500/user/NewAccessToken", {
            method: "POST",
            credentials: "include",
        });

        if (!request.ok) {
            console.error("Request not ok for new access token");
            return false;
        }

        const response = await request.json();
        context.setAccessToken(response.accessToken);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export default GetNewAccessToken;