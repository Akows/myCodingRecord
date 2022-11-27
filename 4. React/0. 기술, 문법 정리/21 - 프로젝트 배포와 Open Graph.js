// Google Firebase를 이용한 프로젝트 배포.

// 프로젝트를 배포하기 위해서는 서버가 필요하다.
// 내가 직접 서버를 만드는 것은 돈과 시간과 노력을 너무 많이 잡아먹는다.
// 이를 대신해주는 수많은 서비스들이 존재한다.

// Firebase 가입.
// Firebase 콘솔에서 새 프로젝트 만들기.
// 프로젝트 이름 설정.
// 애널리틱스 설정. 사이트 방문객의 트래픽을 추적해주는 기능을 수행한다.

// 프로젝트 탭의 hosting 설정.
// Firebase CLI 설치. 윈도우 등지에서 명령 프롬프트에 Firebase 기능을 명령어로 이용할 수 있게 해주는 필수 툴.
// 명령 프롬프트를 실행시켜 출력되는 문구를 입력하여 CLI를 설치한다.

// 프로젝트에 접속하여 루트 경로에서 Firebase Login 명령어를 입력해준다.
// Firebase의 에러 수집 기능은 켜주는 것이 좋다.
// Firebase init, Firebase의 Hosting 서비스를 선택한다.

// Firebase에 만든 배포 프로젝트를 선택한다.
// 프로젝트 내부에서 배포 대상을 물어보는데, 기본값은 public이지만 배포는 build이므로 변경해준다.
// SPA 앱 확인해준다.
// 깃허브와 연동은 알아서.
// 이미 존재하는 프로젝트에 배포를 하게되면 index.html 페이지의 덮어쓰기 여부를 물어보는데, Yes로 답한다.

// Firebase deploy 명령어를 입력하면 배포 완료.
// 이후 정상 배포되는지 확인한다.

// 배포 이전에 커스텀 url을 설정할 수 있다.
// Firebase의 기본 틀을 벗어나진 못하지만 그래도 자신만의 명칭을 원한다면 설정하자.
// 생성된 url 명을 복사하여 Firebase.json의 site에 붙여넣기 해준다.
// 이후 빌드하고 Firebase deploy.

// Firebase의 경우 무료 요금제를 지원하기 때문에 제한량을 초과하지 않으면 호스팅에 비용이 발생하지 않는다.


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


// Open Graph
// 프로젝트 주소를 카카오톡 같은 곳에 올릴 경우, 이미지와 제목 등이 추가 출력되는 Open Graph 기능

<html lang="ko">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="나만의 감정 일기장" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        {/* Open Graph을 위한 meta 설정들. */}
        <meta property="og:image" content="%PUBLIC_URL%/thumbnail.png" />
        <meta property="og:site_name" content="감정 일기장" />
        <meta property="og:description" content="나만의 작은 감정 일기장" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        <title>감정 일기장</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
    </body>
</html>

// Open Graph가 제대로 작동하지 않을 경우 (카카오톡)
// 카카오톡 개발의 초기화 도구, OG 캐시 초기화 기능을 사용하면 된다.


// 완강! 축하합니다. 🎉

// 안녕하세요 한 입 크기로 잘라 먹는 리액트 강사 이정환 winterlood입니다 정말 고생 많으셨습니다!! 
// 💌 이번 강의는 제 인생 첫 강의 입니다. 첫 강의 인 만큼 실수도 잦았고 (5시간 분량의 편집 끝난 파일 삭제해 버리는 등등..)
//  여러분께 이래저래 불편함을 끼쳐 드린게 아닌가 싶어 걱정되기도 합니다. 그만큼 미흡한 부분들을 최대한 커버하기 위해 
//  밤낮으로 정말 많이 노력했어요! 혹시 가능하시다면 아주 간단하게라도! 수강평 남겨주시면 정말 감사드릴 것 같아요 ㅠㅠ! [수강생 전용 오픈채팅] 100명 이상의 수강생 분들이 서로 의견을 공유하고 함께 학습하는 오픈 채팅방이 있어요! 참여하셔서 궁금한 점도 바로바로 질문 하시고, 여러 의견 나누어보면 좋을 것 같습니다! https://open.kakao.com/o/gOWIoeKd 비밀번호 : wlreact