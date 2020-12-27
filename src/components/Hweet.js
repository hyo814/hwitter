import React, { useState } from "react";
import { dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Hweet = ({ hweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newHweet, setNewHweet] = useState(hweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("진짜로 작성을 삭제 하시겠습니까?");
    if (ok) {
      await dbService.doc(`hweets/${hweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`hweets/${hweetObj.id}`).update({
      text: newHweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewHweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container hweetEdit">
            <input
              type="text"
              placeholder="편 집 하 기"
              value={newHweet}
              required
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="업 데 이 트" className="formBtn" />
          </form>
          <span onClick={toggleEditing}className="formBtn cancelBtn">취 소
          </span>
        </>
      ) : (
        <>
          <h4>{hweetObj.text}</h4>
          {hweetObj.attachmentUrl && <img src={hweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="hweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hweet;