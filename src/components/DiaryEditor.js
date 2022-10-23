import React, { useContext, useEffect, useRef, useState ,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/emotionList";
import { getStringDate } from "../util/dateFormat";
import { DiaryDispatchContext } from "../App";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const contentRef = useRef();
  const fileRef = useRef();

  const [img, setImg] = useState();
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState("");
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const imgUpload = () => {
    fileRef.current.click();
  };

  const handleImgChange = useCallback(
    (e) => {
      console.log(e.target);
      const imgFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgFile);
      fileReader.onload = () => {
        const newImg = fileReader.result;
        setImg(newImg);
      };
    },
    [img]
  );

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setImg(originData.img);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const handlerSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion, img);
      } else {
        onEdit(originData.id, date, content, emotion, img);
      }
    }

    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <div>
        <MyHeader
          headerText={isEdit ? "수정하기" : "새 일기 쓰기"}
          leftChild={
            <MyButton text={"< 뒤로 가기"} onClick={() => navigate(-1)} />
          }
        />
        <div>
          <section className="edit_time_flex">
            <h3>📅 TODAY ? </h3>
            <div className="input_box">
              <input
                value={date}
                className="input_date"
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </section>
          <section>
            <h3> 오늘의 감정은 ?</h3>
            <div className="input_box emotion_list_wrapper">
              {emotionList.map((it) => (
                <EmotionItem
                  key={it.emotion_id}
                  {...it}
                  onClick={handleClickEmotion}
                  isSelected={it.emotion_id === emotion}
                />
              ))}
            </div>
          </section>
          <section className="img_input_wrapper">
            <h3> 📝 오늘의 일기</h3>
            <MyButton
              text={"📷 이미지 선택"}
              type={"positive"}
              onClick={imgUpload}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImgChange}
            />
          </section>
          <section>
            <div className="input_box text_wrapper">
              <img src={img} className="thumbnail" />
              <textarea
                placeholder="오늘 하루는 어땠나요?"
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </section>

          <section>
            <div className="control_box">
              <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
              <MyButton
                text={"작성완료"}
                onClick={() => {
                  handlerSubmit();
                }}
                type={"positive"}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditor;
