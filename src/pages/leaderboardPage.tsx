import LeaderboardSection from "../components/leaderboardSection";
import NewsletterSection from "../components/newsletterSection";
import { Box } from '@chakra-ui/react'
import { pageOffset } from '../styles/section'

export default function LeaderboardPage() {
  return (
    <Box pt={pageOffset}>
      <LeaderboardSection />
      <NewsletterSection />
    </Box>
  )
}