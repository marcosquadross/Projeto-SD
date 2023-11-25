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

import getCurentDate from "../../functions/getCurrentDate";

import { SendEmail } from "../../services";

export default function CreateEmail({ isOpen, onClose, initialRef, finalRef }) {
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

    let dest = destinatarios.split(",");

    const email = {
      title: assunto,
      author: user_data.user_id,
      content,
      time: new Date(),
      recipients: dest,
      files: files != null ? files : []
    };

    await SendEmail(email, toast, onClose);

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
            Criar Email
          </ModalHeader>
          <ModalBody>
            <FormControl id="destinatarios" mb={4}>
              <FormLabel>Destinatários</FormLabel>
              <Input
                type="text"
                placeholder="Destinatários"
                onChange={(e) => setDestinatarios(e.target.value)}
              />
            </FormControl>

            <FormControl id="assunto" mb={4}>
              <FormLabel>Assunto</FormLabel>
              <Input
                type="text"
                placeholder="Assunto"
                onChange={(e) => setAssunto(e.target.value)}
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

            <FormControl id="files" mb={4}>
              <FormLabel>Arquivos</FormLabel>
              <Input
                placeholder="Arquivos"
                size="lg"
                onChange={(e) => handleFileChange(e)}
                type="file"
                multiple
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
