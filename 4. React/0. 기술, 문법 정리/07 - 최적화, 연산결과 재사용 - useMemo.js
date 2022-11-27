// Memoization
// 한 번 계산한 연산 결과를 기억해두고 있으면 나중에 같은 연산을 시키더라도 굳이 연산을 한 번 더 돌리기보다는 기억해둔 결과값을 반환하면 된다.
// 하나의 문제에 대한 해결 방법을 가지고 있다면 그냥 꺼내서 쓰는 것이 효율적이다.

// Memoization하고 싶은 함수를 useMemo()로 감싸주면 된다.
const getDiaryAnalysis = useMemo(() => {

    // 자바스크립트 특성상, getDiaryAnalysis는 컴포넌트가 mount 될 때 처음 한 번. fetch가 데이터를 받아오면서 한번 더 동작한다.
    // if문을 사용하여 함수가 2번 동작하는 것을 방지하자.
    if (data.length === 0) {
        return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }

    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;

    const badCount = data.length - goodCount;

    const goodRatio = (goodCount / data.length) * 100.0;

    return { goodCount, badCount, goodRatio };

    // 이 함수가 update 되야하는 조건은? data가 증가했을 때이다.
    // Dependency Array의존성 배열이 없거나 비워두면 무의미하게 리랜더링이 일어나므로 배열을 사용해주는 것이 좋다.
}, [data.length]);

// useMemo()를 사용하고, 의존성 배열까지 사용해주면 최초 연산 이후에는 업데이트 시에만 재연산을 하게 된다.

// useMemo 내부로 들어간 콜백 함수는 반환값을 결과값으로 반환받는다. 함수가 아니기 때문에 호출시 함수 호출을 하면 안된다.
const { goodCount, badCount, goodRatio } = getDiaryAnalysis;