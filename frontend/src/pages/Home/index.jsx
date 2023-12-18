import React, { useState, useEffect , useRef} from "react";
import "./style.css";
import "../../main.css";

import Sidebar from "../../components/sidebar";
import { Icon, useDisclosure, useToast } from "@chakra-ui/react";
import {
  IoMailOutline,
  IoMailOpenOutline,
} from "react-icons/io5";

import { GoReply } from "react-icons/go";

import { GetReceivedEmails } from "../../services";

import CreateEmail from "../../modals/createEmail";
import ShowEmail from "../../modals/showEmail";

import { set } from "lodash";

import { initWebSocket } from "../../websocket";

import { handleEmailExiste } from "../../functions/handleEmailWS";
import { handleRecipients } from "../../functions/handleRecipients";
import handleEmailDate from "../../functions/handleEmailDate";

export default function Home() {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const username = user_data.username;

  const toast = useToast();

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [isReply, setIsReply] = useState(false);

  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = initWebSocket((data) => {
      const receivedData = JSON.parse(data);

      if (handleEmailExiste(receivedEmails, receivedData, user_data)) {
        setReceivedEmails((prevEmails) => [...prevEmails, receivedData]);
      }
    });

    return () => {
      wsRef.current.close();
    };
  }, []);

  const sortByTime = (a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeB - timeA;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetReceivedEmails(user_data.user_id, toast);
        setReceivedEmails(res);
      } catch (error) {
        console.error("Erro ao obter os emails:", error);
      }
    };
    fetchData();
  }, []);


  const handleReplyEmail = (email) => {
    setSelectedEmail(email);
    setIsReply(true);
    onModalCreateEmailOpen();
  };

  const {
    isOpen: isModalCreateEmailOpen,
    onOpen: onModalCreateEmailOpen,
    onClose: onModalCreateEmailClose,
  } = useDisclosure();

  const {
    isOpen: isModalShowEmailOpen,
    onOpen: onModalShowEmailOpen,
    onClose: onModalShowEmailClose,
  } = useDisclosure();

  const handleShowEmail = (email) => {
    setSelectedEmail(email);
    onModalShowEmailOpen();
  };

  return (
    <>
      <Sidebar user={username} />
      <div className="body">
        <header className="home">
          <h1 className="page-title">Recebidos</h1>
        </header>
      </div>

      <div className="gasto">
        {receivedEmails.sort(sortByTime)
          .map((email) => (
          <div
            className="gasto_information"
          >
            <p>{email.title}</p>
            <p>De: {email.author}</p>
            <p>{handleEmailDate(email.time)}</p>
            <p>Para: {handleRecipients(email.recipients)}</p>
            <div>
              <Icon
                as={IoMailOutline}
                w={6}
                h={6}
                mr={10}
                ml={7}
                color="gray.500"
                onClick={() => handleShowEmail(email)}
                style={{ cursor: "pointer" }}
              />

              <Icon
                as={GoReply}
                w={6}
                h={6}
                color="gray.500"
                onClick={() => handleReplyEmail(email)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        {selectedEmail && (
          <ShowEmail
            isOpen={isModalShowEmailOpen}
            onClose={onModalShowEmailClose}
            email={selectedEmail}
          />
        )}
      </div>

      <div>
        <CreateEmail
          isOpen={isModalCreateEmailOpen}
          onClose={onModalCreateEmailClose}
          user={username}
          isReply={isReply}
          email={selectedEmail}
        ></CreateEmail>
      </div>
    </>
  );
}
