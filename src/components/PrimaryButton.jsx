import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const PrimaryButton = ({ disabled = false, text, onPress }) => {
  const getStyle = () => {
    if (disabled) {
      return { ...styles.container, backgroundColor: '#ddd' };
    }
    return styles.container;
  };
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={getStyle()}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#37426B',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto_900Black',
  },
});

export default PrimaryButton;
