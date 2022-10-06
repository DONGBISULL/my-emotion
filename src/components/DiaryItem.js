import React from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotion, content, date, img }) => {
  const navigate = useNavigate();
  const dayArr = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const strDate = new Date(parseInt(date));
  const goDatail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const dateText = `${strDate.getFullYear()}년 ${
    strDate.getMonth() + 1
  }월 ${strDate.getDate()}일`;
  const dayText = dayArr[strDate.getDay()];

  return (
    <div className="DiaryItem">
      <div
        onClick={goDatail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          className={`img_${emotion}`}
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
        />
      </div>
      <div onClick={goDatail} className="info_wrapper">
        <div className="diary_date">
          {dateText}
          <span className="diary_day">{dayText}</span>
        </div>
        <div className="diary_conent_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
