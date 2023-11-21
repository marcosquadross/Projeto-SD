import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

import { Icon } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MdOutgoingMail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

import CreateEmailGroup from "../../modals/createEmailGroup";
import CreateEmail from "../../modals/createEmail";

import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import axios from "axios";

export default function Sidebar(props) {
  const [grupos, setGrupos] = useState([]);
  const user = localStorage.getItem("cadastro_user");
  const username = localStorage.getItem("cadastro_user");

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

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogOut = () => {
    localStorage.removeItem("cadastro_user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="container-logo-username">
        <img src="../../../guma.png" className="guma-logo" alt="GUMA Logo" />
        <p className="presentation">
          Olá,<br></br>
          {props.user}
        </p>
      </div>

      <div className="subtitle-sidebar">Email</div>

      <div className="flex" onClick={handleProfile}>
        <Icon as={IoPersonSharp} w={5} h={5} /> Perfil
      </div>

      <div className="flex" onClick={handleCreateEmailClick}>
        <Icon as={MdOutgoingMail} w={6} h={6} /> Enviar email
      </div>

      <div className="flex" onClick={handleCreateEmailClick}>
        <Icon as={IoIosSettings} w={5} h={5} /> Configurações
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
