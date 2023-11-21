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

import axios from "axios";

export default function CreateEmail({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  emailContent,
}) {
  const toast = useToast();

  const [destinatarios, setDestinatarios] = useState("");
  const [assunto, setAssunto] = useState("");
  const [files, setFiles] = useState(null);

  const handleSendEmail = async () => {
    const data = packFiles(files);
    const email = {
      autor: localStorage.getItem("cadastro_user"),
      destinatarios,
      assunto,
      files: data,
      time: getCurentDate(),
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
            Email
          </ModalHeader>
          <ModalBody>
            <Text>Remetente: {email.autor}</Text>
            <Textarea readOnly value={emailContent.assunto}></Textarea>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSendEmail}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
