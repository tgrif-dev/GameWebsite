import { Box, Container, Flex, Heading, Button } from '@chakra-ui/react'

export default function CallToActionSection() {
  return (
    <Box bg="gray.800" py={{ base: 8, md: 12 }} w="100%">
      <Container maxW="container.lg">
        <Flex align="center" justify="space-between">
          <Heading
            color="white"
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="widest"
          >
            Sign Up To Newsletter
          </Heading>

          <Button
            as="a"
            size="lg"
            px={8}
            bg="white"
            color="gray.800"
            borderRadius="md"
            boxShadow="md"
            transition="transform 0.2s ease, background-color 0.2s ease"
            _hover={{
              bg: 'gray.100',
              transform: 'scale(1.02)'
            }}
            {...{ href: "/signup" }}
          >
            Sign Up
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
