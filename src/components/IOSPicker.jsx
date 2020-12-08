import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppOutputText from '../components/AppOutputText';
const { height } = Dimensions.get('window');

const IOSPicker = ({ label, outputValue, options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState('');

  const onModalSelect = () => {
    onSelect(pickerValue);
    setModalVisible(false);
  };

  const onModalCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View>
          <AppOutputText label={label} value={outputValue} />
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalOptions}>
            <TouchableOpacity onPress={onModalCancel}>
              <Text style={styles.pickerOptions}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onModalSelect}>
              <Text style={styles.pickerOptions}>Selecionar</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={pickerValue}
            onValueChange={(itemValue) => setPickerValue(itemValue)}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: height * 0.6,
    height: height * 0.4,
    backgroundColor: '#ddd',
    elevation: 5,
  },
  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 18,
  },
  pickerOptions: {
    fontFamily: 'Roboto_900Black',
  },
});

export default IOSPicker;
