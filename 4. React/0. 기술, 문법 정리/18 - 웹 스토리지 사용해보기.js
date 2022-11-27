// 웹 스토리지.
// 클라이언트에 데이터를 저장할 수 있도록 지원하는 HTML5의 새로운 기능

// 자바스크립트에서 사용하는 기본적인 저장 공간은 휘발성을 지닌다.
// 코드 내에서 아무리 데이터를 쌓고 저장해봐야 페이지가 꺼지는 순간 모두 사라지고 만다.

// 정식 DB 이외에도 웹 브라우저에는 key-value 형태로 데이터를 저장하는 공간이 존재한다.

// 로컬 스토리지 (Local Storage)
// 브라우저에 반영구적으로 데이터를 저장하며, 브라우저를 종료해도 데이터가 유지된다. 
// 브라우저 자체에 반영구적으로 데이터가 유지되지만, 도메인(domain)이 다른 경우에는 로컬 스토리지에 접근할 수 없다.

// 세션 스토리지 (Session Storage)
// 각 세션마다 데이터가 개별적으로 저장된다. 예를 들어, 브라우저에서 여러개의 탭을 실행하면 탭마다 개별적으로 데이터가 저장되는 것이다. 
// 세션 스토리지는 로컬 스토리지와 다르게 세션을 종료하면 데이터가 자동으로 제거되며, 같은 도메인이라도 세션이 다르면 데이터에 접근할 수 없다. 


// 객체 형식의 데이터는 웹 스토리지에서 받아들일 수 없다.
// 따라서 JSON.stringify로 문자열 형태로 직렬화 해주어야 저장이 가능하다.
localStorage.setItem("diary", JSON.stringify(newState));

useEffect(() => {
    const localData = localStorage.getItem("diary");

    if (localData) {
        // 웹 스토리지의 데이터는 직렬화되어 저장되어있으나, 꺼내올때는 다시 JSON 형태로 전환해주어야 사용할 수 있다.
        const diaryList = JSON.parse(localData).sort(
            // 그런데 데이터를 불러올 때, id의 값을 한번 다시 정렬해주어야 한다.
            // 새 일기를 작성 할때 id 값은 웹 스토리지의 데이터와 상관 없이 App의 내장 기능으로 작성되고 있기 때문.
            (a, b) => parseInt(b.id) - parseInt(a.id)
        );

        // 기존에 일기 데이터가 존재하는 경우.
        // 만약 일기 데이터가 존재하지 않는 경우, diaryList[0]은 존재하지 않기 때문에 에러가 발생한다.
        // 따라서 반드시 if 처리를 해주어야 한다.
        if (diaryList.length >= 1) {
            // 가장 앞에 존재하는 일기 데이터의 id값보다 1 많은 수를 다음 데이터의 dataId값으로 지정한다.
            dataId.current = parseInt(diaryList[0].id) + 1;
            dispatch({ type: "INIT", data: diaryList });
        }
    }
}, []);

