import React from "react";

const EmotionItem = ({
  onClick,
  emotion_id,
  emotion_img,
  emotion_descript,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `Emotion_on` : `Emotion_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
