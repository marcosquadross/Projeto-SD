import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

import { Icon } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { MdGroups, MdOutgoingMail, MdMarkEmailUnread } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";

import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

import CreateEmailGroup from "../../modals/createEmailGroup";
import CreateEmail from "../../modals/createEmail";

import { useDisclosure } from "@chakra-ui/react";

import axios from "axios";

export default function Sidebar(props) {
  const [grupos, setGrupos] = useState([]);
  const user = localStorage.getItem("cadastro_user");
  const username = localStorage.getItem("cadastro_user");

  const currentPath = window.location.pathname;

  const [showGroup, setShowGroup] = useState(false);

  const navigate = useNavigate();

  function navigateGroup(id) {
    console.log("navigate");
    console.log(id);
    localStorage.setItem("grupo_id", id);
    navigate("/group");
  }
  function getGroupsUser() {
    axios({
      method: "post",
      url: "http://localhost:8000/grupos/grupos-usuario/",
      data: {
        username: user,
      },
    })
      .then((response) => {
        setGrupos(response.data);
        console.log(response.data);
        setShowGroup(!showGroup);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* Create Email Modal */
  const {
    isOpen: isModalCreateEmailOpen,
    onOpen: onModalCreateEmailOpen,
    onClose: onModalCreateEmailClose,
  } = useDisclosure();

  async function handleCreateEmailClick() {
    onModalCreateEmailOpen();
  }

  /* Create Email Group Modal */
  const {
    isOpen: isModalCreateEmailGroupOpen,
    onOpen: onModalCreateEmailGroupOpen,
    onClose: onModalCreateEmailGroupClose,
  } = useDisclosure();

  const handleCreateEmailGroupClick = () => {
    onModalCreateEmailGroupOpen();
  };

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const handleGoToNotifications = () => {
    navigate("/notifications");
  };

  const handleGoToReceivedEmails = () => {
    navigate("/home");
  };

  const handleGoToSentEmails = () => {
    navigate("/sent-emails");
  };

  const handleLogOut = () => {
    localStorage.removeItem("cadastro_user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="container-logo-username" onClick={handleGoToProfile}>
        {/* <img src="../../../guma.png" className="guma-logo" alt="GUMA Logo" /> */}
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/broken-link"
          className="guma-logo"
        />
        <p className="presentation">
          Dan Abrahmov
        </p>
      </div>

      <div className="subtitle-sidebar">Email</div>

      <div
        className={currentPath === "/sent-emails" ? "isPage flex" : "flex"}
        onClick={handleGoToSentEmails}
      >
        <Icon as={MdOutgoingMail} w={6} h={6} /> Enviados
      </div>

      <div
        className={currentPath === "/home" ? "isPage flex" : "flex"}
        onClick={handleGoToReceivedEmails}
      >
        <Icon as={MdMarkEmailUnread} w={6} h={6} /> Recebidos
      </div>

      <div className="flex" onClick={handleCreateEmailClick}>
        <Icon as={FaPencil} w={5} h={5} /> Escrever
      </div>

      <div
        className={currentPath === "/notifications" ? "isPage flex" : "flex"}
        onClick={handleGoToNotifications}
      >
        <Icon as={IoMdNotifications} w={6} h={6} /> Notificações
      </div>

      <div className="subtitle-sidebar grupos">GRUPOS</div>

      <div className="flex" onClick={handleCreateEmailGroupClick}>
        <Icon as={AiOutlineUsergroupAdd} w={6} h={6} /> Novo Grupo
      </div>
      <div className="flex" onClick={getGroupsUser}>
        <Icon as={MdGroups} w={6} h={6} /> Grupos
        {showGroup == true ? (
          <Icon as={RiArrowDropUpLine} w={7} h={7} />
        ) : (
          <Icon as={RiArrowDropDownLine} w={7} h={7} />
        )}
      </div>

      <div>
        <CreateEmail
          isOpen={isModalCreateEmailOpen}
          onClose={onModalCreateEmailClose}
          user={username}
        ></CreateEmail>
      </div>

      <div>
        <CreateEmailGroup
          isOpen={isModalCreateEmailGroupOpen}
          onClose={onModalCreateEmailGroupClose}
          user={username}
        ></CreateEmailGroup>
      </div>

      <div
        className="flex logout"
        style={{ marginLeft: "10%" }}
        onClick={handleLogOut}
      >
        <Icon as={BiLogOut} w={6} h={6} /> Logout
      </div>
    </div>
  );
}
