import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';
const AppTextInput = ({
  style,
  label,
  value,
  keyboardType = 'default',
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        editable={editable}
        autoCapitalize="none"
        style={{ ...styles.input, ...style }}
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
    color: colors.primaryColor,
  },
  input: {
    paddingVertical: 10,
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    color: colors.primaryColor,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primaryColor,
  },
});

export default AppTextInput;
