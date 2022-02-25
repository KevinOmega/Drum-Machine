import React, { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "./context";

const Pad = ({ keyCode, keyTrigger, id, url }) => {
  const { volume, enabled, setCurrentId } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const playSound = useCallback(() => {
    setIsClicked(true);
    setCurrentId(id);
    const sound = document.getElementById(keyCode);
    sound.currentTime = 0;
    sound.volume = volume / 100;
    sound.play();
    setTimeout(() => setIsClicked(false), 300);

    return () => clearTimeout(() => setIsClicked(false), 300);
  }, [id, keyCode, setCurrentId, volume]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === keyCode) {
        playSound();
      }
    },
    [keyCode, playSound]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener("keydown", handleKeyPress);
    }

    if (!enabled) {
      window.removeEventListener("keydown", handleKeyPress);
    }
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [enabled, handleKeyPress]);

  if (enabled) {
    return (
      <div
        id="drum-pad"
        className={isClicked && "active-style"}
        key={id}
        onClick={playSound}
      >
        {keyTrigger}
        <audio src={url} id={keyCode} />
      </div>
    );
  }

  return (
    <div id="drum-pad" key={id}>
      {keyTrigger}
      <audio src={url} id={keyCode} />
    </div>
  );
};

export default Pad;
