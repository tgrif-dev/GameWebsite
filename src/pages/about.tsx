
import AboutSection from "../components/aboutSection";
import CallToActionSection from "../components/ctaSection";
import UpdatesSection from "../components/updatesSection";

import { Box } from '@chakra-ui/react'

export default function AboutPage() {
  return (
    <>
      <Box pt="96px">
        <UpdatesSection />
        <AboutSection />
        <CallToActionSection />
      </Box>
    </>
  )
}