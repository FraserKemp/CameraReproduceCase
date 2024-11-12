import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

const App = () => {
  const device = useCameraDevice('back');

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  const {
    hasPermission: hasMicPermission,
    requestPermission: requestMicPermission,
  } = useMicrophonePermission();

  useEffect(() => {
    (async () => {
      try {
        await requestCameraPermission();
        await requestMicPermission();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [requestCameraPermission, requestMicPermission]);

  if (!hasMicPermission || !hasCameraPermission) {
    return (
        <View>
          <Text>No Perms</Text>
        </View>
    );
  }
  if (device == null) {
    return (
        <View>
          <Text>No Device</Text>
        </View>
    );
  }
  return (
      <View style={{flex: 1}}>
        <View style={styles.header} />
        <View style={{ backgroundColor: 'blue'}}>
          <Camera style={styles.cameraStyle} device={device} isActive={true} />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  cameraStyle: {height: 600, width: 350, alignSelf: 'center'},
  header: {height: 100, backgroundColor: 'grey'},
});

export default App;
