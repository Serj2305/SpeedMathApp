import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { EditProfile } from './pages/EditProfile'
import { Game } from './pages/Game'
import { Leaderboard } from './pages/Leaderboard'
import { ProfileGuest } from './pages/ProfileGuest'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { BackHandler } from 'react-native'


export type StackParamList = {
  Home: undefined,
  Profile: undefined,
  EditProfile: undefined,
  Game: undefined,
  Leaderboard: undefined,
  ProfileGuest: undefined,
  Login: undefined,
  Registration: undefined
}

const Stack = createStackNavigator<StackParamList>()


export const Navigate = () => {

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { return true });
  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Главная', headerShown: false }}
        />
        <Stack.Screen
          name='Game'
          component={Game}
          options={{ title: 'Игра', headerShown: false }}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{ title: 'Профиль', headerShown: false }}
        />
        <Stack.Screen
          name='Leaderboard'
          component={Leaderboard}
          options={{ title: 'Таблица лидеров', headerShown: false }}
        />
        <Stack.Screen
          name='EditProfile'
          component={EditProfile}
          options={{ title: 'Редактирование профиля', headerShown: false }}
        />
        <Stack.Screen
          name='ProfileGuest'
          component={ProfileGuest}
          options={{ title: 'Профиль гостя', headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ title: 'Вход', headerShown: false }}
        />
        <Stack.Screen
          name='Registration'
          component={Registration}
          options={{ title: 'Регистрация', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
