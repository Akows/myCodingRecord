
const authorInput = useRef();
const contentInput = useRef();

const handleSubmit = () => {
    // author를 1글자도 입력하지 않았을 경우.
    if (state.author.length < 1) {

        // 데이터를 전송하는데 필요한 최소한의 정보가 입력되지 않았을 때.
        // alert을 마냥 사용하는 것은 그렇게 스마트한 방법은 아니다.
        // alert('글자가 입력되지 않았습니다.');

        // useRef로 input 태그를 조작하고, focus 함수를 이용하면 사용자가 입력하지 않은 부분에 강제로 focus를 지정할 수 있다.
        authorInput.current.focus();

        // 빈 return으로 함수를 도중 중단시킨다.
        return;
    }

    if (state.content.length < 5) {
        contentInput.current.focus();
        return;
    }

    console.log(state);
    alert("저장 성공!");
};