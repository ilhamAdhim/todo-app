import Layout from "../components/Layout";
import useFetchTodo from "../hooks/useFetchTodo";
import { ReactComponent as EmptySVG } from "../assets/no-data.svg";

import {
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { useCallback, useState } from "react";
import {
  createActivity,
  deleteActivity,
  getActivity,
} from "../helpers/activity-fetcher";
import ActivityCard from "../components/ActivityCard";
import ModalConfirmation from "../components/Modals/ModalConfirmation";

function HomePage() {
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

  const { todo, isLoading, setIsLoading, setTodo, isEmpty } = useFetchTodo();
  const [isCreating, setIsCreating] = useState(false);

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentID, setCurrentID] = useState(0);

  const onClickAdd = async () => {
    setIsCreating(true);
    const response = await createActivity();

    if (response.statusText === "Created") {
      setIsCreating(false);
      setIsLoading(true);
      const response = await getActivity();
      setTodo(response.data);
      setIsLoading(false);
    }
  };

  const onClickDelete = useCallback(async (id, title) => {
    onOpen();
    console.log(id, title);
    setCurrentTitle(title);
    setCurrentID(id);
  }, []);

  return (
    <Layout>
      <Flex p={2} justifyContent="space-between">
        <Text fontWeight="bold" fontSize={36} data-cy="activity-title">
          Activity
        </Text>
        <Button
          my="auto"
          color="white"
          borderRadius="xl"
          leftIcon={<AddIcon />}
          bg={useColorModeValue("blue.400", "blue.800")}
          variant="solid"
          data-cy="activity-add-button"
          onClick={onClickAdd}
          isLoading={isCreating}
        >
          Tambah
        </Button>
      </Flex>

      {isEmpty && (
        <Center>
          <Box m="auto" data-cy="activity-empty-state">
            <EmptySVG width={200} />
            <Text fontWeight="bold" fontSize={24} mt={5} textAlign="center">
              No Data
            </Text>
          </Box>
        </Center>
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
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {todo?.map((item) => (
            <ActivityCard
              key={item.id}
              index={item.id}
              {...item}
              onClickDelete={() => onClickDelete(item.id, item.title)}
            />
          ))}
        </SimpleGrid>
      )}

      {isModalOpen && (
        <ModalConfirmation
          isOpen={isModalOpen}
          onClose={onClose}
          title={currentTitle}
          id={currentID}
        />
      )}
    </Layout>
  );
}

export default HomePage;
