import * as React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';

export default class QuizObject extends React.Component {
  handleTouch = e => {
      this.props.popItem(this.props.item.id)
  };

  render() {
    const {
      imgSrc,
      url,
      name,
      sourceText,
      targetText,
      targetLanguage
    } = this.props.item;
    return (
      <TouchableOpacity style={styles.container} onPress={this.handleTouch}>
        <Card style={styles.container}>
          <View style={styles.container}>
            <View style={{ paddingLeft: 50 }}>
              <Text style={{ fontWeight: 'bold' }}>{name}</Text>
              <Text>
                {sourceText != '--'
                  ? `In english we detected: ${sourceText}\n`
                  : ' '}
              </Text>
              <Text>
                {targetText != '--'
                  ? `In  ${targetLanguage} we detected ${targetText}`
                  : ' '}
              </Text>
              <Text>
                {(!sourceText)
                  ? 'Could not translate due to error'
                  : ' '}
              </Text>
            </View>
            <Image
              source={{ uri: url }}
              style={{
                minWidth: 100,
                maxWidth: 100,
                minHeight: 100,
                maxHeight: 100,
                flex: 1,
                paddingRight: 30,
                borderRadius: 10,
              }}
            />
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 5,
    alignItems: 'flex-start',
    flexDirection: 'row-reverse',
  },
});
