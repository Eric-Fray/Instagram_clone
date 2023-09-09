import 'react-native-get-random-values';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import AuthContextProvider from './src/Contexts/AuthContext';
import Client from './src/apollo/Client';
import {MenuProvider} from 'react-native-popup-menu';

const updatedConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: 'notjustphotos://',
    redirectSignOut: 'notjustphotos://',
  },
};

Amplify.configure(updatedConfig);

const App = () => {
  return (
    <AuthContextProvider>
      <SafeAreaView style={styles.app}>
        <MenuProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
            style={{flex: 1}}>
            <Client>
              <Navigation />
            </Client>
          </KeyboardAvoidingView>
        </MenuProvider>
      </SafeAreaView>
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
