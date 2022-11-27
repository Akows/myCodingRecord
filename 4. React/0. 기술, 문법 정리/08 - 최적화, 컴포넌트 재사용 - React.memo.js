// React.memo - 고차 컴포넌트

// 부모 컴포넌트가 리랜더링 되면 모든 자식 컴포넌트도 리랜더링된다.
// 부모 컴포넌트로부터 리랜더링 되는 부분을 props 받는 컴포넌트는 물론, 그렇지 않은 컴포넌트까지 모두 리랜더링이 일어나버린다.
// 이렇게 되면 하나의 상위 컴포넌트를 갖는 구조 상에서는 작업 하나마다 모든 컴포넌트들이 리랜더링 되는, 성능의 낭비가 일어난다는 뜻이다.

// 이를 방지하는 방법 중 하나가 각 자식 컴포넌트에 리랜더링 (업데이트) 조건을 걸어주는 것.
// 전달되는 props을 기억하고 있다가, 상위 컴포넌트의 리랜더링으로 같은 props이 전달되면 자기 자신은 리랜더링하지 않는 것이다.
// React.memo가 사용된 함수는 props의 값이 변하지 않으면 업데이트 되지 않는다.

import React, { useEffect, useState } from "react";

    // React.memo를 사용하고 있으므로 count의 값이 변하지 않으면 부모 컴포넌트의 리랜더링과 무관한 관계를 유지한다.
    const CounterA = React.memo(({ count }) => {
        useEffect(() => {
            console.log(`CountA Update - count : ${count}`);
        });

        return <div>{count}</div>;
    });

    // 그런데 React.memo을 사용하더라도 props가 객체일 경우에는 객체의 프로퍼티 값이 동일하더라도 이를 같다고 간주하지 않는다.
    // 자바스크립트의 객체 비교는 얕은 비교가 이루어지기 때문이다.
    // 프로퍼티 값 비교가 아닌 객체의 주소값을 비교하기 때문에 key-value가 같은 값이라 할지라도 이를 동일하다고 보지 않기 때문이다.
    // 따라서 객체를 props로 받는 경우에는 단순히 React.memo를 사용해서는 안된다.
    const CounterB = ({ obj }) => {
        useEffect(() => {
            console.log(`CountB Update - count : ${obj.count}`);
        });

        return <div>{obj.count}</div>;
    };

    // 객체 그 자체가 아닌, 객체 내부의 값을 꺼내서 비교시켜야 한다.
    const areEqual = (prevProps, nextProps) => {
        if (prevProps.obj.count === nextProps.obj.count) {
            return true;
        }

        return false;

        // if문을 사용하지 않고 축약 코드를 사용할 수도 있다.
        // return prevProps.obj.count === nextProps.obj.count;
    };

    // 그리고 React.memo를 사용해서 컴포넌트와 객체 내부값 비교 기능의 함수를 매개변수로 넣어주어야 한다.
    // areEqual의 판단에 따라 CounterB 컴포넌트의 리랜더링 여부를 결정하는 것이다.
    const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    });

    return (
        <div style={{ padding: 50 }}>
        <div>
            <h2>Counter A</h2>
            <CounterA count={count} />

            {/* 상태가 변화하지만, 값은 변하지 않는다. 리랜더링이 일어나지 않는다.*/}
            <button onClick={() => setCount(count)}>A Button</button>
        </div>
        <div>
            <h2>Counter B</h2>
            <MemoizedCounterB obj={obj} />
            <button onClick={() => setObj({ count: 1 })}>B Button</button>
        </div>
        </div>
    );
};

export default OptimizeTest;
