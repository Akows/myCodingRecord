// async - await으로 비동기 함수를 사용한다.

const getData = async () => {
    // fetch로 외부 API를 호출하여 데이터를 받아온다.
    const res = await fetch("https://jsonplaceholder.typicode.com/comments")
                        .then((res) => res.json());
    
    // 받아온 데이터에서 20개 데이터 항목을 잘라온다.
    // 그리고 map 함수를 이용하여 데이터들을 모두 풀어낸 다음 원하는 형태로 가공한다.
    const initData = res.slice(0, 20)
        .map((it) => {
            return {
                author: it.email,
                content: it.body,

                // 감정 점수는 무작위로 지정되도록 해보자.
                // random() * 5는 0 - 4 사이의 무작위 소수를 지정하는 것.
                // floor()는 소수점 이하를 제거해주는 것이다.
                emotion: Math.floor(Math.random() * 5) + 1,

                // 현재 시간을 생성하고 MS 단위로 생성.
                created_date: new Date().getTime() + 1,
                id: dataId.current++
            };
    });

    // 가공된 데이터를 data state에 set한다.
    setData(initData);
};