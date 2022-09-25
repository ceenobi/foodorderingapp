import { useState } from 'react'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useDisclosure,
  Input,
  chakra,
  VStack,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Loader from '../hooks/loader'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ceenobi/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'cstore'

type State = {
  src: string
}

export default function ProductModal(this: any) {
  const [files, setFiles] = useState<State>({
    src: '',
  })
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [prices, setPrices] = useState<number[]>([])
  const [extraOptions, setExtraOptions] = useState([])
  const [extra, setExtra] = useState()
  const [category, setCategory] = useState('Starter')
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const cat = ['Starter', 'Deluxe', 'Premium']

  const uploadFileHandler = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles({ ...files, src: e.target.files[0] })
    }
  }

  //   const handleUploadFiles = (files: any) => {
  //     const uploaded = [...files]
  //     let limitExceeded = false
  //     files.some((file: { name: any }) => {
  //       if (uploaded.findIndex((f) => f.name === file.name) === -1) {
  //         uploaded.push(file)
  //         if (uploaded.length === maxCount) setFileLimit(true)
  //         if (uploaded.length > maxCount) {
  //           toast.error(`You can only upload a  maximum of ${maxCount} files`)
  //           setFileLimit(false)
  //           limitExceeded = true
  //           return true
  //         }
  //       }
  //     })
  //     if (!limitExceeded) setFiles(uploaded)
  //   }
  //   const handleFileEvent = async (e: ChangeEvent<HTMLInputElement>) => {
  //     const chosenFiles = Array.prototype.slice.call(e.target.files)
  //     handleUploadFiles(chosenFiles)
  //   }

  const changePrice = (e: { target: { value: any } }, index: number) => {
    const currentPrices = prices
    currentPrices[index] = e.target.value
    setPrices(currentPrices)
  }

  const handleExtraInput = (e: { target: { name: any; value: any } }) => {
    setExtra({ ...(extra as any), [e.target.name]: e.target.value })
  }

  const handleExtra = async (e: any) => {
    setExtraOptions((prev) => [...prev, extra] as any)
  }

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', files.src)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    try {
      const uploadRes = await axios.post(CLOUDINARY_URL, formData, config)
      const { url } = uploadRes.data
      const newProduct = {
        title,
        desc,
        prices,
        category,
        extraOptions,
        img: url,
      }
      setLoading(true)
      await axios.post('http://localhost:3000/api/products', newProduct)
      toast.success(`Product created successfully`)
      onClose()
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(`There was a problem creating your product`)
    }
  }

  return (
    <>
      <Button colorScheme='whatsapp' variant='solid' onClick={onOpen}>
        Add New Product
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
        isCentered
        size='lg'
      >
        <ModalOverlay />
        <ModalContent color='blackAlpha.800'>
          <ModalHeader>Add a new Pizza</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Loader />
            ) : (
              <chakra.form onSubmit={handleCreate}>
                <VStack spacing={4} align='start'>
                  <Box>
                    <chakra.label>Choose an image</chakra.label>
                    <Input
                      type='file'
                      id='fileupload'
                      placeholder='choose file'
                      onChange={uploadFileHandler}
                      accept='image/*'
                      multiple
                      variant='unstyled'
                    />
                  </Box>
                  <Box>
                    <chakra.label>Title</chakra.label>
                    <Input
                      type='text'
                      variant='flushed'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <chakra.label>Description</chakra.label>
                    <Textarea
                      placeholder='Here is a sample placeholder'
                      size='sm'
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <chakra.label>Category</chakra.label>
                    <RadioGroup
                      onChange={setCategory}
                      value={category}
                      name='category'
                    >
                      <Stack direction='row'>
                        {cat.map((key, index) => (
                          <Radio
                            colorScheme='blue'
                            size='md'
                            key={index}
                            value={key}
                          >
                            {key}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Box>
                    <chakra.label>Prices</chakra.label>
                    <Flex gap={4} align='center'>
                      <Input
                        type='number'
                        placeholder='Small'
                        onChange={(e) => changePrice(e, 0)}
                      />
                      <Input
                        type='number'
                        placeholder='Medium'
                        onChange={(e) => changePrice(e, 1)}
                      />
                      <Input
                        type='number'
                        placeholder='Large'
                        onChange={(e) => changePrice(e, 2)}
                      />
                    </Flex>
                  </Box>
                  <Box>
                    <chakra.label>Extra</chakra.label>
                    <Flex gap={4} align='center'>
                      <Input
                        type='text'
                        placeholder='Item'
                        name='text'
                        onChange={handleExtraInput}
                      />
                      <Input
                        type='number'
                        placeholder='Price'
                        name='price'
                        onChange={handleExtraInput}
                      />
                      <Button
                        colorScheme='blue'
                        variant='outline'
                        onClick={handleExtra}
                      >
                        Add
                      </Button>
                    </Flex>
                  </Box>
                  <Flex flexWrap='wrap' align='center' my='10px'>
                    {extraOptions.map((option: any) => (
                      <Box
                        as='span'
                        key={option.text}
                        p='5px'
                        border='.5px solid teal'
                        bg='white'
                        color='teal.400'
                        mr='10px'
                        rounded='lg'
                        cursor='pointer'
                      >
                        {option.text}
                      </Box>
                    ))}
                  </Flex>
                  <Button colorScheme='blue' mr={'auto'} type='submit'>
                    Create
                  </Button>
                </VStack>
              </chakra.form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
