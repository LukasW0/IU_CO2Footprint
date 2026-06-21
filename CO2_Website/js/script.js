window.setDirection = function (direction) {
    
    document.documentElement.setAttribute("dir", direction);
    localStorage.setItem("direction", direction);
};

window.onload = function () {

    const savedDirection = localStorage.getItem("direction");

    if (savedDirection) {
        document.documentElement.setAttribute("dir", savedDirection);
    }
};