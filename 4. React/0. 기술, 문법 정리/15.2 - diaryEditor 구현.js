import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

// 수정 상태라면 수정 상태값과 수정 대상 데이터를 props로 받는다.
const DiaryEditor = ({ isEdit, originData }) => {
    // focus를 위한 useRef.
    const contentRef = useRef();

    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);

    // 시간 데이터를 관리할 state
    const [date, setDate] = useState(getStringDate(new Date()));

    // onCreate, onEdit, onRemove 함수를 useContext로 받아온다.
    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

    // emotion을 선택하면 emotion의 id가 emotion state에 set한다.
    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    }, []);

    // useNavigate
    const navigate = useNavigate();

    const handleSubmit = () => {
        // 입력 내용이 없으면 input을 focus하고 함수 중단.
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        // confirm으로 확인 절차를 거친다.
        if (
            window.confirm(
                isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
            )
        ) 
        
        {
            // 수정 상태가 아니라면.
            if (!isEdit) {
                // 데이터를 onCreate에 담아 App으로 보낸다.
                onCreate(date, content, emotion);
            } 
            // 수정 상태면
            else {
                // 데이터를 onEdit 담아 App으로 보낸다.
                onEdit(originData.id, date, content, emotion);
            }
        }

        // 작성이 완료되면 home으로 이동.
        navigate("/", { replace: true });
    };

    const handleRemove = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onRemove(originData.id);
            navigate("/", { replace: true });
        }
    };

    // 수정값과 대상 데이터 값이 변하면 (값이 내려오면)
    useEffect(() => {
        if (isEdit) {
            // 받아온 데이터를 받아 set 해준다.
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                leftChild={
                <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
                }
                rightChild={
                isEdit && (
                    <MyButton
                    text={"삭제하기"}
                    type={"negative"}
                    onClick={handleRemove}
                    />
                )
                }
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input
                        className="input_date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {/* 정리한 emotionList를 map함수로 순차출력한다. */}
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                // 어떤 emotion을 선택했는지 id값을 받아온다.
                                onClick={handleClickEmote}
                                // emotion state에 저장된 id가 EmotionItem으로 뿌려진 emotion과 일치하는지 여부를 전달한다.
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                        placeholder="오늘은 어땠나요"
                        // focus용 ref.
                        ref={contentRef}
                        // state와 매칭하기 위한 value.
                        value={content}
                        // 입력값을 감지하는 onChange.
                        onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
                        <MyButton
                        text={"작성완료"}
                        type={"positive"}
                        onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
