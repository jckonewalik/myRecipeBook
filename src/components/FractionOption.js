import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../constants/colors';
import { translate } from '../translations';
const FractionOption = ({ testID, label, value, selected, onPress }) => {
  const getLabelColor = () => {
    return selected ? colors.white : colors.primaryColor;
  };
  const getContainerColor = () => {
    return selected ? colors.primaryColor : colors.white;
  };
  return (
    <TouchableWithoutFeedback testID={testID} onPress={() => onPress(value)}>
      <View
        style={{
          ...styles.optionContainer,
          backgroundColor: getContainerColor(),
        }}
      >
        <Text style={{ ...styles.amount, color: getLabelColor() }}>
          {label}
        </Text>
        <Text style={{ ...styles.label, color: getLabelColor() }}>
          {translate('recipe')}
        </Text>
        <View style={{ ...styles.circle, borderColor: getLabelColor() }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    padding: 20,
  },
  amount: {
    fontFamily: 'Roboto_900Black',
    fontSize: 40,
  },
  label: {
    fontFamily: 'Roboto_900Black',
    fontSize: 20,
  },
  circle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 30,
    marginTop: 10,
  },
});

export default FractionOption;
