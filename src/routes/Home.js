import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Hweet from "components/Hweet";

const Home = ({ userObj }) => {
    const [hweet, setHweet] = useState("");
    const [hweets, setHweets] = useState([]);
    const [attachment, setAttachment] = useState();
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
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRef.putString(attachment, "data_url");
        console.log(response);
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
    //파일 미리 보기
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () =>
        setAttachment(null);

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <input
                    value={hweet}
                    onChange={onChange}
                    type="text"
                    placeholder="무슨 일이 일어날까요?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Hweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
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