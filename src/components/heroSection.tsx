import { Box, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react'
import heroImage from '../assets/hero.webp'
export default function Hero() {
  return (
    <Box
      w="100%"
      position="relative"
      bgImage={`url(${heroImage})`}
      bgSize="cover"
      bgPos="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset="0"
        bgGradient="to-b"
        gradientFrom="rgba(8, 11, 14, 0.4)"
        gradientVia="rgba(8, 11, 14, 0.6)"
        gradientTo="panelBg"
      />

      <VStack
        position="relative"
        gap={8}
        minH="calc(100vh - 96px)"
        justify="center"
        align="center"
        textAlign="center"
        px={6}
      >
        <Text
          fontFamily="mono"
          fontSize={{ base: 'xs', md: 'sm' }}
          letterSpacing="0.4em"
          textTransform="uppercase"
          color="accent"
        >
          A puzzle game about what was left behind
        </Text>

        <Heading
          fontSize={{ base: '5xl', md: '8xl' }}
          fontWeight="700"
          letterSpacing="0.2em"
          color="textPrimary"
          lineHeight="1"
        >
          LOST SOCIETY
        </Heading>

        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="textMuted"
          maxW="560px"
          lineHeight="1.8"
        >
          Every run rebuilds the ruins from scratch. The deeper you get, the harder
          it pushes back. Beat your best, then find out how much further it goes.
        </Text>

        <HStack gap={4} pt={2} flexWrap="wrap" justify="center">
          <Button
            as="a"
            size="lg"
            px={10}
            bg="accent"
            color="accentText"
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="wider"
            textTransform="uppercase"
            borderRadius="sm"
            transition="background-color 0.2s ease, transform 0.2s ease"
            _hover={{ bg: 'accentHover', transform: 'translateY(-2px)' }}
            {...{ href: '/download' }}
          >
            Download
          </Button>

          <Button
            as="a"
            size="lg"
            px={10}
            bg="transparent"
            color="textPrimary"
            border="1px solid"
            borderColor="hairline"
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="wider"
            textTransform="uppercase"
            borderRadius="sm"
            transition="border-color 0.2s ease, color 0.2s ease"
            _hover={{ borderColor: 'accent', color: 'accent' }}
            {...{ href: '/#newsletter' }}
          >
            Newsletter
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}