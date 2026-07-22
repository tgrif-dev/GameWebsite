import { useEffect, useState } from 'react'
import { Box, Container, Heading, Text, VStack, Flex, Spinner, SimpleGrid } from '@chakra-ui/react'
import { fetchLeaderboard, formatTime, type LeaderboardEntry } from '../lib/api'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, labelStyles } from '../styles/section'

function Row({ entry }: { entry: LeaderboardEntry }) {
  const podium = entry.rank <= 3

  return (
    <SimpleGrid
      columns={3}
      gap={4}
      py={4}
      px={{ base: 4, md: 6 }}
      borderTop="1px solid"
      borderColor="hairline"
      alignItems="center"
      transition="background-color 0.2s ease"
      _hover={{ bg: 'panelBgAlt' }}
    >
      <Text
        fontFamily="mono"
        fontSize={{ base: 'sm', md: 'md' }}
        color={podium ? 'accent' : 'textSubtle'}
        letterSpacing="0.1em"
      >
        {String(entry.rank).padStart(2, '0')}
      </Text>

      <Text
        fontFamily="mono"
        fontSize={{ base: 'sm', md: 'md' }}
        color="textPrimary"
        letterSpacing="0.14em"
      >
        {entry.name}
      </Text>

      <Text
        fontFamily="mono"
        fontSize={{ base: 'sm', md: 'md' }}
        color={podium ? 'accent' : 'textMuted'}
        textAlign="right"
        letterSpacing="0.05em"
      >
        {formatTime(entry.time)}
      </Text>
    </SimpleGrid>
  )
}

export default function LeaderboardSection() {
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null)
  const [total, setTotal] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetchLeaderboard(controller.signal)
      .then((data) => {
        setEntries(data.entries)
        setTotal(data.total)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setFailed(true)
      })
    return () => controller.abort()
  }, [])

  return (
    <Box bg="pageBg" w="100%" pt={pageTopPadding} pb={sectionPadding} minH="60vh">
      <Container maxW="container.md">
        <VStack gap={sectionHeaderGap} align="start" mb={sectionHeaderMargin}>
          <Text {...eyebrowStyles}>Fastest runs</Text>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            LEADERBOARD
          </Heading>
          <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} maxW="620px" lineHeight="1.8">
            Every completed run is timed. These are the twenty quickest, straight from
            the live scoreboard.
          </Text>
        </VStack>

        {failed ? (
          <Box bg="panelBg" border="1px solid" borderColor="hairline" borderRadius="sm" p={{ base: 8, md: 12 }}>
            <Heading color="textPrimary" fontSize="xl" mb={3}>
              Scores are unavailable
            </Heading>
            <Text color="textMuted" fontSize="md" lineHeight="1.8">
              The scoreboard could not be reached. Try again in a few minutes.
            </Text>
          </Box>
        ) : entries === null ? (
          <Flex justify="center" py={16}>
            <Spinner color="accent" size="lg" />
          </Flex>
        ) : entries.length === 0 ? (
          <Box bg="panelBg" border="1px solid" borderColor="hairline" borderRadius="sm" p={{ base: 8, md: 12 }}>
            <Heading color="textPrimary" fontSize="xl" mb={3}>
              No times yet
            </Heading>
            <Text color="textMuted" fontSize="md" lineHeight="1.8">
              Nobody has finished a run. Be the first.
            </Text>
          </Box>
        ) : (
          <Box bg="panelBg" border="1px solid" borderColor="hairline" borderRadius="sm" overflow="hidden">
            <SimpleGrid columns={3} gap={4} py={4} px={{ base: 4, md: 6 }}>
              <Text {...labelStyles}>Rank</Text>
              <Text {...labelStyles}>Player</Text>
              <Text {...labelStyles} textAlign="right">Time</Text>
            </SimpleGrid>

            {entries.map((entry) => (
              <Row key={`${entry.rank}-${entry.name}`} entry={entry} />
            ))}
          </Box>
        )}

        {entries && entries.length > 0 ? (
          <Text fontFamily="mono" fontSize="sm" color="textSubtle" letterSpacing="0.12em" mt={6}>
            {total} runs recorded
          </Text>
        ) : null}
      </Container>
    </Box>
  )
}