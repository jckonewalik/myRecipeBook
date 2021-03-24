import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const SecondaryButton = ({ disabled = false, text, onPress }) => {
  const getContainerStyle = () => {
    if (disabled) {
      return { ...styles.container, backgroundColor: '#ddd', borderWidth: 0 };
    }
    return styles.container;
  };
  const getTextStyle = () => {
    if (disabled) {
      return { ...styles.text, color: '#fff' };
    }
    return styles.text;
  };
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={getContainerStyle()}>
        <Text style={getTextStyle()}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
  text: {
    color: colors.primaryColor,
    fontSize: 14,
    fontFamily: 'Roboto_900Black',
  },
});

export default SecondaryButton;
