import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native'
import { auth } from '../../firebase'
import CustomButton from '../components/CustomButton'
import DisabledButton from '../components/DisabledButton'
import PasswordVisibility from '../components/PasswordVisibility'

const Login = () => {
    // Initialize state for the username and password
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Home");
            }
        })

        return unsubscribe;
    }, [])

    // Function to handle logging in with a username and password
    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;

                // Show a success message
                alert('Success', 'Login successful');
                console.log('Logged in with: ', user.email);

                // Clear fields on sign in screen
                setUsername({ email: null });
                setPassword({ password: null })
            })
            .catch(error => {
                // Show an error message
                alert(error.message);
            });
    };

    const navSignUp = () => {
        navigation.navigate('Sign Up');
    }

    const navForgotPassword = () => {
        navigation.navigate('Reset Password')
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/StudentNotebook.png')}
                />
            </View>

            {/* Title */}
            <View style={styles.title}>
                <Text style={styles.titleText}>Sign In</Text>
            </View>

            {/* Email and Password buttons */}
            <View style={styles.inputContainer}>
                <View>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        autoCapitalize='none'
                        onChangeText={text => setUsername(text)}
                        style={styles.input}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='Password'
                        value={password}
                        autoCapitalize='none'
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry={seePassword}
                    />
                    <PasswordVisibility seeWhichPass={seePassword} onPress={() => { password == '' ? setSeePassword(seePassword) : setSeePassword(!seePassword) }} />
                </View>
                <View>
                    <Text style={styles.subtextForgotPassword}>
                        <Text style={{ fontWeight: 'bold', color: '#5080BF' }} onPress={navForgotPassword}>Forgot password?</Text></Text>
                </View>
            </View>

            {/* Sign In buttons */}
            {email == '' || password == '' ? (
                <DisabledButton text={'Sign In'} />

            ) : (
                <CustomButton onPress={handleLogin} text={'Sign In'} />
            )}

            {/* Subtext under the Sign In button */}
            <View style={styles.subtextContainer}>
                <Text style={styles.subtext}>Don't have an account?
                    <Text style={{ fontWeight: 'bold', color: '#5080BF' }} onPress={navSignUp}> Sign Up</Text></Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        justifyContent: 'flex-end'
    },
    logo: {
        resizeMode: "contain",
        marginTop: -30,
        marginBottom: 30,
        maxHeight: 275,
        maxWidth: 275,
    },
    title: {
        marginLeft: 40,
        alignSelf: 'stretch',
        marginBottom: 30,
    },
    titleText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 32,
    },
    subtitle: {
        marginBottom: 25,
    },
    subtitleText: {
        color: '#7F7F80',
        fontWeight: 'bold',
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
    subtextContainer: {
        marginTop: 10,
    },
    subtext: {
        color: '#7F7F80',
    },
    subtextForgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    subtextDisclaimer: {
        color: '#7F7F80',
        fontSize: 11,
    },
    textFailed: {
        alignSelf: 'flex-start',
        color: 'red',
        fontSize: 12
    },
})