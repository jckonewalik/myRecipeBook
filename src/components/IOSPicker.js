import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AppOutputText from '../components/AppOutputText';
import { translate } from '../translations';
const { height } = Dimensions.get('window');

const IOSPicker = ({ testID, label, outputValue, options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState(`${translate('select')}`);
  let localeOutputValue = translate(outputValue);
  localeOutputValue = localeOutputValue.includes('missing')
    ? outputValue
    : localeOutputValue;

  const onModalSelect = () => {
    if (pickerValue !== `${translate('select')}`) {
      onSelect(pickerValue);
      setModalVisible(false);
    }
  };

  const onModalCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <TouchableOpacity
        testID={`${testID}ModalPress`}
        onPress={() => setModalVisible(true)}
      >
        <View>
          <AppOutputText
            testID={`${testID}Output`}
            label={label}
            value={localeOutputValue}
          />
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={onModalCancel}>
          <View style={styles.headerModalContainer} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalOptions}>
            <TouchableOpacity onPress={onModalCancel}>
              <Text style={styles.pickerOptions}>{translate('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={`${testID}Select`}
              onPress={onModalSelect}
            >
              <Text style={styles.pickerOptions}>{translate('select')}</Text>
            </TouchableOpacity>
          </View>
          <Picker
            testID={testID}
            selectedValue={pickerValue}
            onValueChange={(itemValue) => setPickerValue(itemValue)}
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
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  headerModalContainer: {
    height: height * 0.6,
  },
  modalContainer: {
    backgroundColor: '#ddd',
    elevation: 5,
  },
  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    padding: 18,
  },
  pickerOptions: {
    fontFamily: 'Roboto_900Black',
  },
});

export default IOSPicker;
