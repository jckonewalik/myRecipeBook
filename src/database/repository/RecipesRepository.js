import db from '../Connection';

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'create table if not exists recipes (id integer primary key not null, imageUrl text, title text, portions numeric, portionUnit text, calories numeric, steps text);'
    );
  });
};
export const dropTable = () => {
  db.transaction((tx) => {
    tx.executeSql('drop table recipes');
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

export const insert = ({
  imageUrl,
  title,
  portions,
  portionUnit,
  calories,
  steps,
}) => {
  db.transaction((tx) => {
    tx.executeSql(
      'insert into recipes (imageUrl, title, portions, portionUnit, calories, steps) values (?, ?, ?, ?, ?, ?)',
      [imageUrl, title, portions, portionUnit, calories, JSON.stringify(steps)]
    );
  });
};
