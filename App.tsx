import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import CommentsScreen from './src/screens/CommentsScreen/CommentsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import React from 'react';
import EditProfileScreen from './src/screens/EditProfileScreen';
import PostUploadScreen from './src/screens/PostUploadScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.app}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
        style={{flex: 1}}>
        <View style={styles.app}>
          <PostUploadScreen />
        </View>
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
