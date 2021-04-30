import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import i18n from 'i18n-js';
import { Context } from '../contexts/Recipes/RecipesContext';
import colors from '../constants/colors';

const CheckStepsScreen = ({ navigation }) => {
  const { setMultiSteps: setMultiStepsAction } = useContext(Context);

  const navigate = () => {
    if (multiSteps) {
      setMultiStepsAction(true, () => navigation.navigate('Steps'));
    } else {
      setMultiStepsAction(false, () => navigation.navigate('Ingredients'));
    }
  };
  const getOptionColor = (selected) => {
    return selected ? colors.primaryColor : colors.grayColor;
  };

  const [multiSteps, setMultiSteps] = useState(false);
  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.itemText}>{i18n.t('multi_steps_question')}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.itemText}>{i18n.t('multi_steps_examples')}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <TouchableWithoutFeedback onPress={() => setMultiSteps(true)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 30,
                  backgroundColor: getOptionColor(multiSteps),
                  marginRight: 10,
                }}
              />
              <Text style={styles.itemText}>{i18n.t('option_yes')}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setMultiSteps(false)}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
              }}
            >
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 30,
                  marginRight: 10,
                  backgroundColor: getOptionColor(!multiSteps),
                }}
              />
              <Text style={styles.itemText}>{i18n.t('option_no')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <PrimaryButton
          text={
            multiSteps ? i18n.t('recipe_steps') : i18n.t('recipe_ingredients')
          }
          onPress={() => navigate()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontFamily: 'Roboto_900Black',
    color: colors.primaryColor,
    fontSize: 20,
  },
  footerContainer: {
    marginTop: 10,
  },
});

export default CheckStepsScreen;
