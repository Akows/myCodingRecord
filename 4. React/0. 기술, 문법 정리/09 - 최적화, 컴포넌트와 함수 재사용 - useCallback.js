// 최적화가 필요한 컴포넌트는 어떻게 찾아야하는가?
// 여러 방법이 있지만 이번에는 크롬의 리액트 개발 툴을 사용하는 방법을 사용해보려한다.

// 최적화의 핵심은 쓸모없는 리랜더링이 일어나지 않도록 하는 것이다.
// 가장 간단한 방법은 useEffect와 브라우저 콘솔을 이용하는 방법이지만 컴포넌트가 많아질 수록 모든 컴포넌트을 확인하는건 너무 힘든 일이다.

useEffect(() => {
    console.log("DiaryEditor 렌더");
});

// 리액트 개발 툴의 '리랜더링이 일어나는 컴포넌트에 하이라이트를 주는' 기능을 사용하여 쓸모없는 리랜더링이 발생하는 부분을 확인할 수 있다.
// 단순하게는 컴포넌트에 React.memo를 사용하는 방법인데, export default DiaryEditor을 .

export default React.memo(DiaryEditor);
// export 단에서 React.memo를 적용해도 결과는 동일하게 나타난다.

// 그런데 이전에 배웠던 것과 같이, props가 객체 타입인 경우에는 단순 React.memo만으로 리랜더링을 막을 수 없다.

// 이전에 배운 useMemo는 단지 결과값만을 반환하는 Hook이기 때문에 사용할 수 없다.
// 함수 그 자체를 반환해야 하는 경우에 사용할 수 있는 것이 useCallback이다.
const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();

    const newItem = {
        author,
        content,
        emotion,
        created_date,
        id: dataId.current
    };

    dataId.current += 1;

    // 그런데 이렇게 onCreate의 리랜더링을 방지해버리면 data의 최신값을 접근하는 것도 방지되면서 데이터를 다시 읽어오는 코드가 제대로 동작하지 않는다.
    // setData([newItem, ...data]);

    // 그렇다고 의존성 배열에 data를 넣어 리랜더링을 발생시키면 useCallback을 사용하는 의미가 없어져버린다.

    // 이럴때 사용하는 것이 함수형 업데이트이다.
    // 상태변화 함수에 함수를 매개변수로 전달하면서 useCallback을 사용하더라도 최신값에 접근할 수 있게 되는 것이다.
    setData((data) => [newItem, ...data]);
}, []);

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// 최적화의 시작은 React.memo.
// export default memo(DiaryItem);

const onRemove = useCallback((targetId) => {

    // const newDiaryList = data.filter((it) => it.id !== targetId);
    // setData(newDiaryList);

    // 역시 함수형 업데이트로 수정.
    setData((data) => data.filter((it) => it.id !== targetId));

    // 그리고 빈 의존성 배열을 추가.
}, []);

const onEdit = useCallback((targetId, newContent) => {

    // setData(
    //     data.map((it) =>
    //         it.id === targetId ? { ...it, content: newContent } : it
    //     )
    // );

    // 역시 함수형 업데이트로 수정.
    setData((data) =>
        data.map((it) =>
            it.id === targetId ? { ...it, content: newContent } : it
        )
    );

    // 그리고 빈 의존성 배열을 추가.
}, []);