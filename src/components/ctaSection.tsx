import { Box, Container, Flex, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { sectionPadding, sectionHeaderGap, eyebrowStyles } from '../styles/section'

export default function CallToActionSection() {
  return (
    <Box
      bg="panelBg"
      borderTop="1px solid"
      borderColor="hairline"
      py={sectionPadding}
      w="100%"
    >
      <Container maxW="container.lg">
        <Flex
          align={{ base: 'start', md: 'center' }}
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          gap={8}
        >
          <VStack align="start" gap={sectionHeaderGap}>
            <Text {...eyebrowStyles}>From the team</Text>
            <Heading
              color="textPrimary"
              fontSize={{ base: '2xl', md: '4xl' }}
              letterSpacing="0.12em"
            >
              READ THE DEVLOG
            </Heading>
            <Text fontSize="md" color="textMuted" maxW="460px" lineHeight="1.8">
              Progress updates, the problems we hit, and how the game changed along the way.
            </Text>
          </VStack>

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
            letterSpacing="0.14em"
            textTransform="uppercase"
            borderRadius="sm"
            flexShrink={0}
            transition="border-color 0.2s ease, color 0.2s ease"
            _hover={{ borderColor: 'accent', color: 'accent' }}
            {...{ href: '/blog' }}
          >
            Open the blog
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}