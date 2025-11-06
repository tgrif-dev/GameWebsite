import { Box, Heading, Text, SimpleGrid, Image, VStack, Container } from '@chakra-ui/react'
const updates = [
  "Game started development",
  "MVP in development",
  "Alpha scheduled for December 2025",
  "Tutorial level available",
  "Inversion system implomented",
  "Switching between worlds added",
];

export default function UpdatesSection(){
  return (
    <>      
      <Box w="full" bg="gray.900" py={{ base: 8, md: 12 }}>
        <Container maxW="container.lg">

          <VStack gap={6} h = "100%" justify="center" align="center" color="white" textAlign="center">
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              letterSpacing="widest"
              textAlign="left"
              w="full"
              pb={2}
            >
              Latest Developer Update
            </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} w="100%" gap={{ base: 8, md: 12 }}>
                <Box bg="gray.800" p={6} rounded="md" boxShadow="md" w="100%">
                  <VStack gap={4} align="start">
                    <Text fontSize="md" color="gray.400" fontWeight="semibold">
                      v0.1.0 - June 2025 - The Hack
                    </Text>
                    {updates.map((update, index) => (
                      <Text key={index} fontSize="lg" fontWeight="medium">
                        • {update}
                      </Text>
                    ))}
                  </VStack>
                </Box>

                <Box flex="1" textAlign="center">
                  <Image
                    src="GameUpdates.png"
                    alt="What we're working on"
                    objectFit="cover"
                    borderRadius="2xl"
                    boxShadow="lg"
                    maxW={{ base: '100%', md: '450px' }}
                    mx="auto"
                  />
                </Box>
              </SimpleGrid>

          </VStack>
        </Container>
      </Box>

    </>
  )
}