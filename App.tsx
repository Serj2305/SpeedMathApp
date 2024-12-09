import { BackHandler } from 'react-native';
import { Navigate } from './Navigate';
import { AuthProvider } from './providers/AuthProvider';
import { useEffect } from 'react';

export default function App() {
  
  return (
    <AuthProvider>
      <Navigate />
    </AuthProvider>
  );
}


