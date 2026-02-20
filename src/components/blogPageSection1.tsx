import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'

export default function Blog1() {
    return (
        <Box bg="gray.800" py={{ base: 8, md: 12 }} w="100%">
            <Container maxW="container.lg">
                <Flex direction="column" gap={4}>
                    <Heading
                        color="white"
                        fontSize={{ base: '3xl', md: '5xl' }}
                        letterSpacing="widest"
                    >
                        Designing the Inversion Mechanic
                    </Heading>

                    <Text color="gray.300" fontSize={{ base: 'md', md: 'lg' }} maxW="800px">
                        Our game, <strong>Inversion</strong>, is built around a simple idea: every room in the
                        temple can be flipped between two states. Walls become paths, platforms move, and hidden
                        routes are revealed. The challenge was to make this mechanic feel powerful without making
                        puzzles random or frustrating.
                    </Text>

                    <Text color="gray.500" fontSize={{ base: 'sm', md: 'md' }} maxW="700px">
                        To keep things readable, we added clear visual markers on objects that change when a
                        room inverts. Each puzzle uses a small number of possible configurations so players can
                        plan ahead instead of guessing. This post covers the early prototypes where we tested
                        how many inversion points a single room could handle before it became too confusing.
                    </Text>
                </Flex>
            </Container>
        </Box>
    )
}
