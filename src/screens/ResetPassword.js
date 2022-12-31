import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import React from 'react'
import firebase from 'firebase/compat/app';
import DisabledButton from '../components/DisabledButton';
import CustomButton from '../components/CustomButton';

const ForgotPassword = () => {

    const [email, setUsername] = useState('');
    const navigation = useNavigation();

    const navSignUp = () => {
        navigation.navigate('Sign Up');
    }

    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("Check you email to reset your password");

                // Clear fields on reset password screen
                setUsername({email: null})
            })
            .catch(error => {
                // Show an error message
                alert(error.message);
            });
    }

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/ForgotPassword.png')}
                />
            </View>

            {/* Title */}
            <View style={styles.title}>
                <Text style={styles.titleText}>Forgot </Text>
                <Text style={styles.titleText}>Password?</Text>
            </View>

            {/* Subtitle text */}
            <View style={styles.subtitle}>
                <Text style={styles.subtitleText}>Don't worry! It happens. Please enter the email associated with your account.</Text>
            </View>

            {/* Email input */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    autoCapitalize='none'
                    onChangeText={text => setUsername(text)}
                    style={styles.input}
                />
            </View>

            {/* Reset Password button */}
            {email == '' ? (
                <DisabledButton text={"Reset Password"} />
            ) : (
                <CustomButton onPress={changePassword} text={"Reset Password"} />
            )}

            {/* Subtext under the Reset button */}
            <View style={styles.subtextContainer}>
                <Text style={styles.subtext}>Don't have an account?
                    <Text style={{ fontWeight: 'bold', color: '#5080BF' }} onPress={navSignUp}> Sign Up</Text></Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword

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
        marginBottom: 10,
    },
    titleText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 32,
    },
    subtitle: {
        marginLeft: 40,
        alignSelf: 'stretch',
        marginBottom: 25,
    },
    subtitleText: {
        color: '#7F7F80',
        fontSize: 14,
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