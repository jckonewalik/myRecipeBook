import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context } from '../contexts/Recipes/RecipesContext';
import AppListItem from './AppListItem';
import colors from '../constants/colors';

const StepInstructionsList = ({ stepName, instructions = [] }) => {
  console.log('StepInstructionsList rendered');

  const { removeInstruction } = useContext(Context);
  const onRemoveInstruction = ({ stepName, description }) => {
    removeInstruction({ stepName, description });
  };

  return (
    <View style={styles.instructionsContainer}>
      <Text style={styles.stepName}>{stepName}</Text>
      {instructions.map((item) => (
        <AppListItem
          key={item.description}
          textLimit={100}
          style={styles.itemText}
          text={`${item.description}`}
          onRemove={() =>
            onRemoveInstruction({ stepName, description: item.description })
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  instructionsContainer: { marginTop: 10 },
  stepName: {
    fontFamily: 'Roboto_900Black',
    fontSize: 20,
    color: colors.primaryColor,
  },
  itemText: {
    fontSize: 15,
  },
});

export default StepInstructionsList;
