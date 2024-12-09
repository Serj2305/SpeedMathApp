import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Alert } from "react-native";


export async function getUserById(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    return userDoc.data()
  } catch (error: any) {
    Alert.alert('Error login', error.message)
  }
}

export async function editUser(userId: string, displayName: string, avatar?: string) {
  try {
    const userDoc = doc(db, 'users', userId);
    if (avatar) {
      await setDoc(userDoc, { avatar, displayName }, { merge: true });
    } else {
      await setDoc(userDoc, { displayName }, { merge: true });
    }

  } catch (error: any) {
    Alert.alert('Error saveData', error.message)
  }

}