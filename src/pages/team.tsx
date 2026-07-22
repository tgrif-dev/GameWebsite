import TeamIntroSection from "../components/teamIntroSection";
import TheTeamSection from "../components/theTeamSection";
import CallToActionSection from "../components/ctaSection";
import { Box } from '@chakra-ui/react'
import { pageOffset } from '../styles/section'

export default function TeamPage() {
  return (
    <Box pt={pageOffset}>
      <TeamIntroSection />
      <TheTeamSection />
      <CallToActionSection />
    </Box>
  )
}