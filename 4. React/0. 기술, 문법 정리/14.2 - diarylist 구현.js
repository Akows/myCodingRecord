import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

// 검색 필터 기능을 위한 변수 배열.
const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

// 검색 필터 기능을 위한 변수 배열.
const filterOptionList = [
    { value: "all", name: "전부다" },
    { value: "good", name: "좋은 감정만" },
    { value: "bad", name: "안좋은 감정만" },
];

// 검색 필터 메뉴 컴포넌트.
// DiaryList는 home의 하위 컴포넌트이므로 DiaryList 자체가 리랜더링 되는 것을 막기는 힘들다.
// 다만 DiaryList의 하위 컴포넌트인 ControlMenu의 리랜더링은 memo 처리로 최적화시킬 수 있다.

// 중간 핸들링 함수를 사용할 경우, 리랜더링 시마다 함수가 재생성되면서 마찬가지로 리랜더링을 일으킨다.
// 그러나 ControlMenu의 onChange 함수는 중간 함수 없이 콜백 함수를 직접 내려받기에 리랜더링을 유발하지 않는다.
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    return (
        <select
            className="ControlMenu"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
});

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();

    // 검색 필터 기능을 위한 변수를 관리할 state.
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");

    // 검색 필터를 사용하게 될 경우 동작하게 되는 함수.
    const getProcessedDiaryList = () => {

        // filter에 따라서 emotion의 숫자값을 비교한다.
        const filterCallBack = (item) => {
            if (filter === "good") {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        };

        // sortType에 따라서 date의 숫자값을 비교한다.
        // 정렬 작업은 sort함수가 수행하고, compare 함수는 정렬의 기준을 만드는 것에 해당한다.
        const compare = (a, b) => {
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        // 전체 데이터를 복사해야한다.
        // 받아온 배열 데이터를 JSON.stringify로 문자열로 바꾸고, JSON.parse로 다시 배열로 바꾼다.
        // 이렇게 되면 copyList에는 온전힌 데이터의 값이 복사된다.
        const copyList = JSON.parse(JSON.stringify(diaryList));

        // filter가 all이면 가공할 필요없이 그대로 반환, 그것이 아니면 filterCallBack 함수를 기준으로 filter() 함수를 사용한다.
        const filteredList =
            filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

        // 데이터를 sort 함수를 사용하여 정렬한다.
        const sortedList = filteredList.sort(compare);

        // 가공된 데이터를 반환한다.
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                <ControlMenu
                    value={sortType}
                    onChange={setSortType}
                    optionList={sortOptionList}
                />
                <ControlMenu
                    value={filter}
                    onChange={setFilter}
                    optionList={filterOptionList}
                />
                </div>
                <div className="right_col">
                <MyButton
                    type={"positive"}
                    text={"새 일기쓰기"}
                    onClick={() => navigate("/new")}
                />
                </div>
            </div>

            {/* 가공을 마친 데이터들을 map 함수로 풀어준다. */}
            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
