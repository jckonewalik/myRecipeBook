import React, { useReducer } from 'react';

export default (reducer, actions, services, repositories, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};
    const boundServices = {};
    const boundRepositories = {};
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    for (const key in services) {
      boundServices[key] = services[key];
    }
    for (const key in repositories) {
      boundRepositories[key] = repositories[key];
    }

    return (
      <Context.Provider
        value={{
          state,
          ...boundActions,
          ...boundServices,
          ...boundRepositories,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
