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
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FiPlus } from "react-icons/fi";
import * as CustomerAPI from "../api/CustomerAPI";

const CustomerList = () => {
  const client = useQueryClient();
  const [customers, setCustomers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customerName, setCustomerName] = useState("");
  const [contactNo, setContactNo] = useState("");

  useQuery("customers", () => CustomerAPI.GetCustomers(), {
    onSuccess: (data) => {
      setCustomers(data);
    },
  });

  const { mutate: create, isLoading: creating } = useMutation(
    CustomerAPI.CreateCustomer,
    {
      onSuccess: () => {
        onClose();
        setCustomerName("");
        setContactNo("");
        client.invalidateQueries("customers");
        alert("Customer created successfully");
      },
      onError: () => {
        onClose();
        alert("Error creating customer");
      },
    }
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="customerName">Customer Name</FormLabel>
              <Input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="contactNo">Contact No</FormLabel>
              <Input
                id="contactNo"
                type="text"
                value={contactNo}
                onChange={(e) => {
                  setContactNo(e.target.value);
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
                if (customerName === "") {
                  alert("Please enter customer name");
                } else if (contactNo === "") {
                  alert("Please enter contact no");
                } else {
                  create({ name: customerName, contactNo });
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
            Customers
          </Heading>
        </Flex>
        <IconButton icon={<FiPlus />} onClick={onOpen} />
      </Flex>
      <Flex flexDir="column">
        <Flex overflow="auto">
          <Table variant="simple" mt={4} size="sm">
            <Thead>
              <Tr color="gray">
                <Th>Customer Name</Th>
                <Th>Contact No</Th>
                <Th>Added Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <Tr key={customer.customerId}>
                  <Td>{customer.name}</Td>
                  <Td>{customer.contactNo}</Td>
                  <Td>{new Date(customer.createdAt).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
};

export default CustomerList;
