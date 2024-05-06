import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Button,
} from "@chakra-ui/react";
import React from "react";

const FullScreenImageModal = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Image src={imageUrl} alt="Full Screen Image" />
          <Button onClick={onClose} mt={4} colorScheme="blue">
            Close
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FullScreenImageModal;
