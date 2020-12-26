import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
    const [hweet, setHweet] = useState("");
    const [hweets, setHweets] = useState([]);
    const getHweets = async () => {
        const dbHweets = await dbService.collection("hweets").get();
        dbHweets.forEach((document) => {
            const hweetObject = {
                ...document.data(),
                id: document.id,
            };
            setHweets((prev) => [hweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getHweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("hweets").add({
            hweet,
            createdAt: Date.now(),
        });
        setHweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setHweet(value);
    };
    console.log(hweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={hweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Hweet" />
            </form>
            <div>
                {hweets.map((hweet) => (
                    <div key={hweet.id}>
                        <h4>{hweet.hweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;