import BlogPostSection from "../components/blogPostSection";
import { Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { pageOffset } from '../styles/section'

export default function BlogPostPage() {
  const { slug } = useParams()

  return (
    <Box pt={pageOffset}>
      <BlogPostSection slug={slug} />
    </Box>
  )
}