import { Flex, Heading, Text, Icon, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiHome, FiBox, FiUser } from "react-icons/fi";

const Sidebar = () => {
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    console.log("pathname", pathname);
  }, [pathname]);

  return (
    <Flex
      w={["100%", "100%", "10%", "15%", "15%"]}
      flexDir="column"
      alignItems="center"
      backgroundColor="#020202"
      color="#fff"
    >
      <Flex
        flexDir="column"
        h={[null, null, "100vh"]}
        justifyContent="space-between"
      >
        <Flex flexDir="column" as="nav">
          <Heading
            mt={50}
            mb={[25, 50, 100]}
            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
            alignSelf="center"
            letterSpacing="tight"
          >
            Fullstack Task
          </Heading>
          <Flex
            flexDir={["row", "row", "column", "column", "column"]}
            align={["center", "center", "center", "flex-start", "flex-start"]}
            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
            justifyContent="center"
          >
            <Flex
              className="sidebar-items"
              mr={[2, 6, 0, 0, 0]}
              onClick={() => {
                router.push("/");
              }}
            >
              <Link display={["none", "none", "flex", "flex", "flex"]}>
                <Icon
                  as={FiHome}
                  fontSize="2xl"
                  className={`${
                    pathname === "/" || "/products/[productId]"
                      ? "active-icon"
                      : ""
                  }`}
                />
              </Link>
              <Link
                _hover={{ textDecor: "none" }}
                display={["flex", "flex", "none", "flex", "flex"]}
              >
                <Text
                  className={`${
                    pathname === "/" || "/products/[productId]" ? "active" : ""
                  }`}
                >
                  Products
                </Text>
              </Link>
            </Flex>
            <Flex
              className="sidebar-items"
              mr={[2, 6, 0, 0, 0]}
              onClick={() => {
                router.push("/customers");
              }}
            >
              <Link display={["none", "none", "flex", "flex", "flex"]}>
                <Icon
                  as={FiUser}
                  fontSize="2xl"
                  className={`${
                    pathname === "/customers" ? "active-icon" : ""
                  }`}
                />
              </Link>
              <Link
                _hover={{ textDecor: "none" }}
                display={["flex", "flex", "none", "flex", "flex"]}
              >
                <Text
                  className={`${pathname === "/customers" ? "active" : ""}`}
                >
                  Customers
                </Text>
              </Link>
            </Flex>
            <Flex
              className="sidebar-items"
              mr={[2, 6, 0, 0, 0]}
              onClick={() => {
                router.push("/product-types");
              }}
            >
              <Link display={["none", "none", "flex", "flex", "flex"]}>
                <Icon
                  as={FiBox}
                  fontSize="2xl"
                  className={`${
                    pathname === "/product-types" ? "active-icon" : ""
                  }`}
                />
              </Link>
              <Link
                _hover={{ textDecor: "none" }}
                display={["flex", "flex", "none", "flex", "flex"]}
              >
                <Text
                  className={`${pathname === "/product-types" ? "active" : ""}`}
                >
                  Product Types
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
