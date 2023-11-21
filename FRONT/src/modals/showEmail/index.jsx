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
            {email.assunto}
          </ModalHeader>
          <ModalBody>
            <Text fontSize="md" fontWeight="bold" color={"black"} mb={2}>
              {email.autor}
            </Text>

            {email.conteudo}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseEmail}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
