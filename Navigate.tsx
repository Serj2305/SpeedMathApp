import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { EditProfile } from './pages/EditProfile'
import { Game } from './pages/Game'
import { Leaderboard } from './pages/Leaderboard'
import { ProfileGuest } from './pages/ProfileGuest'


export type StackParamList = {
  Home: undefined,
  Profile: undefined,
  EditProfile: undefined,
  Game: undefined,
  Leaderboard: undefined,
  ProfileGuest: undefined
}

const Stack = createStackNavigator<StackParamList>()


export const Navigate = () => {
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
