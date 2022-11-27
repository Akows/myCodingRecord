import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
    // Page Moving 사용을 위한 useNavigate();
    const navigate = useNavigate();

    // process.env 사용.
    const env = process.env;
    // env.PUBLIC_URL이거나 URL이 없으면 공백.
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    // Date 객체를 생성하여 시간 데이터를 ms단위로 전환하고 toLocaleDateString()으로 년월일 단위로 수정해준다.
    // date값이 문자열일 수도 있으므로 parseInt 처리를 해준다.
    const strDate = new Date(parseInt(date)).toLocaleDateString();

    // 컴포넌트를 이동하기 위한 함수.
    // 상세보기를 위해서 url에 id값을 함께 전달하여 이동한다.
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };
    // 컴포넌트를 이동하기 위한 함수.
    // 수정을 위해서 url에 id값을 함께 전달하여 이동한다.
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="DiaryItem">
            <div
                onClick={goDetail}
                // emotion 종류에 따라 다른 CSS를 적용하기 위한 기법. 두 className의 사용을 위해 join(" ")으로 중간 공백을 넣어준다.
                className={[
                    "emotion_img_wrapper",
                    `emotion_img_wrapper_${emotion}`,
                ].join(" ")}
            >
                {/* 이미지 경로를 맞춰 불러와준다. */}
                <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
            </div>
            <div onClick={goDetail} className="info_wrapper">
                {/* 일기의 작성시간 데이터를 출력한다. */}
                <div className="diary_date">{strDate}</div>
                {/* 일기의 내용을 25글자까지 출력한다. */}
                <div className="diary_content_preview">{content.slice(0, 25)}</div>
            </div>
            <div className="btn_wrapper">
                {/* 수정을 위해서 onClick 이벤트를 설정한다. */}
                <MyButton onClick={goEdit} text={"수정하기"} />
            </div>
        </div>
    );
};

export default React.memo(DiaryItem);
