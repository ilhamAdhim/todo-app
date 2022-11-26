import { Box, Center, Text } from "@chakra-ui/react";

function EmptyData({ SVG, dataCy }) {
  return (
    <Center mt={10}>
      <Box m="auto" data-cy={dataCy}>
        {SVG}
        <Text fontWeight="bold" fontSize={16} mt={5} textAlign="center">
          Buat List Item Kamu
        </Text>
      </Box>
    </Center>
  );
}

export default EmptyData;
