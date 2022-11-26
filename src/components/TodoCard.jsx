import { Box, Button, Card, Checkbox, Flex, Text } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import { updateTodo } from "../helpers/todo-fetcher";

function TodoCard({ index, ...props }) {
  const [isDone, setIsDone] = useState(props.is_active);
  const [priorityColor, setPriorityColor] = useState(props.priority);

  const completeTodo = useCallback(async (value) => {
    console.log(value);
    const response = await updateTodo({
      todoId: props.id,
      is_active: value,
      priority: props.priority,
    });
  }, []);

  useEffect(() => {
    switch (props.priority) {
      case "very-high":
        setPriorityColor("red");
        break;
      case "high":
        setPriorityColor("orange");
        break;
      case "medium":
        setPriorityColor("green");
        break;
      case "low":
        setPriorityColor("teal");
        break;
      case "very-low":
        setPriorityColor("purple");
        break;
      default:
        setPriorityColor("purple");
        break;
    }
  }, [props.priority]);

  // useEffect(() => {
  //   completeTodo();
  // }, [completeTodo]);

  return (
    <Card p="4" data-cy={`activity-item-${index}`}>
      <Flex justifyContent="space-between" my="auto">
        <Flex gap="4">
          <Checkbox
            defaultChecked={isDone}
            onChange={(e) => {
              setIsDone(!e.target.checked);
              completeTodo(!e.target.checked);
            }}
            data-cy="todo-item-checkboxc"
          />
          <Box
            w="4"
            h="4"
            my="auto"
            borderRadius="full"
            data-cy="todo-item-priority-indicator"
            bg={priorityColor}
          />
          <Text
            my="auto"
            as={isDone ? "del" : "span"}
            data-cy="todo-item-title"
          >
            {" "}
            {props.title}{" "}
          </Text>
          <EditIcon
            my="auto"
            as="Button"
            color="gray"
            data-cy="todo-item-edit-button"
          />
        </Flex>
        <Button
          colorScheme="red"
          onClick={props.onClickDelete}
          data-cy="todo-item-delete-button"
        >
          {" "}
          <DeleteIcon />{" "}
        </Button>
      </Flex>
    </Card>
  );
}

export default TodoCard;
