import React, { useEffect, useState } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGE,
} from "../appwriteConfig";
import { ID } from "appwrite";

const Room = () => {
  const [message, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  useEffect(() => {
    getMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
    };
    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      ID.unique(),
      payload
    );
    console.log(response);

    setMessages((prevState) => [response, ...message]);

    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE
    );
    setMessages(response.documents);
  };
  return (
    <>
      <main className="container">
        <div className="room--container">
          <form onSubmit={handleSubmit} id="message--form">
            <div>
              <textarea
                required
                maxLength="1000"
                placeholder="your message"
                onChange={(e) => {
                  setMessageBody(e.target.value);
                }}
                value={messageBody}
              ></textarea>
            </div>
            <div className="send-btn--wrapper">
              <input
                className="btn btn--secondary"
                type="submit"
                value="Send"
              />
            </div>
          </form>
          <div>
            {message.map((message) => (
              <div key={message.$id} className="message--wrapper">
                <div className="message--header">
                  <small className="message-timestamp">
                    {message.$createdAt}
                  </small>
                </div>
                <div className="message--body">
                  <span>{message.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Room;
