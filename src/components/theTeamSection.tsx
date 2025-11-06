import { Box, Heading, Text, Container, Flex } from '@chakra-ui/react'

export default function TheTeamSection() {
  return (
    <Box bg="black" py={{ base: 10, md: 20 }} w="100%">
      <Container maxW="container.lg">
        <Heading
          color="white"
          mb={12}
          textAlign="center"
          fontSize={{ base: '2xl', md: '4xl' }}
        >
          Meet The Team
        </Heading>

        <Flex wrap="wrap" justify="center" gap={8}>
          <Box bg="gray.800" borderRadius="md" p={6} color="white" w={{ base: '100%', md: '45%' }}>
            <Heading fontSize="xl" mb={2}>Toby</Heading>
            <Text fontWeight="semibold" mb={2}>Website and Game Development</Text>
            <Text fontSize="sm">
              Leads the front-end and web integration, also contributes to core game logic.
            </Text>
          </Box>

          <Box bg="gray.800" borderRadius="md" p={6} color="white" w={{ base: '100%', md: '45%' }}>
            <Heading fontSize="xl" mb={2}>Joseph</Heading>
            <Text fontWeight="semibold" mb={2}>Game Development</Text>
            <Text fontSize="sm">
              Focuses on implementing gameplay features and backend mechanics.
            </Text>
          </Box>

          <Box bg="gray.800" borderRadius="md" p={6} color="white" w={{ base: '100%', md: '45%' }}>
            <Heading fontSize="xl" mb={2}>Gurjot</Heading>
            <Text fontWeight="semibold" mb={2}>Game Development</Text>
            <Text fontSize="sm">
              Helps with Unity development and gameplay programming.
            </Text>
          </Box>

          <Box bg="gray.800" borderRadius="md" p={6} color="white" w={{ base: '100%', md: '45%' }}>
            <Heading fontSize="xl" mb={2}>Umar</Heading>
            <Text fontWeight="semibold" mb={2}>Design and Documentation</Text>
            <Text fontSize="sm">
              Creates UI layouts and manages all development documentation.
            </Text>
          </Box>

          <Box bg="gray.800" borderRadius="md" p={6} color="white" w={{ base: '100%', md: '45%' }}>
            <Heading fontSize="xl" mb={2}>Micheal</Heading>
            <Text fontWeight="semibold" mb={2}>Design and Documentation</Text>
            <Text fontSize="sm">
              Assists with game design elements and documentation structure.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
