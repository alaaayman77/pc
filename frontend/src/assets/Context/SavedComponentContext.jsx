// SavedComponentContext.js
import React, { createContext, useState } from "react";

export const SavedComponentsContext = createContext();

export const SavedComponentsProvider = ({ children }) => {
  const [savedComponents, setSavedComponents] = useState({});

  return (
    <SavedComponentsContext.Provider
      value={{ savedComponents, setSavedComponents }}
    >
      {children}
    </SavedComponentsContext.Provider>
  );
};
