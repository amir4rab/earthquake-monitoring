import { Center, Loader } from "@mantine/core"

const LoadingDisplay = () => {
  return (
    <Center sx={{ minHeight: '100vh' }}>
      <Loader />
    </Center>
  )
};

export default LoadingDisplay;