import { useContext, useEffect, useState } from "react";
import React from "react";
import { bankOne, bankTwo } from "./buttons";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [buttons, setButtons] = useState(bankOne);
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolume] = useState(50);
  const [mark, setMark] = useState(true);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    if (mark) {
      setButtons(bankOne);
    } else {
      setButtons(bankTwo);
    }
  }, [mark]);

  return (
    <AppContext.Provider
      value={{
        buttons,
        enabled,
        volume,
        currentId,
        mark,
        setVolume,
        setMark,
        setCurrentId,
        setEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
