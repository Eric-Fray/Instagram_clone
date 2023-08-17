import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "../screens/CameraScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import React from "react";
import { UploadStackNavigatorParamList } from "../types/navigation";
import { View } from "react-native";

const Stack = createNativeStackNavigator<UploadStackNavigatorParamList>();

const UploadStackNavigator = () => {
    return (
        <View style={{flex: 1}}>
        <Stack.Navigator>
            <Stack.Screen name="Camera" component={CameraScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Create" component={CreatePostScreen} />
        </Stack.Navigator>
        </View>
    )
}
export default UploadStackNavigator;