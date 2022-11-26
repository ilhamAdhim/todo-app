import "./App.css";
import HomePage from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<TodoDetail />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
