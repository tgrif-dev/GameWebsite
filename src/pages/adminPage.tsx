import AdminSection from "../components/adminSection";
import { Box } from '@chakra-ui/react'
import { pageOffset } from '../styles/section'

export default function AdminPage() {
  return (
    <Box pt={pageOffset}>
      <AdminSection />
    </Box>
  )
}