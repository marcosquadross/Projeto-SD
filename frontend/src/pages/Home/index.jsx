import React, { useState, useEffect , useRef} from "react";
import "./style.css";
import "../../main.css";

import Sidebar from "../../components/sidebar";
import { Icon, useDisclosure, useToast } from "@chakra-ui/react";
import {
  IoMailOutline,
  IoMailOpenOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { GoReply } from "react-icons/go";

import { GetReceivedEmails } from "../../services";

import handleEmailDate from "../../functions/handleEmailDate";

import CreateEmail from "../../modals/createEmail";
import ShowEmail from "../../modals/showEmail";

import { set } from "lodash";

import { initWebSocket } from "../../websocket";

import { handleEmailExiste } from "../../functions/handleEmailWS";

export default function Home() {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const username = user_data.username;

  const toast = useToast();

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [isReply, setIsReply] = useState(false);

  const wsRef = useRef(null);

  // useEffect(() => {
  //   wsRef.current = new WebSocket("ws://localhost:8080");

  //   wsRef.current.addEventListener("open", (event) => {
  //     console.log("Conexão aberta com o servidor");
  //   });

  //   // Evento disparado quando uma mensagem é recebida do servidor
  //   wsRef.current.addEventListener("message", (event) => {
  //     console.log(`Recebido do servidor: ${event.data}`);
  //     const receivedData = JSON.parse(event.data); // Assuming data is in JSON format

  //     const emailExiste = receivedEmails.some(
  //       (email) => email._id === receivedData._id
  //     );

  //     if (!emailExiste && receivedData.recipients.includes(user_data.username)) {
  //       setReceivedEmails(prevEmails => [...prevEmails, receivedData]);
  //     }
  //   });

  //   // Evento disparado quando a conexão é fechada
  //   wsRef.current.addEventListener("close", (event) => {
  //     console.log("Conexão fechada");
  //   });

  //   return () => {
  //     wsRef.current.close();
  //   }
  // }, []);

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
          {/* <div className="search-bar">
            <SearchBar />
          </div> */}
        </header>
      </div>

      <div className="gasto">
        {receivedEmails.map((email) => (
          <div
            className="gasto_information"
            onClick={() => handleShowEmail(email)}
          >
            <p>{email.title}</p>
            <p>{email.author}</p>
            <p>{handleEmailDate(email.time)}</p>
            <p>{email.recipients}</p>
            <div>
              <Icon
                as={IoMailOutline}
                w={6}
                h={6}
                mr={10}
                ml={7}
                color="gray.500"
                style={{ cursor: "pointer" }}
              />
              <Icon
                as={IoTrashOutline}
                w={6}
                h={6}
                mr={10}
                color="gray.500"
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
