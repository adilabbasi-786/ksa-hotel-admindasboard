import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { URL } from "Utils";

const Delete = ({ partnersData, setPartnersData, fetchPartnersData }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState("");

  const handleDeletePartner = async () => {
    if (partnerToDelete) {
      try {
        const jwt = localStorage.getItem("token");
        await axios.delete(`${URL}/api/partners/${partnerToDelete}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        setPartnersData((prevPartnersData) =>
          prevPartnersData.filter((partner) => partner.id !== partnerToDelete)
        );

        setPartnerToDelete("");
        setDeleteConfirmationOpen(false);
        console.log("Partner deleted successfully");
        fetchPartnersData();
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  return (
    <>
      <Button
        colorScheme="blue"
        width="fit-content"
        onClick={() => setDeleteConfirmationOpen(true)}
      >
        Delete
      </Button>

      <Modal
        isOpen={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Partner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select partner to delete"
              value={partnerToDelete}
              onChange={(e) => setPartnerToDelete(e.target.value)}
            >
              {partnersData.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.attributes.name}
                </option>
              ))}
            </Select>
            {partnerToDelete && (
              <Text mt="4">
                Are you sure you want to delete partner{" "}
                {
                  partnersData.find((partner) => partner.id === partnerToDelete)
                    ?.attributes.name
                }
                ?
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              width="fit-content"
              onClick={handleDeletePartner}
            >
              Delete Partner
            </Button>
            <Button onClick={() => setDeleteConfirmationOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Delete;
