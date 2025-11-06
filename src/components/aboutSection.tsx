import { Box, Heading, Text, SimpleGrid, Image, VStack, Container } from '@chakra-ui/react'

export default function AboutSection() {
  return (
    <Box w="full" bg="black" py={{ base: 12, md: 20 }}>
      <Container maxW="container.lg">
        <VStack gap={10} h="100%" justify="center" align="center" color="white" textAlign={{ base: 'center', md: 'left' }}>
          <Heading fontSize={{ base: '3xl', md: '5xl' }} letterSpacing="wider" textAlign="center">
            About the Game
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} w="100%" gap={{ base: 10, md: 16 }}>
            <VStack align="start" gap={4}>
              <Text fontSize={{ base: 'md', md: 'lg' }}>
                <strong>Inversion</strong> is a strategic puzzle game set in a distorted sci-fi world. The gameplay blends thought provoking puzzles and difficult choices, offering players deep, replayable experiences.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }}>
                Built in Unity, the game is currently in its pre alpha development phase, with an alpha release targeted for December 2025. Our goal is to deliver polished mechanics and a compelling atmosphere.
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }}>
                Stay tuned for regular updates as we build out the universe, refine core systems, and begin community testing.
              </Text>
            </VStack>

            <Box flex="1" textAlign="center">
              <Image
                src="InversionTitle.png"
                alt="In-game concept"
                objectFit="cover"
                borderRadius="md"
                maxW={{ base: '100%', md: '400px' }}
                mx="auto"
              />
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
