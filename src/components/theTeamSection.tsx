import { Box, Heading, Text, Container, SimpleGrid, VStack } from '@chakra-ui/react'
import { sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, cardBodySize } from '../styles/section'

const members = [
  {
    name: 'Toby',
    role: 'Website and game development',
    body: 'Leads the front end and web integration, and contributes to core game logic.',
  },
  {
    name: 'Joseph',
    role: 'Game development',
    body: 'Focuses on gameplay features and the systems behind them.',
  },
  {
    name: 'Gurjot',
    role: 'Game development',
    body: 'Works on Unity development and gameplay programming.',
  },
  {
    name: 'Umar',
    role: 'Design and documentation',
    body: 'Creates UI layouts and manages development documentation.',
  },
  {
    name: 'Michael',
    role: 'Design and documentation',
    body: 'Works on game design elements and documentation structure.',
  },
]

export default function TheTeamSection() {
  return (
    <Box
      bg="panelBg"
      borderTop="1px solid"
      borderColor="hairline"
      py={sectionPadding}
      w="100%"
    >
      <Container maxW="container.lg">
        <VStack gap={sectionHeaderGap} mb={sectionHeaderMargin} textAlign="center">
          <Text {...eyebrowStyles}>Five of us</Text>
          <Heading
            fontSize={{ base: '2xl', md: '4xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            MEET THE TEAM
          </Heading>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {members.map((member) => (
            <Box
              key={member.name}
              bg="panelBgAlt"
              border="1px solid"
              borderColor="hairline"
              borderRadius="sm"
              p={{ base: 6, md: 8 }}
              transition="border-color 0.3s ease, background-color 0.3s ease"
              _hover={{ borderColor: 'accent', bg: 'panelBgHover' }}
            >
              <VStack align="start" gap={3}>
                <Heading fontSize="xl" color="textPrimary" letterSpacing="0.08em">
                  {member.name}
                </Heading>
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  color="accent"
                >
                  {member.role}
                </Text>
                <Text fontSize={cardBodySize} color="textMuted" lineHeight="1.8">
                  {member.body}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}