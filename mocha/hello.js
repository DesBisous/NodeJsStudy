// hello.js

export default (...rest) => {
    var sum = 0;
    for (let n of rest) {
        sum += n;
    }
    return sum;
};
