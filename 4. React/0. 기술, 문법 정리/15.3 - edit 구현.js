import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

// Edit는 결국 editor의 컴포넌트를 이용해서 만들어지는 것이다.
// 따라서 내용 자체는 editor의 그것과 동일하고, 단지 수정에 필요한 값들만 DiaryEditor 컴포넌트로 넘겨주면 된다.

const Edit = () => {
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();

    // Path Variable로 넘겨받은 id값을 받아온다.
    const { id } = useParams();

    // 일기 데이터를 Context로 받아온다.
    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
    }, []);

    // id 혹은 data가 변하면 동작한다.
    useEffect(() => {
        if (diaryList.length >= 1) {
            // diarydata의 id와 Path Variable로 받아온 id를 비교하여 검색한다.
            const targetDiary = diaryList.find(
                // id는 숫자이지만 문자열로 간주될 수 있으니 int로 변환해준다.
                (it) => parseInt(it.id) === parseInt(id)
        );
            // 일기 데이터가 존재하면.
            if (targetDiary) {
                setOriginData(targetDiary);
            } 
            // 데이터가 없으면.
            else {
                alert("없는 일기입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, diaryList]);

    return (
        <div>
            {/* 원본 데이터가 존재하면 DiaryEditor 컴포넌트를 렌더링 */}
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit;
