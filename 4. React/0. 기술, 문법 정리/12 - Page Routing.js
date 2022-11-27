// 다양한 웹 서비스를 제공하기 위해서는 다수의 페이지를 구현할 필요가 있다.
// 이를 위해서는 웹 서버가 다수의 페이지를 관리하고, 서로 요청하는 방법을 알아야한다.

// Routing
// 네트워크 내에서 통신 데이터를 보낼 '경로'를 선택하는 과정들. 

// Router
// 데이터 경로를 실시간으로 지정해주는 요소.

// Page Routing 
// 브라우저에서 웹 서버에 url을 요청하면 웹 서버는 거기에 연결된 페이지를 보내준다.

// MPA
// 멀티페이지 어플리케이션.
// 여러 개의 페이지로 이루어진 웹 서비스 방식.

// SPA
// 싱글페이지 어플리케이션.
// 하나의 페이지로 이루어진 웹 서비스 방식.

// SSR
// 서버 사이드 렌더링.

// CSR
// 클라이언트 사이드 렌더링.

// React는 SPA - CSR 방식을 사용하고 있다.
// 웹 서버에게 url을 요청하여 페이지를 받는 것이 아닌, 리액트 앱이 브라우저 내에서 페이지를 업데이트 하는 방식.
// 페이지 이동과 관련하여 웹 서버와 통신을 하지 않아 더 빠른 작동이 가능해진다.

// React의 Page Routing 라이브러리.
// react-router-dom
// npm install react-router-dom@6

// BrowserRouter 태그 아래 있는 요소들은 모두 Routing이 가능해진다.
<BrowserRouter>
    <div className="App">

        {/* Routes 컴포넌트 밖에 위치한 요소들은 Routing과 상관없이 모든 상황에 화면에 출력된다. */}

        {/* Routing 되어야 하는 컴포넌트들은 모두 Routes 컴포넌트 아래 위치해야한다. */}
        <Routes>
            {/* url과 컴포넌트들을 매칭시키는 Route 컴포넌트가 위치한다. */}
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/diary/:id" element={<Diary />} />
        </Routes>
    </div>
</BrowserRouter>

// Link 컴포넌트.
// HTML에서 페이지 이동을 하는 역할은 a 태그.
// 그런데 a 태그는 새로고침을 발생시켜 SPA 방식에 올바르지 않다.
// 그래서 React-Router에서는 이를 대체할 update 방식의 Link 컴포넌트를 제공하고 있다.

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// react-router-dom v6의 유용한 기능들.

// Path Variable, useParams
// 경로에 변수를 사용하는 기법.
// 게시판의 상세 페이지의 경우, 컴포넌트 경로에 변수를 담아 전달할 필요가 있다.

{/* <Route path="/diary/:id" element={<Diary />} /> */}

// Route path의 url 위에 :과 전달할 변수명을 기재해 전달한다.
// 그런데 이렇게 되면 url에 무조건 id가 붙어야 하므로 경우에 따라서는 id가 없는 상태에서의 Route를 추가로 작성해줄 필요가 있다.

const { id } = useParams();

// diary 컴포넌트로 와서, Route path로 전달한 변수를 전달받아야한다.
// react-router-dom에서는 이를 위한 커스텀 hooks를 제공하고 있다. useParams();



// Query String, useSearchParams
// url과 함께 데이터를 전달하는 기법.
// Path Variable와 매우 흡사하지만, 웹 페이지에 데이터를 전달하는 역할도 겸한다.
// ? 를 경계선으로 url에 영향을 주지 않고, 특정 url에 여러 값들을 전달할 수 있다.

// edit?id=10&mode=dark

// 이를 받는 컴포넌트에서는 이렇게 값을 받아 사용한다.
const [searchParams, setSearchParams] = useSearchParams();

const mode = searchParams.get('mode');

// setSearchParams는 searchParams를 변경하는데 사용된다.

// () => setSearchParams({ who = 'lys '});
// Params의 key-vaule를 모두 재설정할 수 있다.



// Page Moving, useNavigate
// 페이지 이동을 함수에서 하는 기법.
// Link 태그에서의 동작 이외에 함수 내에서 사용자의 의사와 상관 없이 페이지를 이동시킬 수 있다.

const navigate = useNavigate();

// 함수 내부에서 사용하게되면 컴포넌트 url 경로를 /로 전환하여 업데이트해버린다.
navigate("/", { replace: true });

// 페이지 경로를 뒤로 한 단계 되돌린다.
navigate(-1);