import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        border="10px solid black"
        borderRadius="xl"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          CHAT-INTEGRATION
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} border="10px solid black" borderRadius="xl" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded" colorScheme="orange" border="0">
          <TabList mb="1em">
            <Tab _focus={{outline:"none"}} _selected={{border:"2px solid orange"}}>Login</Tab>
            <Tab _focus={{outline:"none"}} _selected={{border:"2px solid orange"}}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
