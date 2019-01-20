//Line 91 has the thing you are looking for Omar
process.nextTick = setImmediate;
import * as React from 'react';
import {
  Dimensions,
  Alert,
  Image,
  Text,
  ScrollView,
  View,
  StyleSheet,
  Picker,
  ImageBackground,
} from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-paper';

import QuizObject from './components/QuizObject';
import CamButton from './components/CamButton';
import Cam from './components/Cam';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cameraOn: false,
      loading: false,
      language: 'en',
      quizObject: [
      ],
    };
  }

  toggleCam = e => {
    this.setState({
      cameraOn: !this.state.cameraOn,
    });
  };

  pushItem = newItem => {
    this.setState({
      quizObject: [...this.state.quizObject, { ...newItem, id: this.state.quizObject.length }],
    });
    this.setLoading(false);
    console.log(newItem);
  };

  popItem = i => {
    let newQuiz = this.state.quizObject.filter(item => item.id !== i);
    this.setState({
      quizObject: newQuiz,
    });
  };

  setLoading = s => {
    this.setState({
      loading: s,
    });
    if (!s) this.setState({ cameraOn: false });
  };

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground 
        source={require('./assets/icons/main-bg.png')}
        style={{resizeMode: 'cover', height:'110%'}}
      >
        {this.state.loading ? (
          <Image
            source={require('./assets/icons/loading-icon.gif')}
            style={{
              marginTop: 80,
              maxHeight: 150,
              height: 60,
              width: '100%',
              resizeMode: 'cover',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'transparent',
            }}
          />
        ) : (
          <ScrollView>
            <Image
              style={{
                flex: 1,
                marginTop: 80,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                height: 120,
                width: '80%',
              }}
              source={require('./assets/icons/main-logo.png')}
            />
            <Text>{this.state.quizObject.length * 100}</Text>
            {this.state.quizObject.length ? (
              this.state.quizObject.map((item, i) => (
                <QuizObject
                  item={item}
                  key={i}
                  popItem={this.popItem.bind(this)}
                />
              ))
            ) : (
              <View style={styles.container}>
               <Picker
                  style={{width: 300, alignItems: 'center', marginLeft: 80, color: 'white'}}
                  selectedValue={this.state.language}
                  onValueChange={(lang) => this.setState({language: lang}, console.log(lang))}>
                  <Picker.Item label="Arabic (عربى)" value="ar" />
                  <Picker.Item label="English (English)" value="en" />
                  <Picker.Item label="French (Français)" value="fr" />
                  <Picker.Item label="Mandarin (普通话)" value="zh" />
                  <Picker.Item label="Spanish (Español)" value="es" />
                </Picker>
                <Card style={styles.empty}>
                  <Text style={styles.emptyText}>Collect more items!</Text>
                </Card>
              </View>
            )}
          </ScrollView>
        )}
        <View
          style={
            this.state.cameraOn
              ? { height: Dimensions.get('window').height }
              : { height: 150 }
          }
        >
          {this.state.cameraOn ? (
            <Cam
              language={this.state.language}
              pushItem={this.pushItem.bind(this)}
              toggle={this.toggleCam.bind(this)}
              setLoading={this.setLoading.bind(this)}
              style={{ flex: 3 }}
            />
          ) : (
            <CamButton
              setLoading={this.toggleCam.bind(this)}
              toggle={this.toggleCam.bind(this)}
            />
          )}
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    //alignItems: 'center'
    opacity: 1,
  },
  empty: {
    marginTop: Dimensions.get('window').height / 4,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 50,
    alignContent: 'center',
    width: '80%',
  },
  emptyText: {
    fontSize: 18,
    marginLeft: Dimensions.get('window').width / 2 - 75,
    fontWeight: 'bold',
    marginLeft: 120,
  },
});
