import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { translate } from '../translations';
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
          <Picker.Item
            label={translate('select')}
            value={translate('select')}
          />
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
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 0.5,
  },
  label: {
    fontFamily: 'Roboto_300Light',
    fontSize: 20,
    color: colors.primaryColor,
  },
});

export default IOSPicker;
