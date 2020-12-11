import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const AppTextInput = ({
  label,
  value,
  keyboardType = 'default',
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        autoCorrect={false}
        onChangeText={onChangeText}
        multiline={multiline}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontFamily: 'Roboto_300Light',
    fontSize: 20,
    color: '#37426B',
  },
  input: {
    paddingVertical: 10,
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    color: '#37426B',
    borderBottomWidth: 0.5,
    borderBottomColor: '#37426B',
  },
});

export default AppTextInput;
