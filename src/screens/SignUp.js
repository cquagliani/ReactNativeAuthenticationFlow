import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import { auth } from '../../firebase'

const SignUp = () => {
    // Initialize state for the username and password
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home');
            }
        })

        return unsubscribe;
    }, [])

    const navSignIn = () => {
        navigation.navigate('Sign In');
    }

    // Function to handle creating a username and password
    const handleCreate = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;

                // Show a success message
                alert('Success', 'Account created successfully');
                console.log('Registered with ', user.email);
            })
            .catch(error => {
                // Show an error message
                alert(error.message);
            });
    };

    const handleCheckPasswords = (password, confirmPassword) => {
        if (password === confirmPassword) {
            handleCreate();
        } else {
            error => {
                alert(error.message);
            }
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/icon.png')}
                />
            </View>

            {/* Title */}
            <View style={styles.title}>
                <Text style={styles.titleText}>Welcome to Pop Jot!</Text>
            </View>

            {/* Subtitle */}
            <View style={styles.subtitle}>
                <Text style={styles.subtitleText}>Please enter your information to sign up</Text>
            </View>

            {/* Email and Password buttons */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    autoCapitalize='none'
                    onChangeText={text => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    autoCapitalize='none'
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    autoCapitalize='none'
                    onChangeText={text => setConfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            {/* Sign Up button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleCreate()}
                    style={[styles.button, styles.button]}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            {/* Subtext under the Sign Up button */}
            <View style={styles.subtextContainer}>
                <Text style={styles.subtext}>Already have an account?
                    <Text style={{ fontWeight: 'bold', color: '#5080BF' }} onPress={navSignIn}> Sign In</Text></Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 90,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    logo: {
        resizeMode: "contain",
        marginTop: 0,
        maxHeight: 200,
        maxWidth: 200,
    },
    title: {
        marginBottom: 10,
    },
    titleText: {
        color: '#000000',
        fontWeight: 700,
        fontSize: 32,
    },
    subtitle: {
        marginBottom: 25,
    },
    subtitleText: {
        color: '#7F7F80',
        fontWeight: 700,
        fontSize: 16,
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#F7F7F8',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#5080BF',
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#5080BF',
        marginBottom: 5,
        marginHorizontal: 5,
        width: '100%',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    subtextContainer: {
        marginTop: 10,
    },
    subtext: {
        color: '#7F7F80',
    },
})