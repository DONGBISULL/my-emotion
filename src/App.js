import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1",
    date: 1662982559004,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2",
    date: 1662982569996,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3",
    date: 1662982569997,
    img: "",
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4",
    date: 1662982569999,
    img: "",
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5 ",
    date: 1662982711153,
    img: "",
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

  /**
   * CREATE 게시글 작성
   */
  const onCreate = (date, content, emotion, img) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId,
        date: new Date(date).getTime(),
        content: content,
        emotion: emotion,
        img: img,
      },
    });
    dataId.current += 1;
  };

  /**
   * REMOVE  게시글 삭제
   */
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };

  /**
   * EDIT 게시글 수정
   */
  const onEdit = (targetId, date, content, emotion, img) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content: content,
        emotion: emotion,
        img: img,
      },
    });
  };

  return (
    // <DarkModeProvider>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onRemove,
          onEdit,
        }}
      >
        <DiaryStateContext.Provider value={data}>
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/new" element={<New />}></Route>
                <Route path="/edit/:id" element={<Edit />}></Route>
                <Route path="/diary/:id" element={<Diary />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </DiaryStateContext.Provider>
      </DiaryDispatchContext.Provider>
    // </DarkModeProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}  
  body {        
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor}
  }  
`;
