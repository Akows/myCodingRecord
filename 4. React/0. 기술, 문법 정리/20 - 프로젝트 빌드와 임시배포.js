// 프로젝트 빌드의 준비과정.

// 프로젝트를 실행시키게 되면, 탭의 이름은 React App으로 고정되어 있다.
// 그런데 탭의 이름은 곧 기능의 설명이기도 하다.
// 당연히 알맞는 내용이 출력되도록 만들어야한다.



// <!DOCTYPE html>
// 페이지의 기본 언어 설정이 잘못되어 있으면 자동 번역 기능이 동작할 수도 있다.
<html lang="ko">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="나만의 감정 일기장" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        <title>감정 일기장</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
    </body>
</html>

// 위와 같은 방식은 탭의 이름을 동적으로 바꿀 수 없다.
// 각 컴포넌트별로 탭의 이름을 바꾸는 방법은 다음과 같다.
useEffect(() => {
    // 태그 이름이 title인 요소들을 모두 가져오되, 가장 첫번째 것을 가져온다.
    // 탭의 이름을 제어하는 title 태그는 리액트 구조에서 가장 앞에 위치할 수 밖에 없다.
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
}, []);

// 다음은 탭 이미지를 변경해야한다.
// public 폴더 내부의 favicon.ico가 탭 이미지에 해당한다.

// 다음은 빌드.
// React는 개발시에 필요한 많은 모듈 등을 같이 설치시킨다.
// 이를 그대로 배포하게되면 사용하지 않는 파일들이 차지하는 용량이 너무 많아진다.
// React에서는 이런 압축작업을 build 기능을 지원하여 대신해준다.

// 배포.
// 배포를 대신해주는 serve라는 모듈이 존재한다.
// npm install -g serve

// serve -s build
// serve가 빌드한 파일을 자동으로 배포해준다.

// 실제 배포에 들어가기 전에 로컬을 이용한 배포로 테스트를 수행해보는 것이 좋다.
// 실제 배포에 들어가면서 테스트를 하는건 효율적이지 못하기 때문.