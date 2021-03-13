import React, { useContext } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import FractionOption from '../components/FractionOption';
import { Context } from '../contexts/Recipes/RecipesContext';
import i18n from 'i18n-js';

const SettingsScreen = () => {
  const { width } = Dimensions.get('window');

  const { state, setFractionation } = useContext(Context);
  return (
    <View style={styles.rootContainer}>
      <View style={{ width: width * 0.4 }}>
        <Text style={styles.title}>{i18n.t('settings_fractionation')}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <FractionOption
          label="1"
          value={1}
          onPress={setFractionation}
          selected={state.fractionation === 1}
        />
        <FractionOption
          label="1/2"
          value={0.5}
          onPress={setFractionation}
          selected={state.fractionation === 0.5}
        />
        <FractionOption
          label="1/4"
          value={0.25}
          onPress={setFractionation}
          selected={state.fractionation === 0.25}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  optionsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto_900Black',
    color: '#37426B',
  },
});

export default SettingsScreen;
