import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { gstyle } from '../gstyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../components/BackButton'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'
import { StackParamList } from '../Navigate'
import { Form, IData } from '../components/Form'
import { useAuth } from '../hooks/useAuth'
import { Loader } from '../components/Loader'



export const Login = ({ navigation }: NativeStackScreenProps<StackParamList, 'Login'>) => {
  const {isLoading, login, user} = useAuth()

  const onSubmit = async (data: IData) => {
    const {email, password} = data;
    await login(email, password);
  }

  useEffect(() => {
    if (user) {
      navigation.navigate('Profile');
    }
  }, [user]);

  return (
    <View style={gstyle.container}>
      <SafeAreaView>
        <BackButton onPressButton={() => navigation.navigate('ProfileGuest')} />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Вход</Text>
          {
            isLoading ? <Loader/> : <Form textButton='Войти' onSubmit={onSubmit}/>
          }
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: '25%',
    display: 'flex',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'semibold',
    marginBottom: 12
  }
})