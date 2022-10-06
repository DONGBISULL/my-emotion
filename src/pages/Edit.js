import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [originData, setOriginData] = useState();
  useEffect(() => {
    if (diaryList.length >= 1) { // 기존 데이터 있을 경우에만 처리
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) { 
        setOriginData(targetDiary);
      } else { // 해당하는 일기 없을 경우
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
