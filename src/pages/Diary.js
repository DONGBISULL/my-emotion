import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

import { getStringDate } from "../util/dateFormat";
import { emotionList } from "../util/emotionList";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const goEdit = () => {
    navigate(`/edit/${data.id}`);
  };

  const dayArr = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const dairyDate = new Date(data.date);
  const dateText = `
  ${dairyDate.getFullYear()}년 
  ${dairyDate.getMonth() + 1}월 
  ${dairyDate.getDate()}일 
  ${dayArr[dairyDate.getDay()]}`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        //일기가 있을 때
        setData(targetDiary);
      } else {
        //일기가 없을 때
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">Loading...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DairyPage">
        <MyHeader
          headerText={`${dateText}`}
          leftChild={
            <MyButton
              text={"< 뒤로 가기"}
              onClick={() => navigate(-1)}
            ></MyButton>
          }
        />
        <article>
          <section className="DiaryPage_flex">
            <h3>
              오늘의 감정
              <span className="diary_emotion">
                기분 : [{curEmotionData.emotion_descript}]
              </span>
            </h3>
            <div className="emotion_img_wrapper">
              <img src={curEmotionData.emotion_img} />
            </div>
          </section>
          <section>
            <img src={data.img} className="thumbnail" />
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
          <div className="DiaryPage_button_wrapper">
            <MyButton type={'positive'} text="수정하기" onClick={goEdit} />
          </div>
        </article>
      </div>
    );
  }
};

export default Diary;
