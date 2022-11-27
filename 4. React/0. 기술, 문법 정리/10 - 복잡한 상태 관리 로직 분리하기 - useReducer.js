// 단순히 useState만을 가지고 복잡한 상태를 관리하는 로직을 만들게 되면, 필요한 함수가 너무 많아져 효율성이 떨어지고 종국에는 관리가 불가능할 지경에 빠진다.
// 게다가 상태변화 로직이 각 함수마다 섞여있는 것도 문제가 된다.

// 이때 사용할 수 있는 것이 useReducer, useState를 대체할 수 있다.
// 컴포넌트에서 상태변화 로직을 분리하여 컴포넌트를 더 가볍게 만들 수 있다.

// Reducer의 매개변수로는 Reduce를 처리할 함수와 state의 초기값이 들어가야한다.
const [state, dispatch1] = useReducer(reducer1, []);

// state는 useState의 그것과 동일한 개념. dispatch는 상태를 변화시켜주는 action을 발생시키는 함수를 의미한다.
// useReducer 함수 호출시에는 반드시 reducer 함수를 전달해주어야 하는데, dispatch가 상태변화를 일으킬 때 이를 처리해주는 역할을 한다.

// dispatch가 전달될 때에는 action 객체가 같이 전달된다. 이는 상태 변화를 설명하는 역할이다.
const func = useCallback((targetId) => {

    // dispatch에는 상태변화를 설명할 action 객체를 포함한다.
    dispatch1({ type: "REMOVE", targetId });
    // dispatch는 이를 받아 reducer로 전송하여 작업을 진행하게 된다.

}, []);

// dispatch가 전달되면, 이는 reducer로 넘어가 같이 넘어온 action 객체를 이용하여 switch문을 통해 조건에 맞는 결과값을 새로운 state로 반환하게 된다.
const reducer1 = (state, action) => {

    switch (action.type) {

        case "INIT": {
            return '';
        }

        case "CREATE": {
            return '';
        }

        case "REMOVE": {
            return '';
        }

        case "EDIT": {
            return '';
        }

        default:
            return '';
        }
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// useState로 이루어진 상태 관리 로직을 useReducer로 변경해준다.
const [data, dispatch] = useReducer(reducer, []);

// dispatch를 처리할 reducer 함수를 만든다.
const reducer = (state, action) => {

    // 먼저 어떤 상태가 존재하는지 모두 작성한다.
    switch (action.type) {

        case "INIT": {
            // dispatch를 통해 전달된 data이 새로운 state가 된다.
            return action.data;
        }

        case "CREATE": {
            const created_date = new Date().getTime();

            // 데이터를 가공하여 새 배열을 만든다.
            const newItem = {
            // INIT와 다르게 데이터가 하나로 묶여있지 않으므로 스프레드 문법으로 모두 담아넣는다.
            ...action.data,
            created_date
        };
            return [newItem, ...state];
        }

        case "REMOVE": {
            // 받아온 삭제 대상의 id를 이용하여 작업을 수행하고 그 결과값을 반환.
            return state.filter((it) => it.id !== action.targetId);
        }

        case "EDIT": {
            return state.map((it) =>
                it.id === action.targetId ? 
                {
                    ...it,
                    content: action.newContent
                }
                : 
                it
            );
        }

        // reducer가 동작하는데 상태를 변화할 필요가 없으면?
        // 상태를 변하게 하지 말고 그대로 반환한다.
        default:
            return state;
    }
};

const getData = async () => {

    // setData(initData);

    // useState를 더 이상 사용하지 않으므로, dispatch 함수를 작성해준다.
    dispatch({ type: "INIT", data: initData });
};

const onCreate = useCallback((author, content, emotion) => {
    // const created_date = new Date().getTime();
    // const newItem = {
    //     author,
    //     content,
    //     emotion,
    //     created_date,
    //     id: dataId.current
    // };

    // dataId.current += 1;
    // setData((data) => [newItem, ...data]);

    // 마찬가지로 dispatch 함수로 전환해준다.

    dispatch({
        type: "CREATE",
        data: { author, content, emotion, id: dataId.current }
    });

    dataId.current += 1;

}, []);

// 마찬가지로 dispatch 함수로 전환해준다.
const onRemove = useCallback((targetId) => {
    // setData((data) => data.filter((it) => it.id !== targetId));

    // 실질적인 삭제 작업은 reducer 내에서 수행하고, 여기서는 삭제 대상의 id만 전송한다.
    dispatch({ type: "REMOVE", targetId });
}, []);

// 마찬가지로 dispatch 함수로 전환해준다.
const onEdit = useCallback((targetId, newContent) => {
    // setData((data) =>
    //     data.map((it) =>
    //         it.id === targetId ? { ...it, content: newContent } : it
    //     )
    // );

    dispatch({
        type: "EDIT",
        targetId,
        newContent
    });
}, []);

// useReducer에서는 의존형 배열이나 함수형 업데이트를 사용하지 않아도 Reducer에서 항상 최신 states를 접근하게 해준다.