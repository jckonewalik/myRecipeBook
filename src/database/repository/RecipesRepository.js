import db from '../Connection';

export const dropTable = () => {
  db.transaction((tx) => {
    tx.executeSql('drop table if exists recipes;');
  });
};
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'create table if not exists recipes (id integer primary key not null, imageUrl text, title text, portions numeric, portionUnit text, calories numeric, multiSteps bit, steps text);'
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      'PRAGMA table_info(recipes)',
      [],
      (_, { rows: { _array } }) => {
        const multiStep = _array.find((column) => column.name === 'multiSteps');
        if (multiStep) {
          tx.executeSql('alter table recipes add column multiSteps bit');
        }
      }
    );
  });
};

export const listAll = (setList, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'select id, imageUrl, title, portions, portionUnit, calories from recipes order by title',
      [],
      (_, { rows: { _array } }) => {
        setList(_array);
      }
    );
  });
  callback && callback();
};

export const findById = (id, loadRecipe, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'select * from recipes where id = ?',
      [id],
      (_, { rows: { _array } }) => {
        const recipe = _array[0];
        recipe.steps = JSON.parse(recipe.steps);
        loadRecipe({ recipe }, callback);
      }
    );
  });
};

export const insert = ({
  imageUrl,
  title,
  portions,
  portionUnit,
  calories,
  multiSteps,
  steps,
}) => {
  db.transaction((tx) => {
    tx.executeSql(
      'insert into recipes (imageUrl, title, portions, portionUnit, calories, multiSteps, steps) values (?, ?, ?, ?, ?, ?, ?)',
      [
        imageUrl,
        title,
        portions,
        portionUnit,
        calories,
        multiSteps,
        JSON.stringify(steps),
      ]
    );
  });
};

export const update = ({
  id,
  imageUrl,
  title,
  portions,
  portionUnit,
  calories,
  steps,
}) => {
  db.transaction((tx) => {
    tx.executeSql(
      'update recipes set imageUrl=?, title=?, portions=?, portionUnit=?, calories=?, steps=? where id=?',
      [
        imageUrl,
        title,
        portions,
        portionUnit,
        calories,
        JSON.stringify(steps),
        id,
      ]
    );
  });
};

export const remove = ({ id }) => {
  db.transaction((tx) => {
    tx.executeSql('delete from recipes where id = ?', [id]);
  });
};
