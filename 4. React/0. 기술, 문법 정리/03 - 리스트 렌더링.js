// 배열을 이용하여 React에서 List를 렌더링해보고 개별적인 컴포넌트로 만들어보기.

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// 여기 임시로 제작한 하나의 데이터 배열이 있다.
const dummyList = [
    {
        id: 1,
        author: "이정환",
        content: "하이1",
        emotion: 5,
        // Date() 객체를 생성하고 getTime()으로 현재 시간을 불러올 수 있다.
        created_date: new Date().getTime()
    },
    {
        id: 2,
        author: "이정환",
        content: "하이2",
        emotion: 5,
        created_date: new Date().getTime()
    },
    {
        id: 3,
        author: "이정환",
        content: "하이3",
        emotion: 5,
        created_date: new Date().getTime()
    }
];

// 이를 DiaryList 컴포넌트의 Props로 넘겨준다.
<DiaryList diaryList={dummyList} />

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// DiaryList 컴포넌트에서는 Props를 받는다.
const DiaryList = ({ diaryList }) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>

            {/* 점표기법과 length를 이용하면 Props 내부의 데이터 배열 갯수를 사용할 수 있다. */}
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>

            {/* 마찬가지의 방법과 map 함수를 이용하면 배열 내부의 데이터를 순차적으로 하나씩 내보낼 수 있다. */}
            <div>
                {/* map 함수의 매개변수에는 map이 사용된 데이터 배열 내부의 '개별 데이터'가 들어간다. */}
                {diaryList.map((it) => (
                    // 그리고 각각의 데이터 key 이름을 사용하면 화면에 간단히 출력할 수 있다.
                    // {it.author}

                    // 다만 이렇게 되면 데이터들을 수정하고 삭제하는 기능을 추가했을 때 컴포넌트가 너무 복잡해진다.
                    // 따라서 다른 컴포넌트로 데이터들을 넘겨줄 수 있다.

                    // 데이터는 괄호와 스프레드 연산자를 통해 넘겨줄 수 있다.
                    <DiaryItem key={`diaryitem_${it.id}`} {...it} />

                    // map 함수를 사용했을 때에는 사용되는 각각의 데이터를 구분할 key가 반드시 필요하다.
                    // 데이터를 만들 때, id로 사용될 데이터가 있으면 문제없지만.
                    // 만약 그런 데이터가 없을 때에는? map의 매개변수의 idx을 사용하여 key 추가해줄 수 있다.
                    // 다만 이 경우에는 실제 데이터의 순서와 추가된 idx가 꼬일 수도 있으니 주의.

                ))}
            </div>
        </div>
    );
};

// defaultProps로 Props의 초기값을 지정해줄 수 있다.
// 원래대로면 정상적으로 Props가 내려와야 하는데, 버그나 통신 상태의 이유로 내려오지 못하면 프로그램은 에러를 일으키고 작동을 멈춘다.
// 이를 방지하기 위한 방법 중 하나.
DiaryList.defaultProps = {
    diaryList: []
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Props는 괄호 표기법을 사용하여 개별 데이터를 각각 뽑아서 사용할 수도 있다.
const DiaryItem = ({ id, author, content, emotion, created_date }) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span className="author_info">
                    | 작성자 : {author} | 감정점수 : {emotion} |
                </span>

                <br />

                <span className="date">
                    {/* Date 객체 사용시, 아무 매개변수도 넣지 않으면 지금 시간을 불러오지만 데이터가 이미 존재한다면 그걸 사용하면 된다. */}
                    {new Date(created_date).toLocaleString()}
                </span>
            </div>

            <div className="content">
                {content}
            </div>
        </div>
    );
};
