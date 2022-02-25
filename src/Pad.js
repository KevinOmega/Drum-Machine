import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";

const Pad = ({ keyCode, keyTrigger, id, url }) => {
  const { volume, enabled, setCurrentId } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const playSound = () => {
    setIsClicked(true);
    setCurrentId(id);
    const sound = document.getElementById(keyCode);
    sound.currentTime = 0;
    sound.volume = volume / 100;
    sound.play();
    setTimeout(() => setIsClicked(false), 300);

    return () => clearTimeout(() => setIsClicked(false), 300);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === keyCode) {
      playSound();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

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
