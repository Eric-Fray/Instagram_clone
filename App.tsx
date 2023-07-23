import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
  return (
    <SafeAreaView style={styles.app}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        style={{flex: 1}}>
        <Navigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
