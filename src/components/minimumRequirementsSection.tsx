import {
  Box,
  Heading,
  VStack,
  Container,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

export default function MinimumRequirementsSection() {
  return (
    <Box w="full" bg="black" py={{ base: 16, md: 24 }} color="white">
      <Container maxW="container.md">
        <VStack gap={12} textAlign="center">
          <Heading fontSize={{ base: '3xl', md: '5xl' }}>
            Minimum Requirements
          </Heading>

          <Box
            borderRadius="md"
            p={6}
            bg="gray.800"
            w="full"
            boxShadow="md"
            textAlign="left"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            willChange="transform"
            _hover={{
              transform: "scale(1.01)",
              boxShadow: "lg"
            }}
          >
            <SimpleGrid columns={2} gapY={4}>
              <Text fontWeight="bold">OS</Text>
              <Text>Windows 10</Text>

              <Text fontWeight="bold">CPU</Text>
              <Text>Intel Core i5-2500K or AMD FX-6300</Text>

              <Text fontWeight="bold">GPU</Text>
              <Text>NVIDIA GTX 770 or AMD R9 280</Text>

              <Text fontWeight="bold">RAM</Text>
              <Text>8 GB</Text>

              <Text fontWeight="bold">Storage</Text>
              <Text>10 GB available space</Text>

              <Text fontWeight="bold">DirectX/OpenGL</Text>
              <Text>DirectX 11 / OpenGL 4.5</Text>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
