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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
import { Constants } from 'expo';
import { Card } from 'react-native-paper';
const screenWidth = Dimensions.get('window').width
const chartConfig = {
  backgroundGradientFrom: '#001871',
  backgroundGradientTo: '#001871',
  color: (opacity = 100) => `rgba(244, 80, 4, ${opacity})`
}

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
      data : {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [ 300, 400, 200, 300, 100, 200]
        }]
      }
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
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                height: 120,
                width: '80%',
                padding: 80,
                resizeMode: 'contain',
              }}
              source={require('./assets/icons/main-logo.png')}
            />
            <Text style={styles.scoreBlue}>Your Score is: {this.state.quizObject.length * 100}/500</Text>
            <Text style={styles.scoreBlue}>Current blueprint being built: {this.state.language}</Text>
            {this.state.quizObject.length ? (
              this.state.quizObject.map((item, i) => (
                <QuizObject
                  item={item}
                  key={i}
                  popItem={this.popItem.bind(this)}
                />
              ))
            ) : (
              <View style={styles.graphStyle}>
               <Picker
                  style={{width: 300, alignItems: 'center', marginLeft: 80, marginBottom: 5, color: 'white'}}
                  selectedValue={this.state.language}
                  onValueChange={(lang) => this.setState({language: lang}, console.log(lang))}>
                  <Picker.Item label="Arabic (عربى) (ar)" value="ar" />
                  <Picker.Item label="English (English) (en)" value="en" />
                  <Picker.Item label="French (Français) (fr)" value="fr" />
                  <Picker.Item label="Spanish (Español) (es)" value="es" />
                  <Picker.Item label="German (Deutsche) (de)" value="de" />
                  <Picker.Item label="Mandarin (普通话)(zh)" value="zh" />
                  <Picker.Item label="Russian (Pусский) (ru)" value="ru" />
                  <Picker.Item label="Greek (Ελληνικά) (el)" value="el" />
                  <Picker.Item label="Finnish (Suomalainen) (fi)" value="fi" />
                  <Picker.Item label="Italian (Italiano) (it)" value="it" />
                  <Picker.Item label="Japanese (日本人) (ja)" value="ja" />
                </Picker>
                        <BarChart
          data={this.state.data}
          width={400}
          height={220}
          chartConfig={chartConfig}
          style = {{color: "#F45004", paddingLeft: 40, paddingRight: 40, backgroundColor: 'transparent'}}
        />

        <Text style={styles.scoreBlue}>Your weekly progress </Text>
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
    justifyContent: 'flex-start',
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
  graphStyle: {
    marginTop: Dimensions.get('window').height / 4,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 50,
    alignContent: 'center',
    width: '80%',
  },
  scoreBlue: {
    fontSize:20,
    color: '#F45004',
    paddingTop: 10,
    paddingBottom :10,
    textAlign: 'center'
  },
  emptyText: {
    fontSize: 18,
    marginLeft: Dimensions.get('window').width / 2 - 75,
    fontWeight: 'bold',
    marginLeft: 120,
  },
  graphStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    //alignItems: 'center'
    opacity: 1,
    marginTop: 10,
  }
});
