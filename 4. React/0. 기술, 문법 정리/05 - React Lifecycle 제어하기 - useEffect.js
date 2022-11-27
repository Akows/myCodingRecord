// Lifecycle 생명 주기.
// 탄생 - 변화 - 죽음

// 컴포넌트가 화면에 나타난다. - 컴포넌트가 리렌더(업데이트)된다. - 컴포넌트가 화면에서 사라진다.
// Lifecycle를 제어한다 : 컴포넌트가 생성되어 변하고 사라지는 과정에서 무언가 하는 것들을 모두 통틀어 포함한다.
// 초기화, 예외 처리, 메모리 정리 등이 포함된다.

// React에서는 Lifecycle마다 실행할 수 있는 함수를 제공하고 있다. 다만 Class형 컴포넌트에서만 사용할 수 있다.
// ComponentDidMount, ComponentDidUpdate, ComponentWillUnmount

// 그런데 함수형 컴포넌트는 상태를 관리하는 state도 사용할 수 없지만, 자체 hook을 통해 대체 함수들을 제공하고 있다.
// Class형 컴포넌트 전용의 함수들을 Hook하여 사용한다고 하여 이들을 React Hooks라 칭한다.

// 클래스형 컴포넌트는 코드 길이가 더 길고 복잡하고 중복 코드의 량이 많다는 문제가 있다.
// 이를 위해 함수형 컴포넌트가 등장하였고, 클래스형 컴포넌트의 기능들을 온전히 사용하기 위해 Hook도 개발되었다.

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// useEffect
// 함수형 컴포넌트에서 Lifecycle를 제어하기 위해 사용하는 Hook.

// useEffect은 2개의 매개변수를 받아 사용한다.
// 첫번째는 콜백 함수, 두번째는 Dependency Array의존성 배열.
// 의존성 배열에 들어오는 값이 변화할 때마다 useEffect는 콜백 함수를 수행하게 된다.
useEffect(() => {
    //콜백 함수
}, []);


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Lifecycle 이해용 학습 코드.

import React, { useEffect, useState } from "react";

// 원래 하나의 파일에는 하나의 컴포넌트만을 작성하는게 원칙이지만 그렇게 하지 않아도 문제는 없다.
const UnMountTest = () => {
    useEffect(() => {
        console.log("Sub Component Mount");

        // 컴포넌트의 Unmount 순간은 어떻게 제어하는가?
        // useEffect로 mount 순간의 동작을 제어할 수 있다.
        // 이때 return에 익명 함수를 반환하게 되면 Unmount 순간에 실행되는 코드를 작성할 수 있다.
        return () => {
            console.log("Sub Component Unmount");
        };
    }, []);

    return <div>UN MOUNT TEST</div>;
};

const LifeCycle = () => {

const [count, setCount] = useState(0);
const [text, setText] = useState("");

const [isVisible, setIsVisible] = useState(false);
const toggle = () => setIsVisible(!isVisible);

// 컴포넌트가 Mount되는 시점에서만 동작하는 useEffect.
// 컴포넌트가 리렌더링되었을 때에는 동작하지 않는다.
// 비어있는 Dependency Array의존성 배열을 넣으면 useEffect는 Mount 시에만 동작한다.
useEffect(() => {
    console.log("Mount!");
}, []);

// 의존성 배열 자체가 없으면 컴포넌트가 Update, 리렌더링될 때마다 동작한다.
useEffect(() => {
    console.log("Update!");
});

// 의존성 배열에 들어있는 요소가 변화할 때마다 동작한다.
useEffect(() => {
    console.log(`count is update : ${count}`);

    // 이 특징을 이용해서 기능을 구현할 수 있다.
    if (count < 5) {
        alert('경고!');
        setCount(1);
    }

}, [count]);
// 감지하고 싶은 값만 감지하여 Update를 발동시킬 수 있는 것이다.
useEffect(() => {
    console.log(`text is update : ${text}`);
}, [text]);

return (
    <div>
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}>count up</button>
        </div>
        <div>
            <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </div>
        <button onClick={toggle}>ON/OFF BUTTON</button>
        {/* 단락회로 평가, and 연산이기 때문에 앞의 값의 결과에 따라 뒤의 요소의 ON/OFF를 제어할 수도 있다. */}
        {isVisible && <UnMountTest />}
    </div>
);
};

export default LifeCycle;
