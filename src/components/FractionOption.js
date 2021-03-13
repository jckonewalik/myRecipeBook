import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import i18n from 'i18n-js';

const FractionOption = ({ label, value, selected, onPress }) => {
  const getLabelColor = () => {
    return selected ? '#fff' : '#37426B';
  };
  const getContainerColor = () => {
    return selected ? '#37426B' : '#fff';
  };
  return (
    <TouchableWithoutFeedback onPress={() => onPress(value)}>
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
          {i18n.t('recipe')}
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
    borderColor: '#37426B',
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
    backgroundColor: '#fff',
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 30,
    marginTop: 10,
  },
});

export default FractionOption;
