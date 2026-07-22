import {
  Box,
  Container,
  Flex,
  VStack,
  Link,
  SimpleGrid,
  Text,
  Heading,
} from '@chakra-ui/react';
import { sectionPadding, labelStyles } from '../styles/section'

const footerLinkStyles = {
  fontSize: 'md',
  color: 'textMuted',
  transition: 'color 0.2s ease',
  _hover: { color: 'accent', textDecoration: 'none' },
}

export default function Footer() {
  return (
    <Box
      bg="panelBg"
      borderTop="1px solid"
      borderColor="hairline"
      py={sectionPadding}
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
          gap={{ base: 10, md: 8 }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <VStack align={{ base: 'center', md: 'start' }} gap={3} maxW="340px">
            <Heading
              fontSize="lg"
              color="textPrimary"
              letterSpacing="0.22em"
              fontWeight="700"
            >
              LOST SOCIETY
            </Heading>
            <Text fontSize="md" color="textSubtle" lineHeight="1.8">
              A procedurally generated puzzle game, built as a team project at Aston University.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 8, md: 16 }}>
            <VStack align={{ base: 'center', md: 'start' }} gap={3}>
              <Text {...labelStyles}>The game</Text>
              <Link href="/about" {...footerLinkStyles}>About the game</Link>
              <Link href="/gallery" {...footerLinkStyles}>Gallery</Link>
              <Link href="/leaderboard" {...footerLinkStyles}>Leaderboard</Link>
              <Link href="/download" {...footerLinkStyles}>Download</Link>
            </VStack>

            <VStack align={{ base: 'center', md: 'start' }} gap={3}>
              <Text {...labelStyles}>The project</Text>
              <Link href="/blog" {...footerLinkStyles}>Devlog</Link>
              <Link href="/team" {...footerLinkStyles}>The team</Link>
              <Link href="/#newsletter" {...footerLinkStyles}>Newsletter</Link>
            </VStack>
          </SimpleGrid>
        </Flex>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
          mt={{ base: 10, md: 14 }}
          pt={6}
          borderTop="1px solid"
          borderColor="hairline"
        >
          <Text fontFamily="mono" fontSize="sm" color="textSubtle" letterSpacing="0.14em">
            Aston University team project
          </Text>
          <Link
            href="/privacy"
            {...footerLinkStyles}
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="0.14em"
          >
            Privacy
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}