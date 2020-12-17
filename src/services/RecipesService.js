import * as FileSystem from 'expo-file-system';
import { insert } from '../database/repository/RecipesRepository';
export const saveOrUpdate = async (
  { id, imageUrl, title, portions, portionUnit, calories, steps },
  callback
) => {
  if (imageUrl) {
    const filePath = imageUrl.split('/');
    const fileName = filePath[filePath.length - 1];
    const newFileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.copyAsync({
      from: imageUrl,
      to: newFileUri,
    });

    insert({
      imageUrl: newFileUri,
      title,
      portions,
      portionUnit,
      calories,
      steps,
    });
    callback && callback();
  }
};
