import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";

import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import { FiCalendar } from "react-icons/fi";

export default function Dashboard() {
  return (
    <Flex
      h={[null, null, "100vh"]}
      maxW="2000px"
      flexDir={["column", "column", "row"]}
      overflow="hidden"
    >
      {/* Column 1 */}

      <Sidebar />
      {/* Column 2 */}
      <Flex w={["100%"]} p="3%" flexDir="column" overflow="auto" minH="100vh">
        <ProductList />
      </Flex>
    </Flex>
  );
}
