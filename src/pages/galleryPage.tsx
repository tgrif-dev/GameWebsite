import GallerySection from "../components/gallerySection";
import NewsletterSection from "../components/newsletterSection";
import { Box } from '@chakra-ui/react'
import { pageOffset } from '../styles/section'

export default function GalleryPage() {
  return (
    <Box pt={pageOffset}>
      <GallerySection />
      <NewsletterSection />
    </Box>
  )
}