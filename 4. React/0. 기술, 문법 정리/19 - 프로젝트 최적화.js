// 최적화를 위한 2가지 분석법.

// 동적 분석.

// 정적 분석.


// items의 리랜더링은 최적화의 주적이다.
// 이미지나 영상같은 고용량 요소들이 밀집되어 있기 때문.
// export default React.memo(DiaryItem);


// EmotionItem에 전달되는 handleClickEmote 함수를 useCallback 처리 해주어야 EmotionItem의 최적화도 가능해진다.
const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
}, []);

// 리랜더링 될 필요가 없는 EmotionItem 컴포넌트도 최적화해준다.
export default React.memo(EmotionItem);