import { Box, Heading, Text, SimpleGrid, Image, VStack, Container } from '@chakra-ui/react'

export default function TeamIntroSection() {
  return (
    <Box w="full" bg="gray.900" pt={{ base: 6, md: 8 }} pb={{ base: 16, md: 20 }}>
      <Container maxW="container.lg">
        <VStack gap={10} h="100%" justify="center" align="center" color="white" textAlign={{ base: "center", md: "left" }}>
          <Heading fontSize={{ base: '3xl', md: '5xl' }} letterSpacing="widest" textAlign={{ base: 'center', md: 'left' }}>
            The Team
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} w="100%" gap={{ base: 10, md: 16 }}>
            <VStack align="start" gap={4}>
              <Text fontSize={{ base: "md", md: "lg" }}>
                <strong>Inversion</strong> is a game currently under development as a university project.
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }}>
                The team consists of five students with varying levels of development experience. We are committed to delivering the highest possible quality, providing the best gaming experience we can to all of our users.
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }}>
                Throught the development of the game, we aim to keep you updated with the latest updates regarding development. We will do this via social media posts, and an email newsletter.
              </Text>
            </VStack>

            <Box flex="1" textAlign="center" px={{ base: 0, md: 4 }}>
              <Image
                src="TheTeam.png"
                alt="What we're working on"
                objectFit="cover"
                borderRadius="md"
                maxW="100%"
                maxH="300px"
                mx="auto"
              />
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
