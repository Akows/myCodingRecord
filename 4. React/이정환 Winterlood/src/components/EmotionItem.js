import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      // 선택된 emotion의 css를 제어하는 용도로 isSelected를 사용한다.
      // isSelected된 emotion의 css만 작동하고 나머지는 off한다.
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

// 리랜더링 될 필요가 없는 EmotionItem 컴포넌트도 최적화해준다.
export default React.memo(EmotionItem);
