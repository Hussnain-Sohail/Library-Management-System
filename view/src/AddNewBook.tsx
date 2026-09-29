import { useState, type ChangeEvent } from "react";
import styles from "./css/AddNewBook.module.css"
function AddNewBook() {
    let [name, setName] = useState<string>("");
    let [price, setPrice] = useState<number>(1);
    let [available, setAvailable] = useState<number>(1);
    let [genre, setGenre] = useState<string>("");
    let [otherInfo, setOtherInfo] = useState<string>("");

    let [status, setStatus] = useState<string>("");


    const getInputString = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            event.target.value;
        }
    }

    const getInputInt = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            Number(event.target.value);
        }
    }


    const submitBook = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            event.preventDefault();
            const request: any = await fetch("http://localhost:3500/admin/addnewbook", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, price, available, genre, otherInfo }),
            });

            if (!request.ok) {
                setStatus("Could not submit new book");
                return;
            }

            const response = await request.json();
            setStatus(response.message);
        }
        catch (error) {
            console.error(error);
            setStatus("Could not submit new book");
        }
    }

    return (
        <div id={styles.root}>

            <div id={styles.container1}>

                <div className={styles.child}>
                    <label>Enter Name</label><br />
                    <input type="text" onChange={getInputString(setName)} required />
                </div>

                <div className={styles.child}>
                    <label>Enter Price</label><br />
                    <input type="number" onChange={getInputInt(setPrice)} required min={1} />
                </div>

                <div className={styles.child}>
                    <label>Total Books Available</label><br />
                    <input type="number" onChange={getInputInt(setAvailable)} min={0} required />
                </div>

            </div>

            <div id={styles.container2}>

                <div className={styles.child}>
                    <label>Book Genre</label><br />
                    <input type="text" onChange={getInputString(setGenre)} required />
                </div>

                <div className={styles.child}>
                    <label>Book Genre</label><br />
                    <input type="text" onChange={getInputString(setOtherInfo)} />
                </div>

            </div>

        </div>
    );
}

export default AddNewBook