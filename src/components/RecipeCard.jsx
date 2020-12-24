import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

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
      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <View style={styles.editContainer}>
            <FontAwesome name="pencil" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.deleteContainer}>
            <FontAwesome name="trash" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    marginVertical: 10,
  },
  descriptionContainer: {
    flex: 1,
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
    marginVertical: 10,
    marginLeft: 10,
  },
  image: {
    height: 100,
    width: 100,
  },
  optionsContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  deleteContainer: {
    backgroundColor: '#c40000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
  },
  editContainer: {
    backgroundColor: '#2ab300',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
  },
});

export default RecipeCard;
