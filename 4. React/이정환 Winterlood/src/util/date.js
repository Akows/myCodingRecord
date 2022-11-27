// date input에 오늘 날짜가 표시되도록 하는 함수.

// date 객체를 전달받은 다음 toISOString()를 적용.
// ms 형식의 시간 데이터를 받아 년 - 월 - 일:분:초의 형태로 반환한다.

// 필요한 것은 년월일이니 결과값을 적절히 slice하여 반환한다.

export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
