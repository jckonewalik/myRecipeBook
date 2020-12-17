import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text
          style={styles.subTitle}
        >{`${recipe.portions} ${recipe.portionUnit}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    color: '#37426B',
    fontFamily: 'Roboto_900Black',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 15,
    color: '#7895A1',
    fontFamily: 'Roboto_900Black',
  },
  imageContainer: {
    marginRight: 20,
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default RecipeCard;
