import { useState, useEffect } from 'react'
import { Box, Container, Heading, Text, VStack, SimpleGrid, Image } from '@chakra-ui/react'
import { pageTopPadding, sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles } from '../styles/section'

const modules = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const images = Object.keys(modules)
  .sort()
  .map((path) => ({
    src: modules[path],
    name: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') ?? '',
  }))

export default function GallerySection() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Box bg="pageBg" w="100%" pt={pageTopPadding} pb={sectionPadding} minH="60vh">
      <Container maxW="container.xl">
        <VStack gap={sectionHeaderGap} align="start" mb={sectionHeaderMargin}>
          <Text {...eyebrowStyles}>Every run is different</Text>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            GALLERY
          </Heading>
          <Text color="textMuted" fontSize={{ base: 'md', md: 'lg' }} maxW="620px" lineHeight="1.8">
            Screenshots from real runs. None of these layouts were designed by hand.
          </Text>
        </VStack>

        {images.length === 0 ? (
          <Box
            bg="panelBg"
            border="1px solid"
            borderColor="hairline"
            borderRadius="sm"
            p={{ base: 8, md: 12 }}
          >
            <Heading color="textPrimary" fontSize="xl" mb={3}>
              Nothing here yet
            </Heading>
            <Text color="textMuted" fontSize="md" lineHeight="1.8">
              Screenshots are on the way.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
            {images.map((image) => (
              <Box
                key={image.src}
                as="button"
                onClick={() => setActive(image.src)}
                border="1px solid"
                borderColor="hairline"
                borderRadius="sm"
                overflow="hidden"
                bg="panelBg"
                cursor="pointer"
                transition="border-color 0.3s ease"
                _hover={{ borderColor: 'accent' }}
              >
                <Image
                  src={image.src}
                  alt={image.name}
                  width="100%"
                  aspectRatio={16 / 9}
                  objectFit="cover"
                  transition="transform 0.4s ease"
                  _hover={{ transform: 'scale(1.04)' }}
                />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Container>

      {active ? (
        <Box
          position="fixed"
          inset="0"
          bg="rgba(8, 11, 14, 0.94)"
          zIndex="modal"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: 4, md: 12 }}
          onClick={() => setActive(null)}
          cursor="zoom-out"
        >
          <Image
            src={active}
            alt=""
            maxW="100%"
            maxH="90vh"
            objectFit="contain"
            border="1px solid"
            borderColor="hairline"
            borderRadius="sm"
          />
        </Box>
      ) : null}
    </Box>
  )
}