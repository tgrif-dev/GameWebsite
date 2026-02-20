import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'

export default function Blog3() {
    return (
        <Box bg="gray.800" py={{ base: 8, md: 12 }} w="100%">
            <Container maxW="container.lg">
                <Flex direction="column" gap={4}>
                    <Heading
                        color="white"
                        fontSize={{ base: '3xl', md: '5xl' }}
                        letterSpacing="widest"
                    >
                        Playtesting, Balance & Accessibility Improvements
                    </Heading>

                    <Text color="gray.300" fontSize={{ base: 'md', md: 'lg' }} maxW="800px">
                        After building our first set of puzzle rooms for <strong>Inversion</strong>, we carried out
                        informal playtests with other students. One common issue was that some players didn&apos;t
                        immediately realise when a room had inverted, which made certain puzzles feel harder than
                        intended.
                    </Text>

                    <Text color="gray.500" fontSize={{ base: 'sm', md: 'md' }} maxW="700px">
                        To improve clarity, we added stronger audio cues, a subtle screen shake, and more obvious 
                        colour changes for objects that move after inversion. We also restructured the level order 
                        so new mechanics are introduced slowly and fairly. Accessibility was another focus: we 
                        simplified controls, reduced visual clutter, and ensured key information isn&apos;t shown 
                        through colour alone. These changes help make the game more approachable while maintaining 
                        the challenge.
                    </Text>
                </Flex>
            </Container>
        </Box>
    )
}
