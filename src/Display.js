import React from "react";
import { useGlobalContext } from "./context";

const Display = () => {
  const { currentId, mark, enabled, volume, setVolume, setEnabled, setMark } =
    useGlobalContext();

  const handleOn = () => {
    setEnabled(!enabled);
  };

  const handleMark = () => {
    setMark(!mark);
  };
  return (
    <div id="display">
      <label htmlFor="on/of">ON/OFF</label>
      <div className="interruptor" id="on/of" onClick={handleOn}>
        <button
          className={`interruptor-btn ${enabled ? "on" : "off"}`}
        ></button>
      </div>

      <div className="type">
        <p>{currentId}</p>
      </div>
      <label htmlFor="volume">Volume : {volume}</label>
      <input
        type="range"
        id="volume"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
      />
      <label htmlFor="bank">Bank</label>
      <div className="interruptor" id="bank" onClick={handleMark}>
        <button className={`interruptor-btn ${mark ? "on" : "off"}`}></button>
      </div>
    </div>
  );
};

export default Display;
