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
import { useEffect, useState } from "react"; // Import useState
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useLocation } from 'react-router-dom';

function Homepage() {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email');
  
  // Create state to hold the email
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (email) {
      localStorage.setItem("userEmail", email); // Store the userEmail in localStorage
      setUserEmail(email); // Also update the state
    }
  }, [email]);

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
          CLUB-CHAT
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
              {/* Pass userEmail as prop */}
              <Login userEmail={userEmail} />
            </TabPanel>
            <TabPanel>
              <Signup userEmail={userEmail}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;