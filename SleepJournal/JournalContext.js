import React, { createContext, useState } from 'react';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entryText) => {
    const entry = {
      text: entryText,
      date: new Date().toLocaleDateString(),
    };
    setEntries(prev => [entry, ...prev]);
  };

  const removeEntry = (index) => {
    setEntries(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry, removeEntry }}>
      {children}
    </JournalContext.Provider>
  );
};