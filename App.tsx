import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigatior } from './src/navigation/Navigation';
import { PermissionsProvider } from './src/context/PermissionContext';

const App = () => {

  const AppState = ({ children}: any) => {

    return <PermissionsProvider>
      { children }
    </PermissionsProvider>
  }
  return (
    <NavigationContainer>
      <AppState>
        <Navigatior />
      </AppState>
    </NavigationContainer>
  );
}
export default App;
