import Layout from "../components/Layout";
import ActivityCard from "../components/ActivityCard";
import ModalConfirmation from "../components/Modals/ModalConfirmation";
import useFetchActivity from "../hooks/useFetchActivity";

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
import { useCallback, useEffect, useState } from "react";
import { createActivity, getActivity } from "../helpers/activity-fetcher";
import EmptyData from "../components/EmptyData";

function HomePage() {
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

  const { activity, isLoading, setIsLoading, setActivity, isEmpty } =
    useFetchActivity();
  const [isNeedRefetch, setIsNeedRefetch] = useState(false);

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentID, setCurrentID] = useState(0);

  const onClickAdd = async () => {
    setIsLoading(true);
    const response = await createActivity();
    if (response.statusText === "Created") {
      setIsNeedRefetch(true);
    }
  };

  const onClickDelete = useCallback(async (id, title) => {
    onOpen();
    setCurrentTitle(title);
    setCurrentID(id);
  }, []);

  useEffect(() => {
    // ? Refetch if any item is being created or deleted
    async function refetchData() {
      if (isNeedRefetch) {
        setIsLoading(true);
        const response = await getActivity();
        setActivity(response.data);
        setIsLoading(false);
        setIsNeedRefetch(false);
      }
    }

    refetchData();
  }, [isNeedRefetch]);

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
          isLoading={isLoading}
        >
          Tambah
        </Button>
      </Flex>

      {isEmpty && (
        <EmptyData
          SVG={<EmptySVG width={200} />}
          dataCy="activity-empty-state"
        />
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
          {activity?.map((item) => (
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
          id={currentID}
          entity={"activity"}
          isOpen={isModalOpen}
          onClose={onClose}
          title={currentTitle}
          needFeedbackToast={true}
          setIsNeedRefetch={setIsNeedRefetch}
        />
      )}
    </Layout>
  );
}

export default HomePage;
