import { Box, Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Box px={[4, 16]}>{children}</Box>
    </>
  );
}

export default Layout;
