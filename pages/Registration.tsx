import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { gstyle } from '../gstyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../components/BackButton'
import { StackParamList } from '../Navigate'
import { Form, IData } from '../components/Form'
import { useAuth } from '../hooks/useAuth'
import { Loader } from '../components/Loader'
import { StackScreenProps } from '@react-navigation/stack'



export const Registration = ({ navigation }: StackScreenProps<StackParamList, 'Registration'>) => {

    const {isLoading, register, user} = useAuth()

    const onSubmit = async (data: IData) => {
      const {email, password} = data;
      await register(email, password);
    }

    useEffect(() => {
      if (user) {
        navigation.navigate('Profile');
      }
    }, [user]); 

  return (
    <View style={gstyle.container}>
      <SafeAreaView>
        <ScrollView>
          <BackButton onPressButton={() => navigation.navigate('ProfileGuest')} />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Регистрация</Text>
            {
              isLoading ?  <Loader/> : <Form textButton='Зарегистрироваться' onSubmit={onSubmit} type={'registration'}/>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: '20%',
    display: 'flex',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'semibold',
    marginBottom: 12
  }
})
