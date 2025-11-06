
import SendOutNewsletter from "../components/sendOutNewsletter";
import { Box } from '@chakra-ui/react'

export default function AdminPage() {
  return (
    <>
      <Box pt="96px">
        <SendOutNewsletter />
      </Box>
    </>
  )
}