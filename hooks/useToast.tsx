import { useToast } from '@chakra-ui/react'

export function useToastHook() {
  const toast = useToast()

  const handleToast = ({ message, status }: any) => {
    toast({
      title: status,
      description: message,
      status: status,
      duration: 3000,
      position: 'bottom-right',
      isClosable: true,
    })
  }

  return [handleToast]
}
