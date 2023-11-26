import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  ModalHeader,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Icon,
  InputGroup, 
  InputRightElement
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { FaPencil } from "react-icons/fa6";

import { TbPencilOff, TbPencil  } from "react-icons/tb";
import "../showEmail/style.css";

import { UpdateUser } from "../../services";

export default function ShowProfile({ isOpen, onClose, initialRef, finalRef, user }) {
  const toast = useToast();

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user_data.password);
  const [telephone, setTelephone] = useState(user.telephone);
  const [edit, setEdit] = useState(false);

  const [visible, setVisible] = useState(false)

  const handleVisibleChange = useCallback(() => {
    setVisible((prevState) => !prevState);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await GetPassword(user_data.user_id, toast);
  //       setPassword(res);
  //     } catch (error) {
  //       console.error("Erro ao obter os emails:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleCancelAction = () => {
    setName(user.name);
    setUsername(user.username);
    setPassword(user_data.password);
    setTelephone(user.telephone);
    setEdit(false);
    onClose();
  };

  const handleUpdateProfile = async () => {
    let user_data = {
      name,
      username,
      password,
      telephone,
    };

    await UpdateUser(user.user_id, user_data, toast, onClose);
  }

  return (
    <div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={0} className="modal_header header">
            <span>Perfil</span>
            <span onClick={() => setEdit(!edit)} style={{ cursor: "pointer" }}>
              <Icon as={FaPencil} />
            </span>
          </ModalHeader>
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Nome</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  isReadOnly={!edit}
                />
                <InputRightElement style={{ marginRight: '0.5rem' }} width='2.5rem'>
                  {edit ? <TbPencil  color='#6F9951' /> : <TbPencilOff color='#6F9951' />}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="username" mb={4}>
              <FormLabel>Username</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  isReadOnly={!edit}
                />
                <InputRightElement style={{ marginRight: '0.5rem' }} width='2.5rem'>
                  {edit ? <TbPencil  color='#6F9951' /> : <TbPencilOff color='#6F9951' />}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="telephone" mb={4}>
              <FormLabel>Telefone</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type="text"
                  onChange={(e) => setTelephone(e.target.value)}
                  value={telephone}
                  isReadOnly={!edit}
                />
                <InputRightElement style={{ marginRight: '0.5rem' }} width='2.5rem'>
                  {edit ? <TbPencil  color='#6F9951' /> : <TbPencilOff color='#6F9951' />}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="password" mb={4}>
              <FormLabel>Senha</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={visible ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  isReadOnly={!edit}
                />
                <InputRightElement style={{ marginRight: '1.1rem' }} width='2.5rem' onClick={handleVisibleChange}>
                  {visible ? <ViewIcon color='#6F9951' /> : <ViewOffIcon color='#6F9951' />}
                </InputRightElement>
                <InputRightElement style={{ marginLeft: '0.9rem' }} width='2.5rem'>
                  {edit ? <TbPencil  color='#6F9951' /> : <TbPencilOff color='#6F9951' />}
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={() => handleCancelAction()}>Cancelar</Button>
            <Button onClick={handleUpdateProfile}>
              Atualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
