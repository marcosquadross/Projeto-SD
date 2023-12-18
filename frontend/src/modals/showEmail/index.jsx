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
} from "@chakra-ui/react";

export default function ShowEmail({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  email,
}) {
  const toast = useToast();

  const handleCloseEmail = () => {
    onClose();
  };

  const time = email.time.split("T")[1].split(":")[0] + ":" + email.time.split("T")[1].split(":")[1];
  const date = email.time.split("T")[0].split("-")[2] + "/" + email.time.split("T")[0].split("-")[1] + "/" + email.time.split("T")[0].split("-")[0];

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
            <span>{email.title}</span>
            <span>{date} - {time}</span>
          </ModalHeader> 

          <ModalBody>
            <Text fontSize="md" fontWeight="bold" color={"black"} mb={2}>
              {email.author}
            </Text>

            {email.content}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseEmail}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
