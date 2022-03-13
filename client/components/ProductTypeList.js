import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Text,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FiPlus } from "react-icons/fi";
import * as ProductTypeAPI from "../api/ProductTypeAPI";

const ProductTypeList = () => {
  const client = useQueryClient();
  const [productTypes, setProductTypes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prodTypeName, setProdTypeName] = useState("");

  useQuery("productTypes", () => ProductTypeAPI.GetProductTypes(), {
    onSuccess: (data) => {
      setProductTypes(data);
    },
  });

  const { mutate: create, isLoading: creating } = useMutation(
    ProductTypeAPI.CreateProductType,
    {
      onSuccess: () => {
        onClose();
        setProdTypeName("");
        client.invalidateQueries("productTypes");
        alert("Product type created successfully");
      },
      onError: () => {
        onClose();
        alert("Error creating product type");
      },
    }
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="prodTypeName">Product type</FormLabel>
              <Input
                id="prodTypeName"
                type="text"
                value={prodTypeName}
                onChange={(e) => {
                  setProdTypeName(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="whatsapp"
              variant="solid"
              onClick={() => {
                if (prodTypeName === "") {
                  alert("Please enter product type name");
                } else {
                  create({ name: prodTypeName });
                }
              }}
            >
              {creating ? "Creating..." : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justifyContent="space-between" mt={8}>
        <Flex align="flex-end">
          <Heading as="h2" size="lg" letterSpacing="tight">
            Product Types
          </Heading>
          <Text fontSize="small" color="gray" ml={4}>
            March 2022
          </Text>
        </Flex>
        <IconButton icon={<FiPlus />} onClick={onOpen} />
      </Flex>
      <Flex flexDir="column">
        <Flex overflow="auto">
          <Table variant="simple" mt={4} size="sm">
            <Thead>
              <Tr color="gray">
                <Th>Product Name</Th>
                <Th>Added Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productTypes.map((productType) => (
                <Tr key={productType.productTypeId}>
                  <Td>{productType.name}</Td>
                  <Td>
                    {new Date(productType.createdAt).toLocaleDateString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
};

export default ProductTypeList;
