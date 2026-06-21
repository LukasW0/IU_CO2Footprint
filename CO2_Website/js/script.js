const countryFilter = document.getElementById("countryFilter");
const companyFilter = document.getElementById("companyFilter");

if (countryFilter && companyFilter) {
    countryFilter.addEventListener("input", filterTable);
    companyFilter.addEventListener("input", filterTable);
}

function filterTable() {
    const countryValue = countryFilter.value.toLowerCase().trim();
    const companyValue = companyFilter.value.toLowerCase().trim();
    const rows = document.querySelectorAll("#emissionsTable tbody tr");
    rows.forEach(function (row) {
        const country = row.cells[0].textContent.toLowerCase();
        const company = row.cells[1].textContent.toLowerCase();
        const countryMatches = country.includes(countryValue);
        const companyMatches = company.includes(companyValue);
        if (countryMatches && companyMatches) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function sortTable(columnIndex) {
    const table = document.getElementById("emissionsTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    rows.sort(function (a, b) {
        const valueA = a.cells[columnIndex].textContent.toLowerCase();
        const valueB = b.cells[columnIndex].textContent.toLowerCase();
        return valueA.localeCompare(valueB, "de");
    });
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });
}

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