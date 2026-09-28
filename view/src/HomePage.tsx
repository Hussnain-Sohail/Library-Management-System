import { useState, useContext, useEffect } from "react";
import { authProvider } from "./TokenProvider";
import GetNewAccessToken from "./Protect";
import { useNavigate } from "react-router-dom";
import "./css/HomePage.module.css"

interface book {
    bookName: string,
    bookPrice: number,
    totalAvailable: number,
    Genre: string,
    otherInfo: string,
    imageSecureURL: string,
    imagePublicID: string,
};

function HomePage() {

    const context = useContext(authProvider);
    const [books, setBokks] = useState<book[] | null>(null);
    const navigate = useNavigate();
    const [validUser, setValidUser] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    if (!context)
        console.error("Could not create context");

    useEffect(() => {
        const helper = async () => {
            try {
                if (!(context!.accessToken)) {
                    const newTokenRecieved: boolean = await GetNewAccessToken();
                    if (!newTokenRecieved)
                        setValidUser(false);
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        helper();
    }, [])

    if (!validUser)
        navigate("/");

    const getSample = async () => {
        try {
            const request = await fetch("http://localhost:3500/homepage", {
                method: "POST",
                credentials: "include",
            });

            if (!request.ok)
                setError("Could not get Contents. Please try to refresh");

            const response = await request.json();
            setBokks(response.books);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const executor = async () => {
            await getSample();
        }
    }, []);

    return (
        <div id="root">
            {books !== null && books.map((book: book, index) => (
                <div className="Book" id={String(index)}>
                    <img src={book.imageSecureURL} />
                    <p>Name {book.bookName}</p>
                    <p>Price {book.bookPrice}</p>
                    <button>Click to see more information</button>
                </div>
            ))};
            {error && <h1>{error}</h1>}
        </div>
    )
}

export default HomePage;