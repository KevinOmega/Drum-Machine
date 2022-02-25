import React from "react";
import { useGlobalContext } from "./context";
import Pad from "./Pad";

const DrumPad = () => {
  const { buttons } = useGlobalContext();

  return (
    <div className="drum-pad">
      {buttons.map((item) => (
        <Pad {...item} />
      ))}
    </div>
  );
};

export default DrumPad;
