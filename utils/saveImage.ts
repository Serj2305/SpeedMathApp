import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export const saveImageLocally = async(imageUri: string, userDirectory: string, destinationPath: string) => {
    try {
        const dirInfo = await FileSystem.getInfoAsync(userDirectory);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(userDirectory, { intermediates: true });
        }
    
        await FileSystem.copyAsync({
          from: imageUri,
          to: destinationPath,
        });
    } catch (error: any) {
        Alert.alert('Error saveImage', error.message)
    }
}