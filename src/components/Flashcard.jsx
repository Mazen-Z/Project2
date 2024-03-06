import React, { useState } from "react";

export default function Flashcard({frontSide, backSide}) {
  const [isFront, changeFace] = useState(true);
  function handleclick() {
    changeFace((oldState) => !oldState);
  }
  const text = isFront ? frontSide : backSide;
  const sideClass = isFront ? "front" : "back";
  const classList = `flash_card ${sideClass}`;
  return (
    <div className={classList} onClick={handleclick}>
      {text}
    </div>
  );
}