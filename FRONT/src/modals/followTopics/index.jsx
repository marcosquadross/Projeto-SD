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
} from "@chakra-ui/react";

import Select from "react-select";

import axios from "axios";

export default function FollowTopics({
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) {
  const toast = useToast();

  const options = [
    {
      label: "Times",
      options: [
        { value: "santos", label: "Santos" },
        { value: "flamengo", label: "Flamengo" },
        // Adicione mais times aqui
      ],
    },
    {
      label: "Campeonatos",
      options: [
        { value: "bundesliga", label: "Bundesliga" },
        { value: "serieA", label: "Serie A" },
        { value: "premierLeague", label: "Premier League" },
        // Adicione mais campeonatos aqui
      ],
    },
  ];

  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedChampionships, setSelectedChampionships] = useState([]);

  const handleChange = (selectedOptions, groupLabel) => {
    if (groupLabel === "Times") {
      setSelectedTeams(selectedOptions);
    } else if (groupLabel === "Campeonatos") {
      setSelectedChampionships(selectedOptions);
    }

    console.log(selectedTeams);
    console.log(selectedChampionships);
  }

  const CustomOption = ({ innerProps, label, data, groupLabel, isSelected }) => (
    <div {...innerProps}>
      <label>{ label}</label>
    </div>
  );


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
            
          </ModalBody>
          <ModalFooter>
            <Button>Seguir tópicos</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
