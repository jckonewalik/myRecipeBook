import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Context } from '../contexts/NewRecipe/NewRecipeContext';
import AppListItem from './AppListItem';

const StepInstructionsList = ({ stepName, instructions }) => {
  const { removeInstruction } = useContext(Context);
  const onRemoveInstruction = ({ stepName, description }) => {
    removeInstruction({ stepName, description });
  };

  return (
    <View style={styles.instructionsContainer}>
      <Text style={styles.stepName}>{stepName}</Text>
      <FlatList
        data={instructions}
        keyExtractor={(item) => item.description}
        renderItem={({ item }) => (
          <AppListItem
            textLimit={100}
            style={styles.itemText}
            text={`${item.description}`}
            onRemove={() =>
              onRemoveInstruction({ stepName, description: item.description })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  instructionsContainer: { marginTop: 10 },
  stepName: {
    fontFamily: 'Roboto_900Black',
    fontSize: 20,
    color: '#37426B',
  },
  ingredientsContainer: {
    marginTop: 10,
  },
  itemText: {
    fontSize: 15,
  },
});

export default StepInstructionsList;
