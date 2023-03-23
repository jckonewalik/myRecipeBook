import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../constants/colors';
import { Context } from '../contexts/Recipes/RecipesContext';
import { translate } from '../translations';
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
          <Text style={styles.itemText}>
            {translate('multi_steps_question')}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.itemText}>
            {translate('multi_steps_examples')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <TouchableWithoutFeedback
            testID="multiStepOption"
            onPress={() => setMultiSteps(true)}
          >
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
              <Text style={styles.itemText}>{translate('option_yes')}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            testID="singleStepOption"
            onPress={() => setMultiSteps(false)}
          >
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
              <Text style={styles.itemText}>{translate('option_no')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <PrimaryButton
          testID="checkStepsNavigationButton"
          text={
            multiSteps
              ? translate('recipe_steps')
              : translate('recipe_ingredients')
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
    backgroundColor: colors.white,
  },
  itemText: {
    fontFamily: 'Roboto_300Light',
    color: colors.primaryColor,
    fontSize: 20,
  },
  footerContainer: {
    marginTop: 10,
  },
});

export default CheckStepsScreen;
