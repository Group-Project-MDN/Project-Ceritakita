import React, { useEffect, useState } from "react";
import client,{
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGE,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";
import {Trash2} from 'react-feather'
import Header from "../components/Header";
const Room = () => {
  const [message, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGE}.documents`, response => {
      
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log('A MESSAGE WAS CREATED');
        setMessages(prevState => [response.payload, ...prevState]);

      }

      if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log('A MESSAGE WAS DELETE!!!');
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id ))

      }
    })
      return () => {
        unsubscribe()
      }
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
      payload,
    );
    console.log(response);

    // setMessages((prevState) => [response, ...message]);

    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20)
      ]
    );
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGE, message_id);
    // setMessages(prevState => message.filter(message => message.$id !== message_id ))
  }
  return (
    <>
      <main className="container">
          <Header/>
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
                  {new Date(message.$createdAt).toLocaleString()}
                </small>
                  <Trash2
                    className="delete--btn"
                   onClick={() => {deleteMessage(message.$id)}}
                  />
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
