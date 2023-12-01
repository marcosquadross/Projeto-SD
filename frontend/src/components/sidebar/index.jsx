import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

import { Icon } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { MdGroups, MdOutgoingMail, MdMarkEmailUnread } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";

import { Avatar } from "@chakra-ui/react";

import CreateEmailGroup from "../../modals/createEmailGroup";
import CreateEmail from "../../modals/createEmail";
import ShowProfile from "../../modals/profile";
import SendEmailToGroup from "../../modals/sendEmailToGroup";

import { GetUserGroups } from "../../services";

import { useDisclosure, useToast } from "@chakra-ui/react";

export default function Sidebar(props) {
  const [grupos, setGrupos] = useState([]);
  const [groupInfos, setGroupInfos] = useState({});
  const user = localStorage.getItem("cadastro_user");
  const username = localStorage.getItem("cadastro_user");

  const toast = useToast();

  const user_data = JSON.parse(localStorage.getItem("user_data"));

  const currentPath = window.location.pathname;

  const [showGroup, setShowGroup] = useState(false);

  const navigate = useNavigate();

  const getGroupsUser = async () => {
    const response = await GetUserGroups(user_data.user_id, toast);
    setGrupos(response);
    setShowGroup(!showGroup);
  };

  // useEffect(() => {
  //   getGroupsUser();
  // }, []);

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

  /* Show Profile Modal */
  const {
    isOpen: isModalShowProfileOpen,
    onOpen: onModalShowProfileOpen,
    onClose: onModalShowProfileClose,
  } = useDisclosure();

  const {
    isOpen: isModalSendEmailToGroupOpen,
    onOpen: onModalSendEmailToGroupOpen,
    onClose: onModalSendEmailToGroupClose,
  } = useDisclosure();

  const handleCreateEmailGroupClick = () => {
    onModalCreateEmailGroupOpen();
  };

  const handleProfile = () => {
    onModalShowProfileOpen();
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

  const handleSendToGroup = (grupo) => {
    console.log("grupo: ", grupo);
    onModalSendEmailToGroupOpen();
    setGroupInfos(grupo);
  }

  return (
    <div className="sidebar">
      <div className="container-logo-username" onClick={handleProfile}>
        {/* <img src="../../../guma.png" className="guma-logo" alt="GUMA Logo" /> */}
        <Avatar
          name={user_data.name}
          src="https://bit.ly/broken-link"
          className="guma-logo"
        />
        <p className="presentation">{user_data.name}</p>
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

      {showGroup && grupos.length !== 0
        ? grupos.map((grupo, key) => (
            <div className="flex" onClick={() => handleSendToGroup(grupo)}>
              <Icon as={FaPencil} w={4} h={4} /> {grupo.name} 
            </div>
          ))
        : null}

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

      <div>
        <ShowProfile
          isOpen={isModalShowProfileOpen}
          onClose={onModalShowProfileClose}
          user={user_data}
        ></ShowProfile>
      </div>

      <div>
        <SendEmailToGroup
          isOpen={isModalSendEmailToGroupOpen}
          onClose={onModalSendEmailToGroupClose}
          isReply={false}
          group={groupInfos}
        ></SendEmailToGroup>
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
