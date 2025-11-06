import { Box, AspectRatio, Heading, VStack } from '@chakra-ui/react'


export default function VideoTrailerSection(){
  return (
    <>      
      <Box 
     overflow="hidden"  backgroundColor={"black"} 
      w="100%"
      minH={{ base: 'auto', md: '100vh' }}  
      py={{ base: 10, md: 20 }} 
      >
        <VStack gap={6} h = "100%" justify="center" align="center" color="white" textAlign="center">
            <Heading fontSize={{base:`5xl`, md:`7xl`}} letterSpacing="widest" mb="8px" >
              Trailer
            </Heading>
            <AspectRatio ratio={16 / 9} w="full" maxW="800px" mx="auto">
                      <iframe
                        title="Gameplay Trailer"
                        src="https://www.youtube.com/embed/cAcsMtjKRYk?rel=0&autoplay=0"
                        allowFullScreen
                      />
            </AspectRatio>
        </VStack>
      </Box>
    </>
  )
}