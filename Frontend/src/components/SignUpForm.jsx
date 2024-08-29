// src/components/SignUpForm.js
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
    FormLabel,
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
                boxShadow="lg"
                bg="white"
                p={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
                    Sign Up
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={5} align="stretch" width="full">
                        <FormControl isRequired>
                            <FormLabel fontSize="sm">First Name</FormLabel>
                            <Input
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                variant="outline"
                                size="lg"
                                borderColor="gray.300"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontSize="sm">Last Name</FormLabel>
                            <Input
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                variant="outline"
                                size="lg"
                                borderColor="gray.300"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontSize="sm">Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outline"
                                size="lg"
                                borderColor="gray.300"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontSize="sm">Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outline"
                                size="lg"
                                borderColor="gray.300"
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Box display="flex" justifyContent="center" width="full" mt={4}>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleSignUp}
                            size="lg"
                            px={6}
                            py={3}
                            borderRadius="md"
                            fontSize="lg"
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
