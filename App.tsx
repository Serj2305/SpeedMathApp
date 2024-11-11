import { StyleSheet, Text, View } from 'react-native';
import { Navigate } from './Navigate';
import { AuthProvider } from './providers/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Navigate/>  
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5',
  },
});
