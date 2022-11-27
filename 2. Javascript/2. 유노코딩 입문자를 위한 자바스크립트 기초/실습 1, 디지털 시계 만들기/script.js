// 요소 선택
const todayDiv = document.getElementById('today');
const timeDiv = document.getElementById('time');

// getTime 함수
function getTime(){
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;

  todayDiv.textContent = `${year}년 ${month}월 ${date}일`
  timeDiv.textContent = `${hour}:${minute}:${second}`
}

// setInterval 메소드
getTime()
setInterval(getTime, 1000);