// 폰트 세팅
// 웹 페이지 내에서 폰트를 사용할 때에는, 사용 권한이 어떻게 되어있는지 확인하고 사용할 필요가 있다.
// 비상업적 용도의 학습용 프로젝트면 괜찮겠지만, 유료 폰트에는 당연히 저작권 등이 존재하지 때문.

// Google Web Fonts에서는 다양한 폰트를 제공해주고 있다.



// 레이아웃 세팅
// 컴포넌트 공통의 CSS 속성들은 APP의 CSS에 작성하는 것이 좋다.



// 이미지 에셋 세팅
// process.env.PUBLIC_URL
// 컴포넌트 위치가 어떻게 되었든, public url을 찾아 연결한다.



// 공통 컴포넌트 세팅
// 버튼의 기본 구성은 비슷하되, 세부적인 내용이 다를 경우.
// 아예 버튼 컴포넌트를 하나 만들어 공용으로 만들어 두는것이 편하다.
const MyButton = ({ text, type, onClick }) => {
    // 들어오는 type이 "positive", "negative" 둘 중 하나인 경우 그대로 변수에 넣는다.
    // 둘 중 어디에도 일치하지 않으면? type : "default"이다.
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    return (
        <button
            // 기본 CSS는 동일하지만, 버튼 타입에 따라서 CSS를 다르게 사용하게 할 수 있다.
            // 이 경우 join(" ")을 사용해주어야 2개의 className을 정상적으로 적용할 수 있다.
            className={["MyButton", `MyButton_${btnType}`].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

MyButton.defaultProps = {
    type: "default",
};

export default MyButton;

// 사용 예시.
<>
    <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />

    <MyButton text={"취소하기"} onClick={() => navigate(-1)} />

    <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit}/>
</>








const MyHeader = ({ headText, leftChild, rightChild }) => {
    return (
    <header>
        <div className="head_btn_left">{leftChild}</div>
        <div className="head_text">{headText}</div>
        <div className="head_btn_right">{rightChild}</div>
    </header>
    );
};

// 사용 예시

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
