import React, { useEffect, useContext, useRef } from 'react';
import { Context } from '../contexts/Recipes/RecipesContext';
import {
  SafeAreaView,
  View,
  Animated,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import ResizePortionContainer from '../components/ResizePortionContainer';
import DetailsTabView from '../components/DetailsTabView';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import colors from '../constants/colors';
const { height, width } = Dimensions.get('window');

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;

  const position = useRef(new Animated.ValueXY({ x: 0, y: -(width * 0.07) }))
    .current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureHandler) => {
        return position.y._value !== -(width * 0.07) ? false : true;
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
          toValue: { y: open ? -height * 0.4 : -(width * 0.07), x: 0 },
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
  const {
    state,
    loadRecipe,
    increaseRecipeSize,
    decreaseRecipeSize,
    recipeRepository,
  } = useContext(Context);

  useEffect(() => {
    recipeRepository.findById(recipeId, loadRecipe);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {state.loadingRecipe ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      ) : (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              Animated.spring(position, {
                toValue: { y: -(width * 0.07), x: 0 },
                useNativeDriver: false,
              }).start();
            }}
          >
            {state.selectedRecipe.imageUrl ? (
              <Image
                style={styles.thumb}
                source={{ uri: state.selectedRecipe.imageUrl }}
              />
            ) : (
              <View style={styles.noThumb}>
                <Image source={require('../../assets/no-image.png')} />
              </View>
            )}
          </TouchableWithoutFeedback>
          <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
            <View style={styles.detailsHeader}>
              <Text style={styles.recipeTitle}>
                {state.selectedRecipe.title}
              </Text>
              <Text style={styles.recipePortions}>{`${
                state.selectedRecipe.portions * state.totalRecipes
              } ${state.selectedRecipe.portionUnit}`}</Text>
            </View>
            <ResizePortionContainer
              totalRecipes={state.totalRecipes}
              onPressMinus={decreaseRecipeSize}
              onPressPlus={increaseRecipeSize}
            />
            <DetailsTabView
              recipe={state.selectedRecipe}
              totalRecipes={state.totalRecipes}
            />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

const fontBold = {
  color: colors.primaryColor,
  fontFamily: 'Roboto_900Black',
  fontSize: 20,
};

const styles = StyleSheet.create({
  thumb: {
    resizeMode: 'cover',
    height: height * 0.5,
  },
  noThumb: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.5,
  },
  detailsContainer: {
    height: height * 0.9,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
  },
  detailsHeader: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  recipeTitle: {
    ...fontBold,
  },
  recipePortions: {
    color: '#7895A1',
    fontFamily: 'Roboto_900Black',
    fontSize: 15,
    marginTop: 10,
  },
});

export default RecipeDetailsScreen;
