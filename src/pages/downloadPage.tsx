import DownloadSection from "../components/downloadSection";
import MinimumRequirementsSection from "../components/minimumRequirementsSection";
import NewsletterSection from "../components/newsletterSection";
import { Box } from '@chakra-ui/react'
import { pageOffset } from '../styles/section'

export default function DownloadPage() {
  return (
    <Box pt={pageOffset}>
      <DownloadSection />
      <MinimumRequirementsSection />
      <NewsletterSection />
    </Box>
  )
}