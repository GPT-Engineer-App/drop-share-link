import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Container, VStack, Text, Box, Image, IconButton, Button } from "@chakra-ui/react";
import emailjs from "emailjs-com";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const sendEmail = () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      },
    );
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box {...getRootProps()} border="2px dashed" borderColor="gray.300" padding={4} width="100%" textAlign="center" cursor="pointer">
          <input {...getInputProps()} />
          <Text>Drag & drop some files here, or click to select files</Text>
        </Box>
        <VStack spacing={4} width="100%">
          {files.map((file, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%" padding={4} display="flex" alignItems="center" justifyContent="space-between">
              <Text>{file.name}</Text>
              <IconButton aria-label="Remove file" icon={<FaTrash />} onClick={() => removeFile(file)} />
            </Box>
          ))}
        </VStack>
        <Button colorScheme="blue" onClick={sendEmail}>
          Submit
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
