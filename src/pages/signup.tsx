
import SignUpForm from "../components/signUpForm";
import { Box } from '@chakra-ui/react'
import SignUpInfoSection from "../components/signUpInfoSection";
import AboutSection from "../components/aboutSection";

export default function SignUpPage() {
  return (
    <>
      <Box pt="96px">
        <SignUpForm />
        <SignUpInfoSection />
        <AboutSection/>
      </Box>
    </>
  )
}