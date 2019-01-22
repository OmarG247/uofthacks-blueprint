import * as React from 'react';
import { Card } from 'react-native-paper';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
} from 'react-native';


export default class CamButton extends React.Component {
  render() {
    return (
        <Card style={styles.container}>
          <View style={{...styles.container, backgroundColor: 'transparent', borderRadius: 0, borderColor: 'transparent'}}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.toggle()}>
                <Image
                    style={styles.camIcon}
                    source={require('../assets/icons/loading-icon.png')}
                />
              </TouchableOpacity>
          </View>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    margin: 10,
    alignItems: 'center',
    marginLeft: 140,
    marginBottom: 40,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  button: {
    alignItems: 'center',
    flex: 1, 
    flexDirection: 'row',
    marginTop: -15,
    paddingTop: 100,
    paddingLeft: (Dimensions.get('window').width / 2) - 100,
    paddingBottom: -30,
    paddingRight: (Dimensions.get('window').width / 2) - 100,
  },
  camIcon: {
    height: 70,
    width: 70, 
    marginTop : -260,
  }
});
