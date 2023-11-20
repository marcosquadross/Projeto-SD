import React, { useState, useEffect } from "react";
import "./style.css";
import "../../main.css";

import Sidebar from "../../components/sidebar";
import FollowTopics from "../../modals/followTopics";
import { Icon, Button, useDisclosure } from "@chakra-ui/react";

export default function Home() {
  const username = localStorage.getItem("cadastro_user");

  const {
    isOpen: isModalCreateEmailOpen,
    onClose: onModalCreateEmailClose,
    onOpen: onModalCreateEmailOpen,
  } = useDisclosure();

  async function handleCreateGasto() {
    onModalCreateEmailOpen();
  }

  function handleCloseCreateGasto() {
    onModalCreateEmailClose();
  }

  return (
    <>
      <Sidebar user={username} />
      <div className="body">
        <header className="home">
          <h1 className="page-title">Emails</h1>
        </header>

        <Button
          className="new-tag-and-gasto-button"
          pr="10px"
          onClick={handleCreateGasto}
        >
          Novo Gasto
        </Button>

        <div>
          <FollowTopics
            isOpen={isModalCreateEmailOpen}
            onClose={onModalCreateEmailClose}
            user={username}
          >
            <Button onClick={handleCloseCreateGasto}>Enviar</Button>
          </FollowTopics>
        </div>
      </div>
    </>
  );
}
