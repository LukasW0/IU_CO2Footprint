window.setDirection = function (direction) {
    alert("Button wurde geklickt!");

    document.documentElement.setAttribute("dir", direction);
    localStorage.setItem("direction", direction);
};

window.onload = function () {
    
    const savedDirection = localStorage.getItem("direction");

    if (savedDirection) {
        document.documentElement.setAttribute("dir", savedDirection);
    }
};