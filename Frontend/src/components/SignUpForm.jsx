import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Input,
    FormControl,
    Box,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { createUser } from '../api/api';

const SignUpForm = ({ isOpen, onClose, onUserAdded }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const newUser = { firstName, lastName, email, password };
            await createUser(newUser);
            toast({
                title: "User created.",
                description: "New user has been successfully added.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            onUserAdded(true);
            onClose();
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            toast({
                title: "Error.",
                description: "An error occurred while creating the user.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" />
            <ModalContent
                maxW={{ base: '90%', sm: '80%', md: '500px' }}
                width="auto"
                borderRadius="md"
                boxShadow="md"
                bg="white"
                p={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                my="auto"
            >
                <ModalHeader
                    textAlign="center"
                    fontSize="2xl"
                    fontWeight="bold"
                    borderBottom="1px solid #ddd"
                    p={4}
                >
                    Sign Up
                </ModalHeader>
                <ModalBody p={4}>
                    <VStack spacing={5} align="stretch" width="full">
                        <FormControl isRequired>
                            <Input
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                variant="outline"
                                size="lg"
                                borderColor="gray.300"
                                _placeholder={{ color: 'gray.500' }}
                                borderRadius="md"
                                boxShadow="sm"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <Input
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                variant="outline"
                                size="lg"
                                borderColor="gray.300"
                                _placeholder={{ color: 'gray.500' }}
                                borderRadius="md"
                                boxShadow="sm"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outline"
                                size="lg"
                                borderColor="gray.300"
                                _placeholder={{ color: 'gray.500' }}
                                borderRadius="md"
                                boxShadow="sm"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outline"
                                size="lg"
                                borderColor="gray.300"
                                _placeholder={{ color: 'gray.500' }}
                                borderRadius="md"
                                boxShadow="sm"
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter p={4} borderTop="1px solid #ddd">
                    <Box display="flex" justifyContent="center" width="full">
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleSignUp}
                            size="lg"
                            px={6}
                            py={3}
                            borderRadius="md"
                            fontSize="lg"
                            backgroundColor="#007bff"
                            color="#ffffff"
                            border="none"
                            _hover={{ opacity: 0.8 }}
                            transition="background-color 0.3s"
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            size="lg"
                            px={6}
                            py={3}
                            borderRadius="md"
                            fontSize="lg"
                            borderColor="#ccc"
                            color="#007bff"
                            _hover={{ borderColor: '#007bff', color: '#007bff' }}
                            transition="color 0.3s, border-color 0.3s"
                        >
                            Cancel
                        </Button>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SignUpForm;
