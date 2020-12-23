import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from 'i18n-js';
const IOSPicker = ({ label, value, options, onSelect }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Picker
          selectedValue={value}
          style={{ height: 50 }}
          onValueChange={(itemValue) => onSelect(itemValue)}
        >
          <Picker.Item label={i18n.t('select')} value={i18n.t('select')} />
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderBottomColor: '#37426B',
    borderBottomWidth: 0.5,
  },
  label: {
    fontFamily: 'Roboto_300Light',
    fontSize: 20,
    color: '#37426B',
  },
});

export default IOSPicker;
