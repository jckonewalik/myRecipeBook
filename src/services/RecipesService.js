import * as FileSystem from 'expo-file-system';
import { insert } from '../database/repository/RecipesRepository';
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
      await FileSystem.copyAsync({
        from: imageUrl,
        to: newFileUri,
      });
    }

    insert({
      imageUrl: newFileUri,
      title,
      portions,
      portionUnit,
      calories,
      steps,
    });
    callback && callback();
  } catch (err) {
    console.error('Error trying to save the recipe.', err);
  }
};
