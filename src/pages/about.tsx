import AboutSection from "../components/aboutSection";
import CallToActionSection from "../components/ctaSection";
import { Box } from '@chakra-ui/react'
import { pageOffset } from '../styles/section'

export default function AboutPage() {
  return (
    <Box pt={pageOffset}>
      <AboutSection />
      <CallToActionSection />
    </Box>
  )
}