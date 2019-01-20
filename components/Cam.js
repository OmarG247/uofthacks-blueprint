import React from 'react';

import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Camera, Permissions } from 'expo';

export default class Cam extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      this.props.setLoading(true);
      const photo = await this.camera.takePictureAsync({
        base64: true,
        ratio: '1:1',
      });
      const { uri, base64 } = photo;

      let myresponse = await fetch('https://jqwotos.lib.id/uofthacks-blueprint@0.0.0/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: base64,
      language: this.props.language,
    }),
  })

  let myNewResponse = await myresponse.json()

  let myactualdata = await JSON.parse(myNewResponse)

  await this.props.pushItem({
    sourceText: myactualdata.sourceText,
    sourceLanguage: "English",
    targetLanguage: this.props.language,
    targetText: myactualdata.targetText,
    url : uri
  })

  await this.props.setLoading(false)    
     
  };
}

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  marginTop: 20,
                  flexDirection: 'column-reverse',
                }}
                onPress={() => this.props.toggle()}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'red' }}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={this.snap}
              style={{
                height: 50,
                width: 50,
                marginBottom: 50,
                opacity: 0.7,
                borderRadius: 10,
                backgroundColor: 'transparent',
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              <Text />
            </TouchableOpacity>
          </Camera>
        </View>
      );
    }
  }
}
