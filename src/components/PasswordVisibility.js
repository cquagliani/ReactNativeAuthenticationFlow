import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React from 'react'

const passwordVisibility = ({seeWhichPass, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.wrapperIcon}
            onPress={onPress}>
            <Image source={seeWhichPass ? require('../assets/Eye.png') : require('../assets/HideEye.png')} style={styles.icon} />
        </TouchableOpacity>
    )
}

export default passwordVisibility

const styles = StyleSheet.create({
    wrapperIcon: {
        position: 'absolute',
        right: 0,
        padding: 13,
    },
    icon: {
        width: 22,
        height: 22,
    },
})