import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  ModalHeader,
  useToast,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { sendEmailToGroup } from "../../services";

export default function SendEmailToGroup({ isOpen, onClose, initialRef, finalRef, isReply, email, group}) {
  const toast = useToast();

  const [assunto, setAssunto] = useState("");
  const [destinatarios, setDestinatarios] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  const user_data = JSON.parse(localStorage.getItem("user_data"));

  const handleSendEmail = async () => {
    // const data = packFiles(files);
    let data;
    files != null ? data = packFiles(files) : data = "";

    let email_data = {};

    isReply != true? email_data = {
      id: group.id,
      title: assunto,
      author: user_data.user_id,
      content,
      time: new Date(),
      recipients: group.members,
      files: files != null ? files : []
    } : email_data = {
      id: group.id,
      title: "Re: " + email.title,
      author: user_data.user_id,
      content,
      time: new Date(),
      recipients: [email.author],
      files: files != null ? files : []
    };

    console.log(email_data)

    await sendEmailToGroup(email_data, toast);
    onClose();

    }

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const packFiles = (files) => {
    const data = new FormData();

    [...files].forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
      console.log(`${file.name} adicionado ao pacote de arquivos.`);
    });

    return data;
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
            {group.name}
          </ModalHeader>
          <ModalBody>
            <FormControl id="destinatarios" mb={4}>
              <FormLabel>Destinatários</FormLabel>
              <Input
                type="text"
                placeholder="Destinatários"
                isReadOnly={true}
                value={group.members}
              />
            </FormControl>

            <FormControl id="assunto" mb={4}>
              <FormLabel>Assunto</FormLabel>
              <Input
                type="text"
                placeholder="Assunto"
                onChange = {isReply != true ? (e) => setAssunto(e.target.value) : (e) => setAssunto("Re: " + email.title)}
                // onChange={(e) => setAssunto(e.target.value)}
                isReadOnly={isReply}
                value={isReply != true ? assunto : "Re: " + email.title}
              />
            </FormControl>

            <FormControl id="mensagem" mb={4}>
              <FormLabel>Mensagem</FormLabel>
              <Textarea
                placeholder="Mensagem"
                size="lg"
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSendEmail}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
