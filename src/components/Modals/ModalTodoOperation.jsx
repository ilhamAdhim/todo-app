import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  chakra,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { createTodo } from "../../helpers/todo-fetcher";

const PRIORITY_OPTIONS = [
  { color: "red", label: " Very High", value: "very-high" },
  { color: "orange", label: "High", value: "high" },
  { color: "green", label: "Normal", value: "normal" },
  { color: "teal", label: "Low", value: "low" },
  { color: "purple", label: "Very Low", value: "very-low" },
];

function ModalTodoOperation({
  isOpen,
  onClose,
  isLoading,
  setIsLoading,
  setIsNeedRefetch,
  operation,
  activity_group_id,
  ...props
}) {
  const [title, setTitle] = useState(props.title || "");
  const [priority, setPriority] = useState(props.priority || "very-high");

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangePriority = (e) => setPriority(e.target.value);

  const handleAddTodo = async () => {
    setIsLoading(true);
    const response = await createTodo({
      activity_group_id,
      priority,
      title,
    });
    if (response.statusText === "Created") {
      setIsNeedRefetch(true);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-cy="modal-add">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" data-cy="modal-add-title">
          Tambah List Item
        </ModalHeader>
        <ModalCloseButton data-cy="modal-add-close-button" />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel data-cy="modal-add-name-title">NAMA LIST ITEM</FormLabel>
            <Input
              data-cy="modal-add-name-input"
              onChange={onChangeTitle}
              placeholder="Tambahkan nama list item"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel data-cy="modal-add-priority-title">PRIORITY</FormLabel>
            <Select
              data-cy="modal-add-priority-dropdown"
              onChange={onChangePriority}
              defaultValue="very-high"
            >
              {PRIORITY_OPTIONS.map((option, index) => (
                <chakra.option
                  key={index}
                  value={option.value}
                  display="flex"
                  gap={4}
                  data-cy={`modal-add-priority-${option.value}`}
                >
                  {option.label}
                </chakra.option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter as={Flex} justifyContent="end">
          <Button
            colorScheme="blue"
            borderRadius="xl"
            onClick={handleAddTodo}
            isLoading={isLoading}
            data-cy="modal-add-save-button"
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalTodoOperation;
