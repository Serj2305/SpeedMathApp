import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native'
import { StackParamList } from '../Navigate'
import { gstyle } from '../gstyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '../components/BackButton'
import { DocumentData } from 'firebase/firestore'
import { editUser, getUserById } from '../dbService'
import { useAuth } from '../hooks/useAuth'
import { Loader } from '../components/Loader'
import { CustomButton } from '../components/CustomButton'
import { Form, IData } from '../components/Form'
import * as ImagePicker from 'expo-image-picker';
import { updatePassword } from 'firebase/auth'
import { saveImageLocally } from '../utils/saveImage'
import * as FileSystem from 'expo-file-system';

export const EditProfile = ({navigation}: StackScreenProps<StackParamList, 'EditProfile'>) => {

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<DocumentData | undefined>()
  const [imageUri, setImageUri] = useState<string | null>(null);

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      getUserById(user.uid).then((data) => {
        setUserData(data)
        setIsLoading(false)
      })
    }
  }, [])

  const uploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Разрешение на доступ к библиотеке изображений отклонено!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveDataProfile = async (data: IData) => {
    setIsLoading(true)
    if(user && userData) {
      if(data.password) {
        await updatePassword(user, data.password)
      }
      if(imageUri && data.name) {
        const userDirectory = `${FileSystem.documentDirectory}users/`;
        const destinationPath = `${userDirectory}${user.uid}-${new Date().getTime()}-profile.jpg`;

        await saveImageLocally(imageUri, userDirectory, destinationPath)
        await editUser(user.uid, data.name, destinationPath)
      }
      else if(data.name){
        await editUser(user.uid, data.name)
      }
      setIsLoading(false)
      navigation.navigate('Profile')
    }
  }

  return (
    <View style={gstyle.container}>
      <SafeAreaView>
        <ScrollView>
          <BackButton onPressButton={() => navigation.navigate('Profile')} />
          {isLoading? 
            <Loader/>
            :
            <View style={style.editProfileContainer}>
              <Image
                  style={style.avatar}
                  source={imageUri === null ? 
                    (userData?.avatar.length === 0 ? require('../assets/avatar.png') : { uri: `file://${userData?.avatar}` })
                    : ({uri: imageUri})}
                />
              <CustomButton text='Сменить аватар' backgroundColor='#47A76A' onPressButton={uploadImage}/>
              <Form type='editProfile'
                textButton='Сохранить'
                onSubmit={saveDataProfile}
                styleProp={{marginTop: 20}}
                defaultValues={{name: userData?.displayName}}/>
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}


const style = StyleSheet.create({
  editProfileContainer: {
    width: '85%',
    marginHorizontal: 'auto',
    marginBottom: 20
  },
  avatar: {
    marginHorizontal: 'auto',
    width: 160,
    height: 160,
    borderRadius: 100,
    marginBottom: 20
  },
})