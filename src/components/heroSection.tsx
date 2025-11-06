import { Box, Heading, VStack, Button } from '@chakra-ui/react'
import reactLogo from '../assets/hero.png'

export default function Hero() {
  return (
    <Box
      w="100%"
      bgImage={`url(${reactLogo})`}
      bgSize="cover"
      bgPos="center"
      overflow="hidden"
    >
      <VStack
        gap={6}
        minH="calc(100vh - 96px)"
        justify="center"
        align="center"
        color="white"
        textAlign="center"
      >
        <Heading fontSize={{ base: '5xl', md: '7xl' }} letterSpacing="widest">
          INVERSION
        </Heading>
        <Button
          size="lg"
          px={8}
          bg="white"
          color="black"
          _hover={{ bg: 'gray' }}
          as="a"
          {...{ href: "/signup" }}
        >
          Sign Up To Newsletter
        </Button>
      </VStack>
    </Box>
  )
}
