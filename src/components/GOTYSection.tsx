import { Box, Heading, Image, VStack, SimpleGrid, Text, Container } from "@chakra-ui/react";

export default function GameOfTheYearSection() {
  return (
    <Box bg="black" py={{ base: 10, md: 20 }} w="100%">
      <Container maxW="container.xl">
        <VStack gap={6} color="white" textAlign="center">
          <Heading fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="widest" mb={{ base: 4, md: 8 }}>
            Game Of The Year
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="100%">
            <Box
              bg="gray.900"
              borderRadius="md"
              p={6}
              textAlign="center"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              willChange="transform"
              _hover={{
                transform: "scale(1.03)",
                boxShadow: "lg",
                bg: "gray.800"
              }}
            >
              <Image
                src="/GameImage1.png"
                alt="Immersive Gameplay"
                width="100%"
                aspectRatio={16 / 9}
                objectFit="cover"
                borderRadius="md"
                mb={4}
              />
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                Immersive Gameplay
              </Text>
              <Text fontSize="sm" color="gray.400">
                Mechanics And Atmosphere That Keep You Playing
              </Text>
            </Box>

            <Box
              bg="gray.900"
              borderRadius="md"
              p={6}
              textAlign="center"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              willChange="transform"
              _hover={{
                transform: "scale(1.03)",
                boxShadow: "lg",
                bg: "gray.800"
              }}
            >
              <Image
                src="/TitleScreen.png"
                alt="Cinematic Visuals"
                width="100%"
                aspectRatio={16 / 9}
                objectFit="cover"
                borderRadius="md"
                mb={4}
              />
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                Cinematic Visuals
              </Text>
              <Text fontSize="sm" color="gray.400">
                Every Frame Carefully Crafted For Atmosphere
              </Text>
            </Box>

            <Box
              bg="gray.900"
              borderRadius="md"
              p={6}
              textAlign="center"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              willChange="transform"
              _hover={{
                transform: "scale(1.03)",
                boxShadow: "lg",
                bg: "gray.800"
              }}
            >
              <Image
                src="/GameImage2.png"
                alt="Evolving Narrative"
                width="100%"
                aspectRatio={16 / 9}
                objectFit="cover"
                borderRadius="md"
                mb={4}
              />
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                Evolving Narrative
              </Text>
              <Text fontSize="sm" color="gray.400">
                Story Choices That Stick With You Long After You Play
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
