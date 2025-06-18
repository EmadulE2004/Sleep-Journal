import React, { createContext, useState } from 'react';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    console.log('Adding entry:', entry);
    setEntries(prev => {
      const newEntries = [entry, ...prev];
      console.log('Updated entries:', newEntries);
      return newEntries;
    });
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
};