import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { gstyle } from '../gstyle'
import { BackButton } from '../components/BackButton'
import { StackParamList } from '../Navigate'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'
import { useAuth } from '../hooks/useAuth'


const {user} = useAuth()

export const Profile = ({navigation} : NativeStackScreenProps<StackParamList, 'Profile'>) => {

  return (
    <View style={gstyle.container}>
      <SafeAreaView>
        <BackButton onPressButton={() => navigation.navigate('Home')}/>
      </SafeAreaView>
    </View>
  )
}
