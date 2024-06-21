import React, { useState, useContext, createContext } from 'react';
import { spotlight, type SpotlightActionData } from '@mantine/spotlight';

interface SpotlightContextValue {
  actions: SpotlightActionData[];
  setSpotlightActions: (actions: SpotlightActionData[]) => void;
  openSpotlight: () => void;
}

const SpotlightContext = createContext<SpotlightContextValue>({
  actions: [],
  setSpotlightActions: () => {},
  openSpotlight: () => {},
});

export const ProvideSpotlight = ({ children }: { children: React.ReactNode }) => {
  const [actions, setActions] = useState<SpotlightActionData[]>([]);

  const value = {
    actions,
    setSpotlightActions: setActions,
    openSpotlight: spotlight.open,
  };

  return (
    <SpotlightContext.Provider value={value}>{children}</SpotlightContext.Provider>
  );
};

export const useSpotlight = () => useContext(SpotlightContext);
