// GUI와 CLI
// 아이콘 등을 클릭하는 인터페이스 VS 사용자가 명령어를 직접 입력하는 인터페이스

// Node.js를 이용하여 js 파일을 직접 실행하는 명령어. node 실행하고자하는파일명 (node nodeJS)

console.log('Hello, Node.js!');

const calc = require('./calc');

let result = calc.add(1, 2);

console.log(result);