import { Box, Heading, VStack, SimpleGrid, Text, Container } from '@chakra-ui/react'

export default function SignUpInfoSection() {
  return (
    <Box w="100vw" bg="black" overflow="hidden" py={{ base: 12, md: 20 }}>
      <Container maxW="6xl" color="white">
        <VStack gap={12} textAlign="center">
          <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold">
            You Will Receive
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
            <VStack gap={3}>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                Access To Beta Versions
              </Text>
              <Text fontSize="sm" color="gray">
                Be the first to experience new features and updates!
              </Text>
            </VStack>

            <VStack gap={3}>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                Developer Updates
              </Text>
              <Text fontSize="sm" color="gray">
                Be the first to know about the state of the game!
              </Text>
            </VStack>

            <VStack gap={3}>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                Exclusive Content
              </Text>
              <Text fontSize="sm" color="gray">
                Teasers, guides, and more!
              </Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
