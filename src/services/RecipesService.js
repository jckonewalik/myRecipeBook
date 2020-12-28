import * as FileSystem from 'expo-file-system';
import {
  insert,
  update,
  remove,
} from '../database/repository/RecipesRepository';
export const saveOrUpdate = async (
  { id, imageUrl, title, portions, portionUnit, calories, steps },
  callback
) => {
  try {
    let newFileUri;
    if (imageUrl) {
      const filePath = imageUrl.split('/');
      const fileName = filePath[filePath.length - 1];
      newFileUri = `${FileSystem.documentDirectory}${fileName}`;
      if (imageUrl !== newFileUri) {
        await FileSystem.copyAsync({
          from: imageUrl,
          to: newFileUri,
        });
      }
    }

    if (id) {
      update({
        id,
        imageUrl: newFileUri,
        title,
        portions,
        portionUnit,
        calories,
        steps,
      });
    } else {
      insert({
        imageUrl: newFileUri,
        title,
        portions,
        portionUnit,
        calories,
        steps,
      });
    }
    callback && callback();
  } catch (err) {
    console.error('Error trying to save the recipe.', err);
  }
};

export const deleteRecipe = async ({ id, imageUrl }, callback) => {
  try {
    if (imageUrl) {
      await FileSystem.deleteAsync(imageUrl);
    }

    remove({
      id,
    });
    callback && callback();
  } catch (err) {
    console.error('Error trying to delete the recipe.', err);
  }
};
