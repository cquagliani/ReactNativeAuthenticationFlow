import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text}) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        fontSize: 16,
    },
})