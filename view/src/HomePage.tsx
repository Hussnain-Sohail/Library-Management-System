import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./css/HomePage.module.css"

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

    const [bookSample, setBookSample] = useState<book[]>([]);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const getSample = async () => {
        try {
            const request = await fetch("http://localhost:3500/book/sample", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "credentials": "include"
                },
            });
            if (!request.ok) {
                navigate("/");
            }
            const response = await request.json();
            setBookSample(response.message);
            setMessage("");
        }
        catch (error) {
            console.error(error);
            setMessage("Could not get Page Content");
        }
    }

    useEffect(() => {
        async () => {
            await getSample();
        }
    });

    return (
        <div id={style.root}>
            {message.length !== 0 && <h1>{message}</h1>}
            <div id={style.sampleArray}>
                {bookSample.map(book => (
                    <div>
                        <img src={book.imagePublicID} />
                        <p>Name: {book.bookName}</p>
                        <button>Click for more information</button>
                    </div>
                ))};
            </div>
        </div>
    )

}

export default HomePage;