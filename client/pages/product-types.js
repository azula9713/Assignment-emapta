import { Flex } from "@chakra-ui/react";

import ProductTypeList from "../components/ProductTypeList";
import Sidebar from "../components/Sidebar";

export default function ProductTypes() {
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
        <ProductTypeList />
      </Flex>
    </Flex>
  );
}
