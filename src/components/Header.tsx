import {
  Flex,
  Heading,
  Spacer,
  HStack,
  VStack,
  Link,
  Button,
  Container,
  IconButton,
} from '@chakra-ui/react'
import { FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

const navLinkStyles = {
  fontFamily: 'mono',
  fontSize: 'sm',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color: 'textSubtle',
  transition: 'color 0.2s ease',
  _hover: { color: 'textPrimary', textDecoration: 'none' },
}

const buttonStyles = {
  fontFamily: 'mono',
  fontSize: 'sm',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  borderRadius: 'sm',
  bg: 'accent',
  color: 'accentText',
  transition: 'background-color 0.2s ease',
  _hover: { bg: 'accentHover' },
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = () => setIsOpen(prev => !prev)

  return (
    <>
      <Flex
        as="header"
        bg="panelBg"
        top="0"
        left="0"
        right="0"
        h="96px"
        px={{ base: 6, md: 8 }}
        borderBottom="1px solid"
        borderColor="hairline"
        zIndex="banner"
        position="fixed"
        align="center"
      >
        <Container maxW="7xl" px={0}>
          <Flex align="center" w="100%">
            <Link href="/" _hover={{ textDecoration: 'none' }}>
              <Heading
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="700"
                color="textPrimary"
                letterSpacing="0.22em"
              >
                LOST SOCIETY
              </Heading>
            </Link>

            <Spacer />

            <HStack gap={10} display={{ base: 'none', md: 'flex' }}>
              <Link href="/about" {...navLinkStyles}>
                The Game
              </Link>
              <Link href="/blog" {...navLinkStyles}>
                Devlog
              </Link>
              <Link href="/team" {...navLinkStyles}>
                The Team
              </Link>
              <Button as="a" px={6} size="sm" {...buttonStyles} {...{ href: '/download' }}>
                Download
              </Button>
            </HStack>

            <IconButton
              aria-label="Toggle Menu"
              variant="ghost"
              color="textPrimary"
              fontSize="2xl"
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              _hover={{ bg: 'transparent', color: 'accent' }}
              _active={{ bg: 'transparent' }}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </IconButton>
          </Flex>
        </Container>
      </Flex>

      <VStack
        position="fixed"
        top="96px"
        left="0"
        right="0"
        bg="panelBg"
        borderBottom="1px solid"
        borderColor="hairline"
        zIndex="banner"
        p={6}
        gap={5}
        align="stretch"
        display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
      >
        <Link href="/about" {...navLinkStyles}>
          The Game
        </Link>
        <Link href="/blog" {...navLinkStyles}>
          Devlog
        </Link>
        <Link href="/team" {...navLinkStyles}>
          The Team
        </Link>
        <Link href="/gallery" {...navLinkStyles}>
          Gallery
        </Link>
        <Link href="/#newsletter" {...navLinkStyles}>
          Newsletter
        </Link>
        <Button as="a" size="sm" {...buttonStyles} {...{ href: '/download' }}>
          Download
        </Button>
      </VStack>
    </>
  )
}