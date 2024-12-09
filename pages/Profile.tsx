import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, TouchableOpacity, View, Image, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { gstyle } from '../gstyle'
import { BackButton } from '../components/BackButton'
import { StackParamList } from '../Navigate'
import { CustomButton } from './../components/CustomButton';
import { useAuth } from '../hooks/useAuth'
import { StackScreenProps } from '@react-navigation/stack'
import { Loader } from '../components/Loader'
import { getUserById } from '../dbService'
import { DocumentData } from 'firebase/firestore'


export const Profile = ({ navigation }: StackScreenProps<StackParamList, 'Profile'>) => {

  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<DocumentData | undefined>()

  const middleTime = useMemo(() => {
    if(userData?.times.length === 0) {
      return 'Вы еще не тренировались'
    }

    return `${userData?.times.reduce((sum: number, value: string) => sum + Number(value), 0)/userData?.times.length} сек`;
  }, [userData])

  const middleAссuracy = useMemo(() => {
    if(userData?.accuracy.length === 0) {
      return 'Вы еще не тренировались'
    }

    return `${userData?.accuracy.reduce((sum: number, value: string) => sum + Number(value), 0)/userData?.accuracy.times.length}%`;
  }, [userData])

  const { logout, user } = useAuth()

  useEffect(() => {
    if (user) {
      getUserById(user.uid).then((data) => {
        setUserData(data)
        setIsLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    if (!user) {
      navigation.navigate('ProfileGuest');
    }
  }, [user]);


  return (
    <View style={gstyle.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={style.buttonContainer}>
            <BackButton onPressButton={() => navigation.navigate('Home')} />
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={style.editImage}>
              <Image
                source={require('../assets/edit-icon.png')}
              />
            </TouchableOpacity>
          </View>
          {
            isLoading ?
              <Loader />
              :
              <View style={style.profileContainer}>
                <Image
                  source={userData?.avatar.length === 0 ? require('../assets/avatar.png'): { uri: `file://${userData?.avatar}` }}
                  style={style.avatar}
                />
                <Text style={style.userName}>{userData?.displayName}</Text>
                <Text style={style.title}>Ваши результаты</Text>
                <View style={style.resultContainer}>
                  <Text style={style.titleResult}>Среднее время</Text>
                  <Text style={style.result}>{middleTime}</Text>
                </View>
                <View style={[style.resultContainer, {marginBottom: 20}]}>
                  <Text style={style.titleResult}>Средняя точность</Text>
                  <Text style={style.result}>{middleAссuracy}</Text>
                </View>
                <CustomButton text='Выйти' backgroundColor='#F05757' onPressButton={() => { logout() }} />
              </View>   
          }
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}


const style = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginBottom: -10
  },
  editImage: {
    paddingTop: 10
  },
  profileContainer: {
    width: '85%',
    marginHorizontal: 'auto',
    marginBottom: 20
  },
  avatar: {
    marginHorizontal: 'auto',
    width: 160,
    height: 160,
    borderRadius: 100,
    marginBottom: 10
  },
  userName: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'semibold',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'semibold'
  },
  resultContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
  },
  titleResult: {
    color: '#8A8A8A',
    fontSize: 26,
    fontWeight: 'semibold',
    textAlign: 'center'
  },
  result: {
    color: '#47A76A',
    fontSize: 36,
    fontWeight: 'semibold',
    textAlign: 'center'
  }
})
