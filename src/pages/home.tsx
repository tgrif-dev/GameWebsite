import Hero from "../components/heroSection";
import GameOfTheYearSection from "../components/GOTYSection";
import PyramidSection from "../components/pyramidSection.tsx";
import CallToActionSecion from "../components/ctaSection";
import VideoTrailerSection from "../components/trailerSection";
import NewsletterSection from "../components/newsletterSection";
import { Box, VStack } from '@chakra-ui/react'
import { pageOffset } from '../styles/section'

export default function HomePage() {
  return (
    <Box pt={pageOffset}>
      <VStack gap={0}>
        <Hero />
        <GameOfTheYearSection />
        <PyramidSection />
        <VideoTrailerSection />
        <CallToActionSecion />
        <NewsletterSection />
      </VStack>
    </Box>
  )
}