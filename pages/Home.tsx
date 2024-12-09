import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import { CustomButton } from '../components/CustomButton'
import { StackParamList } from '../Navigate'
import { SafeAreaView } from 'react-native-safe-area-context'
import { gstyle } from '../gstyle'
import { useAuth } from '../hooks/useAuth'
import { StackScreenProps } from '@react-navigation/stack'

export const Home = ({navigation} : StackScreenProps<StackParamList, 'Home'>) => {
  const {user} = useAuth()
  
  return (
    <View style={gstyle.container}>
      <SafeAreaView>
      <Text style={styles.title}>SPEED MATH</Text>
        <View style={styles.buttonContainer}>
          <CustomButton text='Начать' backgroundColor='#47A76A' onPressButton={() => navigation.navigate('Game')}/>
          <CustomButton text='Таблица лидеров' backgroundColor='#47A76A' onPressButton={() => user ? navigation.navigate('Leaderboard') : navigation.navigate('ProfileGuest')}/>
          <CustomButton text='Профиль' backgroundColor='#47A76A' onPressButton={() => user ? navigation.navigate('Profile') : navigation.navigate('ProfileGuest')}/>
          <Image 
            source={require('../assets/home1.png')}
            style={[styles.image, {top: -100, left: 30}]}
          />
          <Image 
            source={require('../assets/home2.png')}
            style={[styles.image, {top: -120, left: 200}]}
          />
          <Image 
            source={require('../assets/home3.png')}
            style={[styles.image, {bottom: -120, left: 220}]}
          />
          <Image 
            source={require('../assets/home4.png')}
            style={[styles.image, {bottom: -200, left: 120}]}
          />
          <Image 
            source={require('../assets/home5.png')}
            style={[styles.image, {bottom: -120, left: 30}]}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5',
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#3C8E5A',
    marginTop: '5%',
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: '50%',
    display: 'flex',
    gap: 20,
    width: '100%',
    alignItems: 'center'
  },
  image: {
    width: 79,
    height: 79,
    position: 'absolute'
  }
});
