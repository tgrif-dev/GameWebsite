import { Box, AspectRatio, Heading, Text, VStack, Container } from '@chakra-ui/react'
import { sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles } from '../styles/section'

export default function VideoTrailerSection() {
  return (
    <Box
      bg="pageBg"
      borderTop="1px solid"
      borderColor="hairline"
      w="100%"
      py={sectionPadding}
      overflow="hidden"
    >
      <Container maxW="container.lg">
        <VStack gap={sectionHeaderGap} mb={sectionHeaderMargin} textAlign="center">
          <Text {...eyebrowStyles}>A Sneak Peek</Text>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="0.15em"
            color="textPrimary"
          >
            TRAILER
          </Heading>
        </VStack>

        <AspectRatio
          ratio={16 / 9}
          w="full"
          maxW="900px"
          mx="auto"
          border="1px solid"
          borderColor="hairline"
          borderRadius="sm"
          overflow="hidden"
        >
          <iframe
            title="Lost Society gameplay trailer"
            src="https://www.youtube-nocookie.com/embed/cAcsMtjKRYk?rel=0&autoplay=0"
            loading="lazy"
            allowFullScreen
          />
        </AspectRatio>
      </Container>
    </Box>
  )
}