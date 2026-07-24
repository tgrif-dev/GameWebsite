import { lazy, Suspense } from 'react'
import Hero from "../components/heroSection";
import GameOfTheYearSection from "../components/GOTYSection";
import CallToActionSecion from "../components/ctaSection";
import NewsletterSection from "../components/newsletterSection";
import { Box, VStack } from '@chakra-ui/react'
import { pageOffset } from '../styles/section'

const PyramidSection = lazy(() => import("../components/pyramidSection"))

export default function HomePage() {
  return (
    <Box pt={pageOffset}>
      <VStack gap={0}>
        <Hero />
        <GameOfTheYearSection />
        <Suspense fallback={<Box h={{ base: '380px', md: '460px' }} w="100%" bg="panelBg" />}>
          <PyramidSection />
        </Suspense>
        <CallToActionSecion />
        <NewsletterSection />
      </VStack>
    </Box>
  )
}