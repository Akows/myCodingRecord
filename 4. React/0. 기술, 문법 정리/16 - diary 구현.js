import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

// 기본틀은 수정기능과 동일하다.
// 상세보기에 필요한 데이터를 받아와서 작업을 거치면 된다.
const Diary = () => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
    }, []);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
                if (targetDiary) {
                    // 일기가 존재할 때
                    setData(targetDiary);
                } else {
                    // 일기가 없을 때
                    alert("없는 일기입니다.");
                    navigate("/", { replace: true });
                }
        }
    }, [id, diaryList]);

    // 데이터가 없으면 로딩 페이지를 띄운다.
    // 처음에는 로딩 페이지가 출력되지만, 곧 useEffect로 데이터가 들어오고.
    // 리랜더링이 일어나면서 로딩 페이지를 벗어나게 된다.
    if (!data) {
        return <div className="DiaryPage">로딩중입니다...</div>;
    } 
    else {
        const curEmotionData = emotionList.find(
                (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
            );

        console.log(curEmotionData);

        return (
            <div className="DiaryPage">
                <MyHeader
                // 시간 데이터를 받아서 년-월-일로 전환하는 함수를 만들었으므로 호출하여 사용해준다.
                headText={`${getStringDate(new Date(data.date))} 기록`}
                leftChild={
                    <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
                }
                rightChild={
                    <MyButton
                    text={"수정하기"}
                    onClick={() => navigate(`/edit/${data.id}`)}
                    />
                }
                />
                <article>
                <section>
                    <h4>오늘의 감정</h4>
                    <div
                    className={[
                        "diary_img_wrapper",
                        `diary_img_wrapper_${data.emotion}`,
                    ].join(" ")}
                    >
                        {/* 감정의 이미지나 설명은 emotionList에 모두 구현되어있다. */}
                        {/* 앞서서 emotion을 찾아 식별한 과정에서 list에 있는 모든 정보가 접수되었으니 그대로 사용하면 된다. */}
                        <img src={curEmotionData.emotion_img} />
                        <div className="emotion_descript">
                            {curEmotionData.emotion_descript}
                        </div>
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="diary_content_wrapper">
                        <p>{data.content}</p>
                    </div>
                </section>
                </article>
            </div>
        );
    }
};

export default Diary;
