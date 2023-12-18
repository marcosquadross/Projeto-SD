import React, { useState, useEffect } from "react";
import "./style.css";
import "../../main.css";

import Sidebar from "../../components/sidebar";
import CreateEmail from "../../modals/createEmail";
import { Icon, Button, useDisclosure } from "@chakra-ui/react";
import {
  MdMarkEmailRead,
  MdEmail,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import {
  IoMailOutline,
  IoMailOpenOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { GoReply } from "react-icons/go";

import ShowEmail from "../../modals/showEmail";

export default function Home() {
  const username = localStorage.getItem("cadastro_user");

  const [selectedEmail, setSelectedEmail] = useState(null);

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
          <h1 className="page-title">Perfil</h1>
        </header>
      </div>

      <div className="gasto">
        {emails.map((email) => (
          <div
            className="gasto_information"
            onClick={() => handleShowEmail(email)}
          >
            <p>{email.assunto}</p>
            <p>{email.autor}</p>
            <p>{email.time}</p>
            <p>{email.destinatarios}</p>
            <div>
              <Icon
                as={IoMailOutline}
                w={6}
                h={6}
                mr={10}
                ml={7}
                color="gray.500"
              />
              <Icon as={IoTrashOutline} w={6} h={6} mr={10} color="gray.500" />
              <Icon
                as={GoReply}
                w={6}
                h={6}
                color="gray.500"
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
