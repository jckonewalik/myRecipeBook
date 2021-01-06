import React, { useContext, useRef } from 'react';
import { Context } from '../contexts/Recipes/RecipesContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import {
  SafeAreaView,
  View,
  Animated,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  PanResponder,
} from 'react-native';
const { height, width } = Dimensions.get('window');

const RecipeDetailsScreen = ({ navigation }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureHandler) => {
        return true;
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
      onPanResponderMove: (event, gestureHandler) => {
        position.setValue({
          y: gestureHandler.dy,
          x: 0,
        });
      },
      onPanResponderRelease: () => {
        const open = position.y._value < -height * 0.1;
        position.flattenOffset();
        Animated.spring(position, {
          toValue: { y: open ? -height * 0.4 : 0, x: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  const getCardStyle = () => {
    const translateY = position.y.interpolate({
      inputRange: [-height, 0, height],
      outputRange: [-height, 0, 10],
      extrapolate: 'clamp',
    });
    return {
      transform: [{ translateY }],
      ...styles.detailsContainer,
    };
  };
  const { state } = useContext(Context);
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 1,
          marginLeft: 20,
          marginTop: 30,
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-backspace" size={30} color="#37426B" />
      </TouchableOpacity>
      <Image
        style={styles.thumb}
        source={{ uri: state.selectedRecipe.imageUrl }}
      />
      <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
        <View style={styles.detailsHeader}>
          <Text style={styles.recipeTitle}>{state.selectedRecipe.title}</Text>
          <Text
            style={styles.recipePortions}
          >{`${state.selectedRecipe.portions} ${state.selectedRecipe.portionUnit}`}</Text>
        </View>
        <View style={styles.resizeContainer}>
          <TouchableOpacity>
            <FontAwesome name="minus" size={24} color="#37426B" />
          </TouchableOpacity>
          <View style={styles.resizePortionsContainer}>
            <Text style={styles.resizePortionsAmount}>1</Text>
            <Text style={styles.resizePortionsDescription}>receita</Text>
          </View>
          <TouchableOpacity>
            <FontAwesome name="plus" size={24} color="#37426B" />
          </TouchableOpacity>
        </View>
        <View>
          {Object.keys(state.selectedRecipe.steps).map((key) => (
            <Step
              key={key}
              stepName={key}
              ingredients={state.selectedRecipe.steps[key].ingredients}
            />
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const Step = ({ stepName, ingredients = [] }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.steps}>{stepName}</Text>
      {ingredients.map((ingredient) => (
        <Text style={styles.ingredients} key={ingredient.ingredient}>
          {ingredient.amount}
          {ingredient.unit} - {ingredient.ingredient}
        </Text>
      ))}
    </View>
  );
};

const fontBold = {
  color: '#37426B',
  fontFamily: 'Roboto_900Black',
  fontSize: 20,
};

const styles = StyleSheet.create({
  droidSafeArea: {
    position: 'relative',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  thumb: {
    resizeMode: 'cover',
    height: height * 0.5,
  },
  detailsContainer: {
    height: height,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  detailsHeader: {
    marginTop: 30,
  },
  recipeTitle: {
    ...fontBold,
  },
  recipePortions: {
    color: '#7895A1',
    fontFamily: 'Roboto_900Black',
    fontSize: 15,
  },
  resizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  resizePortionsContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resizePortionsAmount: {
    ...fontBold,
  },
  resizePortionsDescription: {
    ...fontBold,
    fontSize: 12,
  },
  steps: {
    ...fontBold,
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
  },
  ingredients: {
    marginTop: 10,
    fontFamily: 'Roboto_400Regular',
    color: '#7895A1',
    fontSize: 15,
  },
});

export default RecipeDetailsScreen;
