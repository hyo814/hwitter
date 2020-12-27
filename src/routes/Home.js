import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Hweet from "components/Hweet";

const Home = ({ userObj }) => {
    const [hweet, setHweet] = useState("");
    const [hweets, setHweets] = useState([]);

    useEffect(() => {
        dbService.collection("hweets").onSnapshot((snapshot) => {
            const hweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHweets(hweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("hweets").add({
            hweet,
            text: hweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setHweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setHweet(value);
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <input
                    value={hweet}
                    onChange={onChange}
                    type="text"
                    placeholder="무슨 일이 일어날까요?"
                    maxLength={120}
                />&nbsp;
                <input type="submit" value="Hweet" />
            </form>
            <div style={{ marginTop: 50 }}>
                {hweets.map((hweet) => (
                     <Hweet
                        key={hweet.id}
                        hweetObj={hweet}
                        isOwner={hweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;