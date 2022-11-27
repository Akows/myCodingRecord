const addFunction = (num1, num2) => {
    return num1 + num2;
}

const minusFunction = (num1, num2) => {
    return num1 + num2;
}

// 제작한 기능을 외부로 내보내기 위해서 사용하는 module.exports
module.exports = {
    modulename: "calc module",
    add: addFunction,
    minus: minusFunction
}