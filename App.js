import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';

export default class App extends React.Component {
  state = {
    cameraPermission: null
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
      this.setState({
        cameraPermission: status === 'granted'
      })
    );
  }

  render() {
    const { cameraPermission } = this.state;

    return (
      <View style={styles.container}>
        {cameraPermission === null ? (
          <Text>Waiting for permission...</Text>
        ) : cameraPermission === false ? (
          <Text>Permission denied</Text>
        ) : (
          <CameraComponent/>
        )}
      </View>
    );
  }
}

const PHOTO_INTERVAL = 4000;
const FOCUS_TIME = 1000;
const SERVER_URL = "http://192.168.1.45:5005/";

class CameraComponent extends React.Component {
  state = {
    photo: null
  }

  /*uploadPicture = () => {
    return fetch(SERVER_URL, {
      body: JSON.stringify({
        image: this.state.photo.base64
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
  }*/

  /*queuePhoto = () => {
    // In 27 seconds, turn the camera back on
    setTimeout(() => {
      this.setState({ photo: null });
    }, PHOTO_INTERVAL - FOCUS_TIME);

    // In 30 seconds, take the next picture
    setTimeout(this.takePicture, PHOTO_INTERVAL);
  }*/

  takePicture = async () => {
    let photo= await this.camera.takePictureAsync({
      quality: 1,
      base64: true,
      exif: false,
      width : 960,
      height: 1280
    })

    let resizedPhoto = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 640, height: 480 } }],
      { compress: 0.5, format: "jpg", base64: true }
  );

      await console.log({img: resizedPhoto.base64})
  }

  render() {
    const { photo } = this.state;

    return (
      <View style={{ flex: 1, width: '100%' }}>
       {photo ? (
         <ImageBackground
           style={{ flex: 1 }}
           source={{ uri: photo.uri }} />
       ) : (
         <Camera
           style={{ flex: 1 }}
           onPress={this.takePicture}
           type={Camera.Constants.Type.back}
           ref={cam => this.camera = cam}>
           <TouchableOpacity
             style={{ flex: 1 }}
             onPress={this.takePicture}/>
         </Camera>
       )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
