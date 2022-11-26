import dateformat from "dateformat";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function ActivityCard({ index, ...props }) {
  return (
    <Card data-cy={`activity-item`}>
      <CardHeader>
        <Link to={`/detail/${props.id}`}>
          <Heading size="sm" data-cy="activity-item-title">
            {props.title}
          </Heading>
        </Link>
      </CardHeader>

      <CardFooter as={Flex} justifyContent="space-between">
        <Text my="auto" data-cy="activity-item-date">
          {dateformat(props.created_at, "d mmmm yyyy")}
        </Text>
        <Button
          colorScheme="red"
          onClick={props.onClickDelete}
          data-cy="activity-item-delete-button"
        >
          {" "}
          <DeleteIcon />{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ActivityCard;
