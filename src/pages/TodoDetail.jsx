import Layout from "../components/Layout";
import useFetchTodo from "../hooks/useFetchTodo";
import EmptyData from "../components/EmptyData";
import ModalConfirmation from "../components/Modals/ModalConfirmation";
import ModalTodoOperation from "../components/Modals/ModalTodoOperation";
import TodoCard from "../components/TodoCard";

import { ReactComponent as EmptySVG } from "../assets/no-data.svg";
import { MdSort } from "react-icons/md";
import { BiSortUp, BiSortDown } from "react-icons/bi";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { AddIcon, ArrowBackIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
  useColorModeValue,
  useDisclosure,
  useEditableControls,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { updateActivity } from "../helpers/activity-fetcher";
import { useCallback, useEffect, useState } from "react";

import { getTodoByActivity } from "../helpers/todo-fetcher";

const sortOptions = [
  {
    icon: <BiSortDown color="teal" />,
    label: "Terbaru",
    dataCy: "sort-latest",
  },
  {
    icon: <BiSortUp color="teal" />,
    label: "Terlama",
    dataCy: "sort-oldest",
  },
  {
    icon: <FaSortAlphaDown color="teal" />,
    label: "A-Z",
    dataCy: "sort-az",
  },
  {
    icon: <FaSortAlphaDownAlt color="teal" />,
    label: "Z-A",
    dataCy: "sort-za",
  },
  {
    icon: <MdSort color="teal" />,
    label: "Belum Selesai",
    dataCy: "sort-unfinished",
  },
];

function EditableControls() {
  const { getEditButtonProps } = useEditableControls();
  return (
    <EditIcon
      my="auto"
      ml={4}
      color="gray"
      data-cy="todo-title-edit-button"
      {...getEditButtonProps()}
    />
  );
}

function TodoDetail() {
  const navigate = useNavigate();
  const { todo, isLoading, isEmpty, setIsLoading, setTodo } = useFetchTodo();
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalDeleteOpen,
    onOpen: onOpenModalDelete,
    onClose: onCloseModalDelete,
  } = useDisclosure();

  const [activeSortOption, setActiveSortOption] = useState(sortOptions[0]);
  const [currentID, setCurrentID] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [isNeedRefetch, setIsNeedRefetch] = useState(false);

  const handleUpdateActivityName = async (newName) => {
    setIsLoading(true);
    const response = await updateActivity(todo.id, newName);
    if (response.statusText === "OK") {
      setTodo({
        ...todo,
        name: newName,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // ? Refetch if any item is being created or deleted
    async function refetchData() {
      if (isNeedRefetch && todo !== undefined) {
        setIsLoading(true);
        const response = await getTodoByActivity(todo.id);
        setTodo(response);
        setIsLoading(false);
        setIsNeedRefetch(false);
      }
    }

    refetchData();
  }, [isNeedRefetch, setTodo, setIsLoading, todo]);

  const onClickAddTodo = () => onOpen();

  const onClickRemoveTodo = useCallback(
    async (id, title) => {
      onOpenModalDelete();
      setCurrentTitle(title);
      setCurrentID(id);
    },
    [onOpenModalDelete]
  );

  useEffect(() => {
    if (isFiltering) {
      switch (activeSortOption.dataCy) {
        case "sort-latest":
          setTodo((prev) => {
            return {
              ...prev,
              todo_items: prev.todo_items.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              ),
            };
          });
          break;
        case "sort-oldest":
          setTodo((prev) => {
            return {
              ...prev,
              todo_items: prev.todo_items.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
              ),
            };
          });
          break;
        case "sort-az":
          setTodo((prev) => {
            return {
              ...prev,
              todo_items: prev.todo_items.sort(
                (a, b) => b.title.toLowerCase() - a.title.toLowerCase()
              ),
            };
          });
          break;
        case "sort-za":
          setTodo((prev) => {
            return {
              ...prev,
              todo_items: prev.todo_items.sort(
                (a, b) => a.title.toLowerCase() - b.title.toLowerCase()
              ),
            };
          });

          break;
        case "sort-unfinished":
          setTodo((prev) => {
            return {
              ...prev,
              todo_items: prev.todo_items.sort(
                (a, b) => Number(b.is_active) - Number(a.is_active)
              ),
            };
          });
          break;

        default:
          break;
      }
    }
  }, [activeSortOption, isFiltering, setTodo]);

  useEffect(() => {
    console.log(todo?.todo_items, "todo");
  }, [todo?.todo_items]);

  useEffect(() => {
    console.log(activeSortOption);
  }, [activeSortOption]);

  return (
    <Layout>
      <Flex justifyContent="space-between" flexDir={["column", "row"]} gap={4}>
        <Flex gap={4} justifyContent={["space-between", "start"]}>
          <ArrowBackIcon
            data-cy="todo-back-button"
            fontSize="3xl"
            onClick={() => navigate(-1)}
            my="auto"
          />

          {todo && (
            <Editable
              data-cy="todo-title"
              defaultValue={todo?.title}
              fontWeight="bold"
              fontSize="3xl"
              onSubmit={(value) => handleUpdateActivityName(value)}
            >
              <EditablePreview />
              <EditableInput />
              <EditableControls />
            </Editable>
          )}
        </Flex>
        <Flex gap={4} justifyContent={["space-between", "end"]}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MdSort />}
              my="auto"
              borderRadius="full"
              data-cy="todo-sort-button"
            />
            <MenuList data-cy="sort-selection">
              {sortOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  data-cy={option.dataCy}
                  icon={option.icon}
                  onClick={() => {
                    setIsFiltering(true);
                    setActiveSortOption(option);
                  }}
                >
                  <Flex justifyContent="space-between">
                    {option.label}
                    {activeSortOption.dataCy === option.dataCy && (
                      <CheckIcon color="teal" my="auto" />
                    )}
                  </Flex>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Button
            my="auto"
            color="white"
            borderRadius="xl"
            leftIcon={<AddIcon />}
            bg={useColorModeValue("blue.400", "blue.800")}
            variant="solid"
            onClick={onClickAddTodo}
            data-cy="todo-add-button"
          >
            Tambah
          </Button>
        </Flex>
      </Flex>

      {isEmpty && (
        <EmptyData SVG={<EmptySVG width={200} />} dataCy="todo-empty-state" />
      )}

      {isLoading ? (
        <Flex w="auto" h={400} justifyContent="center">
          <Spinner
            m="auto"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <SimpleGrid
          spacing={4}
          mt={4}
          templateColumns="repeat(auto-fill, minmax(full, 1fr))"
        >
          {todo?.todo_items?.map((item) => (
            <TodoCard
              key={item.id}
              index={item.id}
              {...item}
              onClickDelete={() => onClickRemoveTodo(item.id, item.title)}
            />
          ))}
        </SimpleGrid>
      )}

      {/* For creating a todo */}
      {isModalOpen && (
        <ModalTodoOperation
          isOpen={isModalOpen}
          onClose={onClose}
          operation="create"
          isLoading={isCreatingTodo}
          setIsNeedRefetch={setIsNeedRefetch}
          setIsLoading={setIsCreatingTodo}
          activity_group_id={todo.id}
        />
      )}

      {/* For deleting a todo */}
      {isModalDeleteOpen && (
        <ModalConfirmation
          id={currentID}
          entity={"todo"}
          isOpen={isModalDeleteOpen}
          onClose={onCloseModalDelete}
          title={currentTitle}
          needFeedbackToast={true}
          setIsNeedRefetch={setIsNeedRefetch}
        />
      )}
    </Layout>
  );
}

export default TodoDetail;
