import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
    // App에서 context로 전달되는 data를 받아온다.
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);

    // 현재 시각을 받아 state로 관리.
    const [curDate, setCurDate] = useState(new Date());
    // 시간 state를 받아서 필요한 형태로 가공.
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장`;
    }, []);

    // diaryList, curDate가 변화할 때마다 동작할 내용.
    useEffect(() => {
        // diaryList가 비어있으면 아래 코드는 동작할 필요가 없으니 if문 처리.
        if (diaryList.length >= 1) {
            
        // 당년도, 당월의 첫 날의 ms 시간.
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        // 당년도, 당월의 마지막 날의 ms 시간.
        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            // 마지막 날의 경우 자정 직전까지 시간을 가져와야 한다.
            0,
            23,
            59,
            59
        ).getTime();

        // 일기가 작성된 시간이 firstDay 보다 뒤이고, lastDay 보다 앞에 있는 데이터만 set.
        setData(
            diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
        );
        } else {
        setData([]);
        }
    }, [diaryList, curDate]);

    // 시간 state를 변경하는 함수들.
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
    };

    // 시간 state를 변경하는 함수들.
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
    };

    return (
        <div>
        <MyHeader
            headText={headText}
            leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
            rightChild={<MyButton text={">"} onClick={increaseMonth} />}
        />
        <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;
