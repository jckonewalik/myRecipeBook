import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const AppOutputText = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Roboto_300Light',
    fontSize: 20,
    color: '#37426B',
  },
  value: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    paddingVertical: 10,
    color: '#37426B',
  },
  container: {
    flex: 1,
    marginTop: 10,
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    color: '#37426B',
    borderBottomWidth: 0.5,
    borderBottomColor: '#37426B',
  },
});

export default AppOutputText;
