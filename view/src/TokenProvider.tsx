import { createContext, useState } from "react";
import type { PropsWithChildren } from "react"

interface token {
    accessToken: string | null,
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
};

const authProvider = createContext<token | null>(null);

function TokenProvider({ children }: PropsWithChildren) {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    return (
        <authProvider.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </authProvider.Provider>
    )
}

export { authProvider }
export default TokenProvider;