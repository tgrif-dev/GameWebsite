import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Container
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("https://3f8d0c0a-2a2d-428a-b50c-d6932dda980f-00-2udofnjquu6pg.picard.replit.dev/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <Box as="section" bg="gray.900" overflow="hidden" color="white" w="100%" py={{ base: 12, md: 16 }} px={{ base: 4, md: 16 }}>
      <Container maxW="container.xl">
        <VStack gap={6} as="form" maxW="600px" mx="auto" onSubmit={handleSubmit}>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={{ base: 4, md: 6 }}>
            Sign Up For Newsletter
          </Heading>

          <Box w="100%">
            <Text textAlign="left">Enter Name</Text>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              bg="gray.700"
              color="white"
              _placeholder={{ color: "gray.400", fontWeight: "light" }}
              border="none"
              borderRadius="md"
              h="60px"
              w="100%"
            />
          </Box>

          <Box w="100%">
            <Text textAlign="left">Enter Email</Text>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              bg="gray.700"
              color="white"
              _placeholder={{ color: "gray.400", fontWeight: "light" }}
              border="none"
              borderRadius="md"
              h="60px"
              w="100%"
            />
          </Box>

          <Button
            type="submit"
            size="lg"
            bg="white"
            color="black"
            _hover={{ bg: "gray.300" }}
            borderRadius="md"
            fontWeight="semibold"
            px={10}
          >
            Sign Up
          </Button>

          {status === "success" && (
            <Text color="green.400">Subscribed successfully</Text>
          )}
          {status === "error" && (
            <Text color="red.400">Failed to subscribe</Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
