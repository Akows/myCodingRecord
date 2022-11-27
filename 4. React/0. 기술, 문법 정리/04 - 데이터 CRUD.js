// React에서 데이터 전송의 기본 규칙은 위에서 아래로 흘러가는 단방향으로만 전달될 수 있다는 것이다.
// 따라서 같은 부모를 가진 동일 선상의 컴포넌트들은 서로 데이터를 직접 주고받을 수 없다.
// 그런데 상위 컴포넌트에서 Event들을 하위 컴포넌트의 Props로 전달해주는 방식으로 데이터를 하위에서 상위로 올릴 수 있다.

// 이 방법을 이용해서 데이터가 수정되는 컴포넌트에서 데이터를 상위 컴포넌트로 올리고, 다른 컴포넌트에게 데이터를 내려주는 방법으로
// 동일 선상의 컴포넌트끼리 데이터를 주고받게 할 수 있는 것이다.

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// 데이터 추가하기
// 데이터 추가하기
// 데이터 추가하기
// 데이터 추가하기

// 최상위 App에 데이터를 받아와서 추가하는 함수를 생성한다.

// id는 작성자가 만드는 것이 아니라, 시스템에서 관리되어야 하기 때문에 변수를 하나 따로 생성해준다.
const dataId = useRef(0);

// 하위 컴포넌트에서 데이터를 받아올릴 수 있도록 매개변수를 지정해준다.
const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
        author,
        content,
        emotion,
        created_date,

        // dataId의 지금 값.
        id: dataId.current
    };

    // 글을 하나 작성하면 id값은 1씩 증가해야한다.
    dataId.current += 1;

    // 글을 하나 작성하더라도 기존의 데이터는 그대로 유지되어야 한다.
    // 스프레드 문법을 이용하여 기존 데이터를 유지할 수 있도록 한다.
    // newItem은 리스트 최상단에 위치해야 하므로 기존 데이터 가장 앞에 set 되도록 한다.
    setData([newItem, ...data]);
};

// 이 함수를 Props로 하위 컴포넌트에 전달한다.
<DiaryEditor onCreate={onCreate} />

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

const DiaryEditor = ({ onCreate }) => {

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1
    });

    const handleSubmit = () => {
        // props로 전달받은 onCreate 함수를 사용한다.
        onCreate(state.author, state.content, state.emotion);

        alert("저장 성공");

        // 그런데 입력한 데이터가 App으로 넘어간 다음에도 그 자리에 남아있다.
        // 이를 한번 초기화시켜주어야 한다.
        setState({
            author: "",
            content: "",
            emotion: 1
        });
    };
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// 데이터 삭제하기
// 데이터 삭제하기
// 데이터 삭제하기
// 데이터 삭제하기

// App에 삭제 기능 함수를 구현.
const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);

    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
};

// 마찬가지의 방법으로 하위 컴포넌트의 props로 함수를 보낸다.
// DiaryList에서는 이 이벤트 props를 전혀 사용하지 않지만 기능 구현을 위해서 이걸 그대로 하위 컴포넌트로 전달한다. 이를 Prop Drilling이라 한다.
// props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트들을 거치면서 React Component 트리의 한 부분에서 다른 부분으로 데이터를 전달하는 과정.
// 이를 사용하는 것은 그리 추천되지 않는다. 조금만 복잡한 컴포넌트 트리 상에서는 props 추적이 어렵기 때문.
// 그래서 전역 상태관리 라이브러리라는 것을 사용한다.

// DiaryItem에 삭제버튼을 생성.
<button
    onClick={() => {
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(id);
        }
    }}
    >
    삭제하기
</button>

// 대상 데이터를 제외하는 새 배열을 만드는 식으로 삭제 기능을 구현해보자.
// filter 함수를 이용하여 대상 데이터의 it를 받아 해당하지 않는 나머지 데이터를 살려 새 배열을 생성시키고, set 해준다.
const newDiaryList = data.filter((it) => it.id !== targetId);
setData(newDiaryList);

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// 데이터 수정하기
// 데이터 수정하기
// 데이터 수정하기
// 데이터 수정하기

// 수정 함수 생성.
const onEdit = (targetId, newContent) => {
    setData(
        // 수정 대상의 id를 데이터 배열의 id들과 검증한다.
        // id 일치하지 않는 경우 값을 그대로 두고, 일치하는 경우 모든 데이터 배열을 그대로 받아온 다음 수정할 부분만 처리하게 한다.
        data.map((it) =>
            it.id === targetId ? { ...it, content: newContent } : it
        )
    );
};

// 동일한 방법으로 item 컴포넌트까지 이동.
// 수정 기능에서는 내용을 수정할 수 있는 화면이 따로 전환되어야 한다.

// 다른 페이지를 만드는 것보다는 있는 페이지에서 화면이 전환되도록 만드는 것이 편리하다.

// 수정 상태를 감지하는 state를 제작한다. 기본 상태는 조회이므로 기본값은 false로.
const [isEdit, setIsEdit] = useState(false);

// 상태를 변경하는 toggle 함수를 만들어준다.
// 호출되면 isEdit의 값을 반대로 뒤집어주는 기능.
const toggleIsEdit = () => setIsEdit(!isEdit);

// 수정 폼에 입력하는 데이터도 마찬가지로 state로 관리되어야한다. 
// 그리고 수정을 입력하면, 기존의 입력값이 나타나야한다.
const [localContent, setLocalContent] = useState(content);

// useRef로 수정 폼을 제어한다.
const localContentInput = useRef();

// 수정을 하다가 중단하게 되면, 입력했던 수정 값은 제거되어야한다.
// 수정 상태를 전환하고, localContent를 원래 데이터로 돌려주도록 한다.
const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
};

const handleEdit = () => {
    if (localContent.length < 5) {
        // 입력 조건을 충족하지 않으면 수정이 이루어지지 않고 focus되도록 처리.
        localContentInput.current.focus();
        return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
        // 내려온 onEdit을 호출하여 필요한 데이터들을 붙여 올려보낸다.
        // 수정 대상의 id값과 수정된 내용.
        onEdit(id, localContent);
        // 수정을 완료했으니 수정 상태를 전환한다.
        toggleIsEdit();
    }
};

<div className="content">

    {/* 삼항 연사자를 이용하여 수정 상태인 경우, 수정 폼이 나타나도록 한다. */}
    {isEdit ? (
        <textarea
            ref={localContentInput}
            value={localContent}
            // 데이터를 만드는 것과 동일하게 onChange 핸들러를 달아준다.
            onChange={(e) => setLocalContent(e.target.value)}
        />
    ) : (
        content
    )}

</div>

    // 버튼 부분도 마찬가지로 삼항 연산자를 이용하여 각각의 버튼이 나타나도록 한다.
    {isEdit ? (
    <>
        <button onClick={handleQuitEdit}>수정 취소</button>
        <button onClick={handleEdit}>수정 완료</button>
    </>
    ) : (
    <>
        <button onClick={handleClickRemove}>삭제하기</button>
        <button onClick={toggleIsEdit}>수정하기</button>
    </>
)}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
