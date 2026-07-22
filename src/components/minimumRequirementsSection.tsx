import { Box, Heading, Text, VStack, Container, SimpleGrid } from '@chakra-ui/react'
import { sectionPadding, sectionHeaderGap, sectionHeaderMargin, eyebrowStyles, labelStyles } from '../styles/section'

const requirements = [
  { label: 'OS', value: 'Windows 10' },
  { label: 'CPU', value: 'Intel Core i5-2500K or AMD FX-6300' },
  { label: 'GPU', value: 'NVIDIA GTX 770 or AMD R9 280' },
  { label: 'RAM', value: '8 GB' },
  { label: 'Storage', value: '10 GB available space' },
  { label: 'DirectX', value: 'Version 11' },
]

export default function MinimumRequirementsSection() {
  return (
    <Box
      w="full"
      bg="panelBg"
      borderTop="1px solid"
      borderColor="hairline"
      py={sectionPadding}
    >
      <Container maxW="container.lg">
        <VStack gap={sectionHeaderGap} align="start" mb={sectionHeaderMargin}>
          <Text {...eyebrowStyles}>Before you download</Text>
          <Heading
            fontSize={{ base: '2xl', md: '4xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            MINIMUM REQUIREMENTS
          </Heading>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={0} w="100%">
          {requirements.map((item) => (
            <Box
              key={item.label}
              borderTop="1px solid"
              borderColor="hairline"
              py={5}
              display="flex"
              flexDirection={{ base: 'column', sm: 'row' }}
              gap={{ base: 1, sm: 6 }}
              pr={{ base: 0, md: 10 }}
            >
              <Text {...labelStyles} minW="110px" pt={1}>
                {item.label}
              </Text>
              <Text fontSize="md" color="textPrimary">
                {item.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}