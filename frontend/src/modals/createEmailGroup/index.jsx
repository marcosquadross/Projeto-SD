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

import { CreateGroup } from "../../services";

export default function CreateEmailGroup({ isOpen, onClose, initialRef, finalRef }) {

  const user_data = JSON.parse(localStorage.getItem("user_data"));

  const toast = useToast();

  const [groupMembers, setGroupMembers] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = async () => {

    let groupMembersArray = groupMembers.split(",").map((member) => member.trim());
    groupMembersArray.push(user_data.username);

    groupMembersArray = [...new Set(groupMembersArray)]; //remover duplicatas

    const emailGroup = {
        name: groupName,
        members: groupMembersArray,
    };

    await CreateGroup(emailGroup, toast);
    onClose();
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
            Criar Grupo
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
