import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppOutputText from '../components/AppOutputText';
import AppTextInput from '../components/AppTextInput';
import { Context } from '../contexts/NewRecipe/NewRecipeContext';
import { Picker } from '@react-native-picker/picker';

const { height, width } = Dimensions.get('window');
const NewRecipeScreen = ({ navigation }) => {
  const { state, setBasicInfo } = useContext(Context);

  const [title, setTitle] = useState('');
  const [portions, setPortions] = useState('');
  const [portionUnit, setPortionUnit] = useState('');
  const [calories, setCalories] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState('');

  useEffect(() => {
    setTitle(state.title);
    setPortions(state.portions);
    setPortionUnit(state.portionUnit);
    setCalories(state.calories);
    setPickerValue(state.portionUnit);
  }, []);

  const goToSteps = () => {
    setBasicInfo({ title, portions, portionUnit, calories }, () =>
      navigation.navigate('Steps')
    );
  };

  const onModalSelect = () => {
    setPortionUnit(pickerValue);
    setModalVisible(false);
  };

  const onModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rootContainer}>
          <AppTextInput label="Title" value={title} onChangeText={setTitle} />
          <View style={styles.portionsContainer}>
            <View style={styles.protionsInput}>
              <AppTextInput
                label="Portions"
                value={portions}
                keyboardType="numeric"
                onChangeText={setPortions}
              />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.protionsInput}>
                <AppOutputText label="Unit" value={portionUnit} />
              </View>
            </TouchableOpacity>
          </View>
          <AppTextInput
            label="Calories"
            value={calories}
            keyboardType="numeric"
            onChangeText={setCalories}
          />
          <AppButton text="Processos" onPress={() => goToSteps()} />
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
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
                <Picker.Item label="Fatias" value="Fatias" />
                <Picker.Item label="Pedaços" value="Pedaços" />
                <Picker.Item label="Unidades" value="Unidades" />
              </Picker>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  portionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  protionsInput: {
    width: width * 0.4,
  },
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

export default NewRecipeScreen;
