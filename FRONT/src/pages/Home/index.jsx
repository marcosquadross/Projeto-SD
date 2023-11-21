import React, { useState, useEffect } from "react";
import "./style.css";
import "../../main.css";

import Sidebar from "../../components/sidebar";
// import FollowTopics from "../../modals/followTopics";
import CreateEmail from "../../modals/createEmail";
import { Icon, Button, useDisclosure } from "@chakra-ui/react";
import { MdMarkEmailRead, MdEmail, MdOutlineModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoMailOutline, IoMailOpenOutline, IoTrashOutline   } from "react-icons/io5";
export default function Home() {
  const username = localStorage.getItem("cadastro_user");

  const emails = [
    {
      id: 1,
      assunto: "Assunto 1",
      autor: "Autor 1",
      time: "01/01/2021",
      destinatarios: ["Destinatario 1", "Destinatario 2"],
      files: [
        {
          id: 1,
          nome: "Arquivo 1",
          url: "http://localhost:3001/files/Arquivo 1",
        },
        {
          id: 2,
          nome: "Arquivo 2",
          url: "http://localhost:3001/files/Arquivo 2",
        },
      ],
    },
    {
      id: 2,
      assunto: "Assunto 2",
      autor: "Autor 2",
      time: "02/01/2021",
      destinatarios: ["Destinatario 1", "Destinatario 2"],
      files: [
        {
          id: 1,
          nome: "Arquivo 1",
          url: "http://localhost:3001/files/Arquivo 1",
        },
        {
          id: 2,
          nome: "Arquivo 2",
          url: "http://localhost:3001/files/Arquivo 2",
        },
      ],
    },
    {
      id: 3,
      assunto: "Assunto 3",
      autor: "Autor 3",
      time: "03/01/2021",
      destinatarios: ["Destinatario 1", "Destinatario 2"],
      files: [
        {
          id: 1,
          nome: "Arquivo 1",
          url: "http://localhost:3001/files/Arquivo 1",
        },
        {
          id: 2,
          nome: "Arquivo 2",
          url: "http://localhost:3001/files/Arquivo 2",
        },
      ],
    },
  ];

  return (
    <>
      <Sidebar user={username} />
      <div className="body">
        <header className="home">
          <h1 className="page-title">Emails</h1>
        </header>
      </div>

      <div className="gasto">
        {emails.map((email) => (
          <div className="gasto_information">
            <p>{email.assunto}</p>
            <p>{email.autor}</p>
            <p>{email.time}</p>
            <p>{email.destinatarios}</p>
            <div>
              <Icon as={IoMailOutline} w={6} h={6} mr={10} ml={7} color='gray.500'/>
              <Icon as={IoTrashOutline } w={6} h={6} mr={10} color='gray.500'/>
              <Icon as={MdOutlineModeEditOutline} w={6} h={6} color='gray.500'/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
