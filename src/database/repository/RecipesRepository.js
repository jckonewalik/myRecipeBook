import db from '../Connection';

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'create table if not exists recipes (id integer primary key not null, imageUrl text, title text, portions numeric, portionUnit text, calories numeric, steps text);'
    );
  });
};

export const insert = ({ title, portions, portionUnit, calories, steps }) => {
  db.transaction((tx) => {
    tx.executeSql(
      'insert into recipes (title, portions, portionUnit, calories, steps) values (?, ?, ?, ?, ?)',
      [title, portions, portionUnit, calories, JSON.stringify(steps)]
    );
  });
};
