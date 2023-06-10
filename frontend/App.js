import React, { useContext } from 'react';
import IbitterProvider, { IbitterContext } from './organisms/providers/IbitterProvider';
import AuthStack from './organisms/auth/AuthStack';
import TimelineStack from './organisms/timeline/TimelineStack';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

/// \brief Represents the `AppScreen` component.
///
/// This component is specifically created to utilize the context provided by the `IbitterContext`.
///
/// \note It is important to use this component within the component tree where the `IbitterContext` provider is available.
///       If the `useContext` hook is used directly inside the `App` component, it will not work as the provider for the context
///       would not have been provided at that level.
///
/// \remarks By using the `AppScreen` component, you can ensure that the `IbitterContext` is available for consumption
///          within the component and its children, allowing the retrieval of data or performing actions based on the
///          context's values.
function AppScreen() {
  const { state } = useContext(IbitterContext);
  return (
    <>
      {state.isLoggedIn ? <TimelineStack /> : <AuthStack />}
    </>
  );
}

export default function App() {
  return (
    <IbitterProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AppScreen />
          <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
    </IbitterProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
