// props를 원하는 하위 컴포넌트까지 전달하기 위해서는 의도치않게 그저 거쳐가는 용도로 쓰이는 컴포넌트들이 발생된다.

// props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트들을 거치면서 React Component 트리의 한 부분에서 다른 부분으로 데이터를 전달하는 과정.
// 이를 사용하는 것은 그리 추천되지 않는다. 조금만 복잡한 컴포넌트 트리 상에서는 props 추적이 어렵기 때문.
// 그래서 전역 상태관리 라이브러리라는 것을 사용한다.

// 리액트에서는 provider 컴포넌트를 제공한다.
// provider는 기존 리액트의 props 전달 규칙을 무시하고 어느 위치에서든 목표로 하는 컴포넌트에 props를 직통으로 전달할 수 있다.

// 최상위 app 컴포넌트에서 provider 컴포넌트에게 모든 데이터를 전달하고, provider는 필요한 위치에 props 전달한다.
// 이를 위해서는 provider 컴포넌트가 app을 제외한 다른 컴포넌트들의 최상단에 위치해 있어야한다.

// 우선 Context 객체를 생성해준다.
// 이 객체들은 외부로 배포되어야 하므로 export 키워드를 사용해준다.
// 함수 자체를 provider에 전달하면 useMemo로 리랜더링을 제한시켜둔 조치가 무력화되버린다.
// provider도 결국 컴포넌트의 일종이기 때문. data가 변화할 때마다 리랜더링이 일어나버린다.
// 그래서 Context를 나누어 관리해야한다.
export const DiaryStateContext = React.createContext(null);
export const DiaryDispatchContext = createContext(null);

// import React, { useContext } from "react";

// export default와 export
// export default로 배포된 요소는 그냥 사용이 가능하다. import React.
// export로 배포된 요소는 비구조화 할당을 통해서만 사용이 가능하다. import { useContext }.

// return (
//     <div className="App">
//         <DiaryEditor onCreate={onCreate} />
//         <div>전체 일기 : {data.length}</div>
//         <div>기분 좋은 일기 개수 : {goodCount}</div>
//         <div>기분 나쁜 일기 개수 : {badCount}</div>
//         <div>기분 좋은 일기 비율 : {goodRatio}%</div>
//         <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
//     </div>
// );

// 다이어리 데이터를 담는 변수.
const store = {
    data
};

// 사용되는 함수를 담는 변수.
// memoizedDispatch가 리랜더링되는 것을 방지하기 위해 useMemo로 처리해준다.
const memoizedDispatch = useMemo(() => {
    return { onCreate, onRemove, onEdit };
}, []);


return (
    // Context 객체 내부에는 provider 컴포넌트를 포함하고 있으므로, 이를 이용하여 provider 컴포넌트를 만들어준다.
    // provider는 value에 전역으로 전달하려는 값을 기재하면 된다.
    <DiaryStateContext.Provider value={store}>
        <DiaryDispatchContext.Provider value={memoizedDispatch}>
        <div className="App">
            <DiaryEditor />
            <div>전체 일기 : {data.length}</div>
            <div>기분 좋은 일기 개수 : {goodCount}</div>
            <div>기분 나쁜 일기 개수 : {badCount}</div>
            <div>기분 좋은 일기 비율 : {goodRatio}%</div>
            <DiaryList />
        </div>
        </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
);

// 그리고 props를 받을 컴포넌트에 useContext 함수를 사용한다.
const { data } = useContext(DiaryStateContext);

