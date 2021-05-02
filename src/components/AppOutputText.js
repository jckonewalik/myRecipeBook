import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';
const AppOutputText = ({ testID, label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text testID={testID} style={styles.value}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Roboto_300Light',
    fontSize: 20,
    color: colors.primaryColor,
  },
  value: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    paddingVertical: 10,
    color: colors.primaryColor,
  },
  container: {
    marginTop: 10,
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    color: colors.primaryColor,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primaryColor,
  },
});

export default AppOutputText;
