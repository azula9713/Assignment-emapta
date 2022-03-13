import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import Sidebar from "../../components/Sidebar";
import * as ProductAPI from "../../api/ProductAPI";

const Feature = ({ text, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      ></Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

function ProductDetails() {
  const router = useRouter();
  const client = useQueryClient();
  const { productId } = router.query;

  const [product, setProduct] = useState(null);

  useQuery(
    ["selectedProduct", productId],
    () => ProductAPI.GetProduct(productId),
    {
      onSuccess: (data) => {
        setProduct(data);
      },
      enabled: !!productId,
    }
  );

  useEffect(() => {
    if (productId) {
      client.invalidateQueries("selectedProduct");
    }
  }, [productId]);

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
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Heading>{product?.productType?.name}</Heading>

            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Feature
                iconBg={useColorModeValue("yellow.100", "yellow.900")}
                text={`Delivery Status: ${product?.deliveryStatus}`}
              />
              <Feature
                iconBg={useColorModeValue("green.100", "green.900")}
                text={`Estimated Delivery: ${new Date(
                  product?.estimatedDeliveryDate
                ).toLocaleDateString()}`}
              />
              <Feature
                iconBg={useColorModeValue("blue.100", "purple.900")}
                text={`Delivery Set To: ${product?.deliveryAddress}`}
              />
              <Feature
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={`Ordred By: ${product?.customer?.name}`}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default ProductDetails;
