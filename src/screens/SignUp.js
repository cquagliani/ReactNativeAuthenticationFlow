import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import { auth } from '../../firebase'
import CustomButton from '../components/CustomButton'
import DisabledButton from '../components/DisabledButton'

const SignUp = () => {
    const navigation = useNavigation();

    // Initialize state for the username and password
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home');
            }
        })

        return unsubscribe;
    }, [])

    const handleCheckEmail = (text) => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        setUsername(text);
        if (re.test(text) || regex.test(text)) {
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    };

    const checkPasswordValidity = (value) => {
        const isNonWhiteSpace = /^\S*$/;

        if (!isNonWhiteSpace.test(value)) {
            alert('Password must not contain Whitespaces.');
            return 1;
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            alert('Password must have at least one Uppercase Character.');
            return 1;
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            alert('Password must have at least one Lowercase Character.');
            return 1;
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            alert('Password must contain at least one Digit.');
            return 1;
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
            alert('Password must be 8-16 Characters Long.');
            return 1;
        }

        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(value)) {
            alert('Password must contain at least one Special Symbol.');
            return 1;
        }

        return 0;
    };

    // Function to handle creating a username and password
    const handleCreate = async () => {

        if (password == confirmPassword) {
            const checkPassword = checkPasswordValidity(password);

            if (!checkPassword) {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(userCredentials => {
                        const user = userCredentials.user;

                        // Show a success message
                        alert('Success', 'Account created successfully');
                        console.log('Registered with ', user.email);

                        // Clear fields on sign up screen
                        setUsername({ email: null });
                        setPassword({ password: null });
                        setConfirmPassword({ confirmPassword: null });
                    })
                    .catch(error => {
                        // Show an error message
                        alert(error.message);
                    });
            }
        } else {
            alert('Passwords must match.');
        }
    };

    const navSignIn = () => {
        navigation.navigate('Sign In');
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
                <View>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        autoCapitalize='none'
                        onChangeText={text => handleCheckEmail(text)}
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
                    <TouchableOpacity
                        style={styles.wrapperIcon}
                        onPress={() => { password == '' ? setSeePassword(seePassword) : setSeePassword(!seePassword) }}>
                        <Image source={seePassword ? require('../assets/Eye.png') : require('../assets/HideEye.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        autoCapitalize='none'
                        onChangeText={text => setConfirmPassword(text)}
                        style={styles.input}
                        secureTextEntry={seeConfirmPassword}
                    />
                    <TouchableOpacity
                        style={styles.wrapperIcon}
                        onPress={() => { confirmPassword == '' ? setSeePassword(seeConfirmPassword) : setSeeConfirmPassword(!seeConfirmPassword) }}>
                        <Image source={seePassword ? require('../assets/Eye.png') : require('../assets/HideEye.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.subtextContainer}>
                    <Text style={styles.subtextDisclaimer}>By signing up, you agree to our
                        <Text style={{ fontWeight: 'bold', color: '#5080BF' }}> Terms of Service </Text>
                        and our
                        <Text style={{ fontWeight: 'bold', color: '#5080BF' }}> Privacy Policy</Text>
                    </Text>
                </View>
            </View>

            {/* Sign Up button */}
            {email == '' || password == '' || confirmPassword == '' || checkValidEmail == true ? (
                <DisabledButton text={"Sign Up"} />
            ) : (
                <CustomButton onPress={handleCreate} text={"Sign Up"} />
            )}

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
    wrapperIcon: {
        position: 'absolute',
        right: 0,
        padding: 13,
    },
    icon: {
        width: 22,
        height: 22,
    },
    subtextContainer: {
        marginTop: 10,
    },
    subtext: {
        color: '#7F7F80',
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