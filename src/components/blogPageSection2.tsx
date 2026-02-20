import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'

export default function Blog2() {
    return (
        <Box bg="gray.800" py={{ base: 8, md: 12 }} w="100%">
            <Container maxW="container.lg">
                <Flex direction="column" gap={4}>
                    <Heading
                        color="white"
                        fontSize={{ base: '3xl', md: '5xl' }}
                        letterSpacing="widest"
                    >
                        Turning Ancient History into Level Design
                    </Heading>

                    <Text color="gray.300" fontSize={{ base: 'md', md: 'lg' }} maxW="800px">
                        One of our early goals for <strong>Inversion</strong> was to ground the puzzles in an
                        ancient-world atmosphere without copying any specific civilisation. We studied Mediterranean
                        ruins, labyrinth structures, burial chambers, and temple architecture to guide the way rooms
                        look and feel.
                    </Text>

                    <Text color="gray.500" fontSize={{ base: 'sm', md: 'md' }} maxW="700px">
                        Each level is themed around a small narrative moment—such as retrieving a relic, navigating a
                        collapsing hallway, or unlocking a forgotten chamber. From there, we build inversion points
                        that reinforce the story. This approach makes the puzzles feel intentional and connected to the
                        world rather than random mechanical challenges.
                    </Text>
                </Flex>
            </Container>
        </Box>
    )
}

