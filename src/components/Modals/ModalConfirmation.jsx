import { WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  chakra,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { deleteActivity } from "../../helpers/activity-fetcher";
import { deleteTodo } from "../../helpers/todo-fetcher";

function ModalConfirmation({
  id,
  title,
  isOpen,
  entity,
  onClose,
  setIsNeedRefetch,
  needFeedbackToast,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: alertOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();

  const handleDelete = async () => {
    setIsLoading(true);
    let response;
    if (entity === "activity") response = await deleteActivity(id);
    else if (entity === "todo") response = await deleteTodo(id);

    if (response.statusText === "OK") {
      alertOnOpen();
      await setTimeout(() => alertOnClose(), 2000);
      await setTimeout(() => onClose(), 3000);
      setIsNeedRefetch(true);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-cy="modal-delete">
          <ModalCloseButton />
          <ModalBody data-cy="modal-delete-title">
            <Flex justifyContent="center" p="8">
              <WarningIcon
                data-cy="modal-delete-icon"
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
              onClick={handleDelete}
              isLoading={isLoading}
              data-cy="modal-delete-confirm-button"
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {needFeedbackToast && (
        <Modal
          isCentered
          size="xl"
          isOpen={alertOpen}
          onClose={alertOnClose}
          data-cy="modal-information"
        >
          <ModalContent>
            <ModalBody as={Flex}>
              <WarningIcon my="auto" color="teal" fontSize="md" />
              <Text ml={2} my="auto">
                Activity berhasil dihapus
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ModalConfirmation;
