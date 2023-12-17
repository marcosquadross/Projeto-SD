import React, { useState, useEffect } from "react";
import "./style.css";
import "../../main.css";

import { GetSentEmails } from "../../services";

import Sidebar from "../../components/sidebar";
import { Icon, Button, useDisclosure, useToast } from "@chakra-ui/react";
import {
  IoMailOutline,
  IoMailOpenOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { GoReply } from "react-icons/go";

import handleEmailDate from "../../functions/handleEmailDate";

import ShowEmail from "../../modals/showEmail";

export default function SentEmails() {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const username = user_data.username;
  
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  
  const toast = useToast();
  
  const handleShowEmail = (email) => {
    setSelectedEmail(email);
    onModalShowEmailOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetSentEmails(user_data.user_id, toast);
        setSentEmails(res);
      } catch (error) {
        console.error("Erro ao obter os emails:", error);
      }
    };
    fetchData();
  }, []);

  const {
    isOpen: isModalShowEmailOpen,
    onOpen: onModalShowEmailOpen,
    onClose: onModalShowEmailClose,
  } = useDisclosure();


  return (
    <>
      <Sidebar user={username} />
      <div className="body">
        <header className="home">
          <h1 className="page-title">Enviados</h1>
        </header>
      </div>

      <div className="gasto">
        {sentEmails?.map((email) => (
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
    </>
  );
}
