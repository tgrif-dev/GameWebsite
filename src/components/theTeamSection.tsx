import { Box, Heading, Text, Container, SimpleGrid, VStack } from '@chakra-ui/react'
import { sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, cardBodySize } from '../styles/section'

const members = [
  {
    name: 'Rajan Sandher',
    role: 'Concept and documentation',
    body: 'Aided with concept development, contributed to software requirements definition, supported project planning and evaluation activities, and produced the majority of the project\u2019s technical documentation.',
  },
  {
    name: 'Karanveer Singh',
    role: 'Unity development and leaderboard',
    body: 'Unity development, implementation of the first hard room, the high score timer, anonymous player authentication and the leaderboard, plus GitHub management.',
  },
  {
    name: 'Usman Jamshaid',
    role: 'Unity development',
    body: 'Unity development, easy room implementation and gameplay testing.',
  },
  {
    name: 'Dylan Turner',
    role: 'Unity development',
    body: 'Unity development and implementation of the second hard room.',
  },
  {
    name: 'Umar Hussain',
    role: 'Blog and documentation',
    body: 'Writing of the blog posts, project documentation and website UI design.',
  },
  {
    name: 'Gurjot Kaur',
    role: 'Medium room development',
    body: 'Development of the second medium room, including procedural generation, puzzles, UI, visual design, testing and evaluation content.',
  },
  {
    name: 'Toby Griffiths',
    role: 'Team leader and website',
    body: 'Team leader and project website development across the full stack, covering the React front end, Go serverless backend, database, newsletter and leaderboard integration, alongside Unity development, easy room implementation and gameplay testing.',
  },
  {
    name: 'Michael Howarth',
    role: 'Software development',
    body: 'Software development, implementation of the main menu and responsibility for linking the rooms.',
  },
  {
    name: 'Natasha Parbhakar',
    role: 'Team leader and Unity development',
    body: 'Team leader, Unity room development, gameplay testing and input to the evaluation report.',
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
                <Heading fontSize="lg" color="textPrimary" letterSpacing="0.06em">
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