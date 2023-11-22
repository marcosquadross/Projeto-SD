import React, { useState } from "react";
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
} from "@chakra-ui/react";

import axios from "axios";

export default function CreateEmailGroup({ isOpen, onClose, initialRef, finalRef }) {
  const toast = useToast();

  const [groupMembers, setGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = async () => {
    const emailGroup = {
        name: groupName,
        members: groupMembers,
    };

    try {
      const response = await axios.post("http://localhost:3001/email", email);
      toast({
        title: "Email enviado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao enviar email!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
          <ModalHeader mb={0} className="modal_header">
            Criar Email
          </ModalHeader>
          <ModalBody>
            <FormControl id="destinatarios" mb={4}>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                placeholder="Informe o nome do grupo"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>

            <FormControl id="membros" mb={4}>
              <FormLabel>Membros</FormLabel>
              <Input
                type="text"
                placeholder="Informe os membros do grupo"
                onChange={(e) => setGroupMembers(e.target.value)}
                />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>Cancelar</Button>
            <Button onClick={handleCreateGroup}>
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
