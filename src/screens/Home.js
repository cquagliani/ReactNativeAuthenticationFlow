import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase'
import CustomButton from '../components/CustomButton';

const Home = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate("Sign In")
        console.log('Logged out');
      })
      .catch(error => {
        // Show an error message
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <CustomButton onPress={handleSignOut} text={"Sign Out"} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5080BF',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})