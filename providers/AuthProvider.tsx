import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, FC, useEffect, useMemo, useState } from "react";
import { auth, db, login, logout, register } from "../firebase";
import { Alert } from "react-native";
import { addDoc, doc, setDoc } from "firebase/firestore";


interface IContext {
  user: User | null
  isLoading: boolean
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider:FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const registerHandler = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { user } = await register(email, password)

      const userDocRef = doc(db, "users", user.uid);
      
      await setDoc(userDocRef, {
        displayName: 'NO NAME',
        times: [],
        accuracy: [],
        avatar: ''
      })
      
    } catch (error: any) {
      Alert.alert('Error reg', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (error: any) {
      Alert.alert('Error login', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const logoutHandler = async () => {
    setIsLoading(true)
    try {
      await logout()
    } catch (error: any) {
      Alert.alert('Error logout', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => onAuthStateChanged(auth, user => {
      setUser(user || null)
      setIsLoadingInitial(false)
    }),
    []
  )

  const value = useMemo(() => ({
    user,
    isLoading,
    login: loginHandler,
    register: registerHandler,
    logout: logoutHandler
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>
    {!isLoadingInitial && children}
  </AuthContext.Provider>
}