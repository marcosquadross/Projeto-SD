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
  Text,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";


import { SendEmail } from "../../services";

export default function CreateEmail({ isOpen, onClose, initialRef, finalRef, isSend, isReply, email }) {
  const toast = useToast();

  const [assunto, setAssunto] = useState("");
  const [destinatarios, setDestinatarios] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  const user_data = JSON.parse(localStorage.getItem("user_data"));

  let replyEmailGroup = ""

  function handleGroupRecipients(recipients) {
    recipients.forEach(member => {
      if (member != user_data.username) {
        replyEmailGroup = replyEmailGroup + member + ", "
      }
    })

    replyEmailGroup = replyEmailGroup + email.author

    return replyEmailGroup
  }

  function handleReplyInSentPage(email){
    if(isReply && isSend){
      return email.recipients
    }

    return handleGroupRecipients(email.recipients)
  }

  const handleSendEmail = async () => {
    let data;
    files != null ? data = packFiles(files) : data = "";

    let dest = destinatarios.split(",");

    let email_data = {};

    if (isReply != true) {
      email_data = {
        title: assunto,
        author: user_data.user_id,
        content,
        time: new Date(),
        recipients: dest,
        files: files != null ? files : []
      }

    } else if (isReply == true && isSend == false) {
      email_data = {
        title: "Re: " + email.title,
        author: user_data.user_id,
        content,
        time: new Date(),
        recipients: replyEmailGroup.split(",").map((item) => item.trim()),
        files: files != null ? files : []
      };
    } else if (isReply == true && isSend == true) {
      email_data = {
        title: "Re: " + email.title,
        author: user_data.user_id,
        content,
        time: new Date(),
        recipients: email.recipients,
        files: files != null ? files : []
      }
    } 

    console.log(email_data)

    await SendEmail(email_data, toast);
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
            {isReply != true ? "Novo Email" : "Responder Email"}
          </ModalHeader>
          <ModalBody>
            <FormControl id="destinatarios" mb={4}>
              <FormLabel>Destinatários</FormLabel>
              <Input
                type="text"
                placeholder="Destinatários"
                onChange={(e) => setDestinatarios(e.target.value)}
                isReadOnly={isReply}
                value={isReply != true ? destinatarios : handleReplyInSentPage(email)}
              />
            </FormControl>

            <FormControl id="assunto" mb={4}>
              <FormLabel>Assunto</FormLabel>
              <Input
                type="text"
                placeholder="Assunto"
                onChange={isReply != true ? (e) => setAssunto(e.target.value) : (e) => setAssunto("Re: " + email.title)}
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
