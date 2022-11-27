import { useState } from "react";

const DiaryEditor = () => {

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1
    });

    // 동일한 구성을 가진 변수 하나하나를 useState로 관리하는 것은 비효율적이다.
    // onChange 속성에 들어갈 콜백 함수를 개별적으로 두는 것도 마찬가지.

    // 그런데 하나의 useState에서 다수의 변수를 관리할 경우, 하나의 값만 수정되야하는 상황에서 다른 값들이 모두 달라져버릴 수도 있다.
    // 이를 방지하기 위해서 onChange에 사용될 콜백 변수를 아래와 같이 작성해야 한다.
    const handleChangeState = (e) => {
    setState({...state, [e.target.name]: e.target.value});
    };
    // 스프레드 문법을 이용하여 기존 state에 들어 있던 변수를 불러오고, 그 다음에 필요한 변수만 수정할 수 있도록 하는 것이다.
    // 점 표기법의 경우 객체의 프로퍼티에 접근할 수 없다, 따라서 괄호 표기법을 사용해주어야 한다.

    const handleSubmit = () => {
        console.log(state);
        alert("저장 성공!");
    };

    return (
        <div className="DiaryEditor"> 
        <h2>오늘의 일기</h2>
        <div>
            <input
            value={state.author}
            onChange={handleChangeState}
            name="author"
            placeholder="작성자"
            type="text"
            />
        </div>
        <div>
            <textarea
            value={state.content}
            onChange={handleChangeState}
            name="content"
            placeholder="일기"
            type="text"
            />
        </div>
        <div>
            <span>오늘의 감정점수 : </span>
            <select
            name="emotion"
            value={state.emotion}
            onChange={handleChangeState}
            >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
        </div>
    );
};

export default DiaryEditor;