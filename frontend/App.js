import React, { useContext, useEffect } from 'react';
import IbitterProvider, { IbitterContext } from './organisms/providers/IbitterProvider';
import AuthStack from './organisms/auth/AuthStack';
import TimelineStack from './organisms/timeline/TimelineStack';
import TimelineDrawer from './organisms/timeline/TimelineDrawer';
import { StyleSheet, SafeAreaView, LogBox } from 'react-native';
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
      {state.isLoggedIn ? <TimelineDrawer /> : <AuthStack />}
    </>
  );
}

export default function App() {
  /// This warning occurs because the `react-navigation` think we could using
  /// state persistence, deep linking etc. While it is being passed non-serializable
  /// values. However, we are in fact not using any of state persistence, deep linking etc.,
  /// such that we can ignore this log.
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  return (
    <IbitterProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AppScreen />
          <StatusBar style="black" hidden={true} />
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
