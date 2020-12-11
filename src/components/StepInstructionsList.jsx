import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Context } from '../contexts/NewRecipe/NewRecipeContext';
import AppListItem from './AppListItem';

const StepInstructionsList = ({ stepName, instructions }) => {
  const onRemoveInstruction = ({ stepName, instruction }) => {};

  return (
    <View style={styles.instructionsContainer}>
      <Text style={styles.stepName}>{stepName}</Text>
      <FlatList
        data={instructions}
        keyExtractor={(item) => item.order}
        renderItem={({ item }) => (
          <AppListItem
            text={`${item.description}`}
            onRemove={() =>
              onRemoveInstruction({ stepName, ingredient: item.ingredient })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepName: {
    fontFamily: 'Roboto_900Black',
    fontSize: 20,
    color: '#37426B',
  },
  ingredientsContainer: {
    marginTop: 10,
  },
});

export default StepInstructionsList;
