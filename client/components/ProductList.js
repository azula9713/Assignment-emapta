import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";
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
  Select,
} from "@chakra-ui/react";

import { FiPlus } from "react-icons/fi";
import * as ProductAPI from "../api/ProductAPI";
import * as CustomerAPI from "../api/CustomerAPI";
import * as ProductTypeAPI from "../api/ProductTypeAPI";

const ProductList = () => {
  const client = useQueryClient();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productType, setProductType] = useState("");
  const [customer, setCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [prodTypes, setProdTypes] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("PENDING");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [mode, setMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useQuery("products", () => ProductAPI.GetProducts(), {
    onSuccess: (data) => {
      setProducts(data);
    },
  });

  useQuery("productTypes", () => ProductTypeAPI.GetProductTypes(), {
    onSuccess: (data) => {
      setProdTypes(data);
    },
  });

  useQuery("customers", () => CustomerAPI.GetCustomers(), {
    onSuccess: (data) => {
      setCustomers(data);
    },
  });

  const { mutate: create, isLoading: creating } = useMutation(
    ProductAPI.CreateProduct,
    {
      onSuccess: () => {
        onClose();
        setProductType("");
        setCustomer("");
        setDeliveryDate("");
        setDeliveryStatus("");
        setDeliveryAddress("");
        client.invalidateQueries("products");
      },
      onError: () => {
        onClose();
      },
    }
  );

  const { mutate: update, isLoading: updating } = useMutation(
    ProductAPI.UpdateProduct,
    {
      onSuccess: () => {
        onClose();
        setProductType("");
        setCustomer("");
        setDeliveryDate("");
        setDeliveryStatus("");
        setDeliveryAddress("");
        client.invalidateQueries("products");
        alert("Product updated successfully");
      },
      onError: () => {
        onClose();
        alert("Error updating product");
      },
    }
  );

  useEffect(() => {
    if (selectedProduct) {
      setProductType(selectedProduct.productType._id);
      setCustomer(selectedProduct.customer._id);
      // setDeliveryDate(selectedProduct.deliveryDate);
      //convert deliveryDate to calendar format
      setDeliveryDate(
        new Date(selectedProduct.estimatedDeliveryDate)
          .toISOString()
          .split("T")[0]
      );
      setDeliveryStatus(selectedProduct.deliveryStatus);
      setDeliveryAddress(selectedProduct.deliveryAddress);
      setMode("update");
    }
  }, [selectedProduct]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="product">Product Type</FormLabel>
              <Select
                id="status"
                placeholder="Select product type"
                value={productType}
                onChange={(e) => {
                  setProductType(e.target.value);
                }}
              >
                {prodTypes.map((c) => (
                  <option key={c.productTypeId} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="customer">Customer</FormLabel>
              <Select
                id="status"
                placeholder="Select customer"
                value={customer}
                onChange={(e) => {
                  setCustomer(e.target.value);
                }}
              >
                {customers.map((c) => (
                  <option key={c.customerId} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="address">Delivery Address</FormLabel>
              <Input
                id="address"
                type="text"
                value={deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="estDate">Estimated Delivery Date</FormLabel>
              <Input
                id="estDate"
                type="date"
                value={deliveryDate}
                onChange={(e) => {
                  setDeliveryDate(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="status">Delivery Status</FormLabel>
              <Select
                id="status"
                placeholder="Select status"
                value={deliveryStatus}
                onChange={(e) => {
                  setDeliveryStatus(e.target.value);
                }}
              >
                <option value="PENDING">Pending</option>
                <option value="ORDERED">Ordered</option>
                <option value="SHIPPED">Shipped</option>
                <option value="CANCELLED">Cancelled</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            {mode === "create" ? (
              <Button
                colorScheme="whatsapp"
                variant="solid"
                onClick={() => {
                  if (customer === "") {
                    alert("Please select a customer");
                  } else if (productType === "") {
                    alert("Please enter a product type");
                  } else if (deliveryAddress === "") {
                    alert("Please enter a delivery address");
                  } else if (deliveryDate === "") {
                    alert("Please enter an esimated delivery date");
                  } else if (deliveryStatus === "") {
                    alert("Please enter the delivery status");
                  } else {
                    create({
                      customer,
                      productType,
                      deliveryAddress,
                      estimatedDeliveryDate: deliveryDate,
                      deliveryStatus,
                    });
                  }
                }}
              >
                {creating ? "Creating..." : "Create"}
              </Button>
            ) : (
              <Button
                colorScheme="whatsapp"
                variant="solid"
                onClick={() => {
                  if (customer === "") {
                    alert("Please select a customer");
                  } else if (productType === "") {
                    alert("Please enter a product type");
                  } else if (deliveryAddress === "") {
                    alert("Please enter a delivery address");
                  } else if (deliveryDate === "") {
                    alert("Please enter an esimated delivery date");
                  } else if (deliveryStatus === "") {
                    alert("Please enter the delivery status");
                  } else {
                    const updatedData = {
                      customer,
                      productType,
                      deliveryAddress,
                      estimatedDeliveryDate: deliveryDate,
                      deliveryStatus,
                    };

                    update({
                      variables: {
                        data: updatedData,
                        id: selectedProduct.productId,
                      },
                    });
                  }
                }}
              >
                {updating ? "Updating..." : "Update"}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justifyContent="space-between" mt={8}>
        <Flex align="flex-end">
          <Heading as="h2" size="lg" letterSpacing="tight">
            Product Sales
          </Heading>
          <Text fontSize="small" color="gray" ml={4}>
            March 2022
          </Text>
        </Flex>
        <IconButton
          icon={<FiPlus />}
          onClick={() => {
            setMode("create");
            onOpen();
          }}
        />
      </Flex>
      <Flex flexDir="column">
        <Flex overflow="auto">
          <Table variant="striped" mt={4}>
            <Thead>
              <Tr color="gray">
                <Th>Product Type</Th>
                <Th>Customer</Th>
                <Th>Delivery Address</Th>
                <Th>Deliver Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.productId}>
                  <Td>
                    <Flex align="center">
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          {product.productType.name}
                        </Heading>
                        <Text fontSize="sm" color="gray">
                          {new Date(
                            product.estimatedDeliveryDate
                          ).toLocaleDateString()}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>{product.customer.name}</Td>
                  <Td>{product.deliveryAddress}</Td>
                  <Td>{product.deliveryStatus}</Td>
                  <Td>
                    <Button
                      bgColor="blackAlpha.900"
                      color="#fff"
                      p={5}
                      borderRadius={15}
                      onClick={() => {
                        setSelectedProduct(product);
                        setMode("update");
                        onOpen();
                      }}
                    >
                      Update Order
                    </Button>
                    <Button
                      bgColor="blackAlpha.900"
                      color="#fff"
                      p={5}
                      ml={3}
                      borderRadius={15}
                      onClick={() => {
                        router.push(`/products/${product.productId}`);
                      }}
                    >
                      View
                    </Button>
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

export const getStaticProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default ProductList;
