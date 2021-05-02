import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
const PrimaryButton = ({ testID, disabled = false, text, onPress }) => {
  const getStyle = () => {
    if (disabled) {
      return { ...styles.container, backgroundColor: '#ddd' };
    }
    return styles.container;
  };
  return (
    <TouchableOpacity testID={testID} disabled={disabled} onPress={onPress}>
      <View testID={`${testID}View`} style={getStyle()}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Roboto_900Black',
  },
});

export default PrimaryButton;
