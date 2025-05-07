'use client';

import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children, initialData }) {
  const [data, setData] = useState(initialData);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
