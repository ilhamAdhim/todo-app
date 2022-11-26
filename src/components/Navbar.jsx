import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      px={[4, 16]}
      mb={10}
      bg={useColorModeValue("blue.500", "blue.800")}
      data-cy="header-background"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box data-cy="header-title" fontWeight="bold" color="white">
          TO DO LIST APP
        </Box>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button
              onClick={toggleColorMode}
              bg={useColorModeValue("blue.400", "blue.900")}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
