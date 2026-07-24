import { Box, Heading, Text, Container, SimpleGrid, VStack } from '@chakra-ui/react'
import { sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, cardBodySize } from '../styles/section'

const members = [
  {
    name: 'Toby',
    role: 'Team lead and website',
    body: 'Led the team and built the project website end to end, and contributed to Unity development and gameplay testing.',
  },
  {
    name: 'Karanveer',
    role: 'Configuration management',
    body: 'Defined the Git branching and pull request workflow the whole team develops against.',
  },
  {
    name: 'Natasha',
    role: 'Game development',
    body: 'Built the library room and the procedural systems underneath it.',
  },
  {
    name: 'Michael',
    role: 'Game development',
    body: 'Handled the main menu and the integration that links the five rooms into one playthrough.',
  },
  {
    name: 'Usman',
    role: 'Game development',
    body: 'Worked on puzzle implementation and interface reliability across the rooms.',
  },
  {
    name: 'Gurjot',
    role: 'Game development',
    body: 'Worked on puzzle design and gameplay programming in Unity.',
  },
  {
    name: 'Rajan',
    role: 'Concept and requirements',
    body: 'Shaped the original concept and the requirements the game was built against.',
  },
  {
    name: 'Umar',
    role: 'Development blog',
    body: 'Wrote the devlog posts documenting how the project progressed.',
  },
  {
    name: 'Dylan',
    role: 'Design and documentation',
    body: 'Contributed to design decisions and project documentation.',
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
          <Text {...eyebrowStyles}>Nine of us</Text>
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