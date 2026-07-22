import { Box, Heading, Text, SimpleGrid, Image, VStack, Container } from '@chakra-ui/react'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles } from '../styles/section'

export default function TeamIntroSection() {
  return (
    <Box w="full" bg="pageBg" pt={pageTopPadding} pb={sectionPadding}>
      <Container maxW="container.lg">
        <VStack gap={sectionHeaderGap} align="start" mb={sectionHeaderMargin}>
          <Text {...eyebrowStyles}>Who made this</Text>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            THE TEAM
          </Heading>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} w="100%" gap={{ base: 10, md: 16 }}>
          <VStack align="start" gap={5}>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
              Lost Society is built by five students at Aston University as an eighteen
              month team project, with a range of experience between us.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
              We split the work by strength rather than spreading everyone thinly across
              everything, which is how a team this size ships something finished instead
              of something half built in five directions.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="textMuted" lineHeight="1.9">
              The devlog is where we write up what we are working on. The newsletter
              sends the same posts to your inbox.
            </Text>
          </VStack>

          <Box textAlign="center">
            <Image
              src="TheTeam.png"
              alt="The Lost Society team"
              objectFit="cover"
              border="1px solid"
              borderColor="hairline"
              borderRadius="sm"
              maxW="100%"
              maxH="320px"
              mx="auto"
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}