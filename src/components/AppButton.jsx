import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const AppButton = ({ secondary = false, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={secondary ? styles.containerSecondary : styles.containerPrimary}
      >
        <Text style={secondary ? styles.textSecondary : styles.textPrimary}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerSecondary: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#37426B',
  },
  containerPrimary: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#37426B',
  },
  textPrimary: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto_900Black',
  },
  textSecondary: {
    color: '#37426B',
    fontSize: 14,
    fontFamily: 'Roboto_900Black',
  },
});

export default AppButton;
