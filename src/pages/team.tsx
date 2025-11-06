
import CallToActionSection from "../components/ctaSection";
import TeamIntroSection from "../components/teamIntroSection";
import TheTeamSection from "../components/theTeamSection";
import { Box } from '@chakra-ui/react'

export default function TeamPage() {
  return (
    <>
      <Box pt="96px">
        <TeamIntroSection />
        <TheTeamSection />
        <CallToActionSection />
      </Box>
    </>
  )
}