import {View, StyleSheet, Pressable} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import React, {useRef, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Camera,
  CameraType,
  FlashMode,
  CameraRecordingOptions,
  CameraPictureOptions,
} from 'expo-camera';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {CameraNavigationProp} from '../../types/navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const flashModes = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeToIcon = {
  [FlashMode.off]: 'flash-off',
  [FlashMode.on]: 'flash-on',
  [FlashMode.auto]: 'flash-auto',
  [FlashMode.torch]: 'highlight',
};

const CameraScreen = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const inset = useSafeAreaInsets();

  const camera = useRef<Camera>(null);
  const navigation = useNavigation<CameraNavigationProp>();
  // // In the case of android

  //   const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

  //   useEffect(() => {
  //     const getPermission = async () => {
  //       const cameraPermission = await Camera.requestCameraPermissionsAsync();
  //       const microphonePermission =
  //         await Camera.requestMicrophonePermissionsAsync();
  //       setHasPermissions(
  //         cameraPermission.status === 'granted' &&
  //           microphonePermission.status === 'granted',
  //       );
  //     };
  //   }, []);

  //   if (hasPermissions === null) {
  //     return <Text>Loading...</Text>;
  //   }

  //   if (hasPermissions === false) {
  //     return <Text>No camera access</Text>;
  //   }

  const flipCamera = () => {
    setCameraType(currentCameraType =>
      currentCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back,
    );
  };

  const flipFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    const nextIndex =
      currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  const takePicture = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }

    const options: CameraPictureOptions = {
      quality: 0.7,
      base64: false,
      skipProcessing: true,
    };

    const result = await camera.current.takePictureAsync(options);
    navigation.navigate('Create', {
      image: result.uri,
    });
  };

  const startRecording = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }

    const options: CameraRecordingOptions = {
      quality: Camera.Constants.VideoQuality['480p'],
      maxDuration: 60,
      maxFileSize: 10 * 1024 * 1024,
      mute: false,
    };
    setIsRecording(true);
    try {
      const result = await camera.current.recordAsync(options);

      navigation.navigate('Create', {
        image: result.uri,
      });
    } catch (e) {
      console.log(e);
    }
    setIsRecording(false);
  };

  const stopRecording = () => {
    if (isRecording) {
      camera.current?.stopRecording();
      setIsRecording(false);
    }
  };

  const navigateToCreateScreen = () => {
    navigation.navigate('Create', {
      images: [
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg',
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
      ],
    });
  };

  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'mixed', selectionLimit: 3},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          const params: {image?: string; images?: string[]; video?: string} =
            {};
          if (assets.length === 1) {
            const field = assets[0].type?.startsWith('video') 
            ? 'video' 
            : 'image';
            params[field] = assets[0].uri;
          } else if (assets.length > 1) {
            params.images = assets.map(asset => asset.uri) as string[];
          }

          navigation.navigate('Create', params);
        }
      },
    );
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.page}>
      <Camera
        ref={camera}
        style={styles.camera}
        type={cameraType}
        flashMode={flash}
        ratio="4:3"
        onCameraReady={() => setIsCameraReady(true)}
      />

      <View style={[styles.buttonsContainer, {top: inset.top + 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <MaterialIcons
          onPress={flipFlash}
          name={flashModeToIcon[flash]}
          size={30}
          color={colors.white}
        />
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 1}]}>
        <MaterialIcons
          onPress={openImageGallery}
          name="photo-library"
          size={30}
          color={colors.white}
        />
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
            <View
              style={[
                styles.circle,
                {backgroundColor: isRecording ? colors.accent : colors.white},
              ]}
            />
          </Pressable>
        )}
        <MaterialIcons
          onPress={flipCamera}
          name="flip-camera-ios"
          size={30}
          color={colors.white}
        />
        <MaterialIcons
          onPress={navigateToCreateScreen}
          name="arrow-forward-ios"
          size={30}
          color={colors.white}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',

    position: 'absolute',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});

export default CameraScreen;
