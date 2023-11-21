import React, { useState, useEffect } from "react";
import "./style.css";
import "../../main.css";

import Sidebar from "../../components/sidebar";
// import FollowTopics from "../../modals/followTopics";
import CreateEmail from "../../modals/createEmail";
import { Icon, Button, useDisclosure } from "@chakra-ui/react";

export default function Home() {
  const username = localStorage.getItem("cadastro_user");


  return (
    <>
      <Sidebar user={username} />
      <div className="body">
        <header className="home">
          <h1 className="page-title">Emails</h1>
        </header>
      </div>
    </>
  );
}
