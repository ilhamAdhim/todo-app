import { WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  chakra,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { deleteActivity, getActivity } from "../../helpers/activity-fetcher";

function ModalConfirmation({ isOpen, onClose, title, id }) {
  const [isLoading, setIsLoading] = useState(false);

  // const handleDelete = async () => {
  //   setIsLoading(true);
  //   const response = await deleteActivity(id);
  //   if (response.statusText === "OK") {
  //     onClose();
  //     const response = await getActivity();
  //     setTodo(response.data);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} data-cy="modal-delete">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody data-cy="modal-delete-title">
            <Flex justifyContent="center" p="8">
              <WarningIcon
                color={useColorModeValue("red", "red.300")}
                fontSize="xxx-large"
              />
            </Flex>
            <Text>
              Apakah anda yakin menghapus activity
              <chakra.span fontWeight="bold"> '{title}' </chakra.span> ?
            </Text>
          </ModalBody>

          <ModalFooter as={Flex} justifyContent="center" gap={5}>
            <Button
              variant="solid"
              borderRadius="xl"
              onClick={onClose}
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </Button>
            <Button
              colorScheme="red"
              borderRadius="xl"
              // TODO : Belum ya
              // onClick={handleDelete}
              onClick={() => {}}
              isLoading={isLoading}
              data-cy="modal-delete-confirm-button"
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalConfirmation;
