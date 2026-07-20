const countryFilter = document.getElementById("countryFilter");
const companyFilter = document.getElementById("companyFilter");

// Überprüfen, ob die Filterelemente existieren, bevor Event-Listener hinzugefügt werden
if (countryFilter && companyFilter) {

    countryFilter.addEventListener("input", filterTable);
    companyFilter.addEventListener("input", filterTable);
}

// Funktion zur Filterung der Tabelle auf Basis der Eingabewerte
function filterTable() {

    const countryValue = countryFilter.value.toLowerCase().trim();
    const companyValue = companyFilter.value.toLowerCase().trim();
    const rows = document.querySelectorAll("#emissionsTable tbody tr");

    // Durchlaufen der Tabellenzeilen und Überprüfung, ob sie den Filterkriterien entsprechen
    rows.forEach(function (row) {

        const country = row.cells[0].textContent.toLowerCase();
        const company = row.cells[1].textContent.toLowerCase();
        const countryMatches = country.includes(countryValue);
        const companyMatches = company.includes(companyValue);

        // Zeige die Zeile an, wenn beide Filterkriterien erfüllt sind, andernfalls verstecke sie
        if (countryMatches && companyMatches) {
            row.style.display = "";

        } else {
            row.style.display = "none";
        }
    });
}

// Funktion zum Sortieren der Tabelle basierend auf der Spaltenindex
let sortAscending = true;

// Sortierfunktion für die Tabelle
function sortTable(columnIndex) {

    const table = document.getElementById("emissionsTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // Sortieren der Zeilen basierend auf dem Textinhalt der Zellen in der angegebenen Spalte
    rows.sort(function (a, b) {
        const valueA = a.cells[columnIndex].textContent.toLowerCase();
        const valueB = b.cells[columnIndex].textContent.toLowerCase();

            // Verwenden von localeCompare für die Sortierung, um Umlaute korrekt zu behandeln
            return sortAscending
                ? valueA.localeCompare(valueB, "de")
                : valueB.localeCompare(valueA, "de");
    });

    // Entfernen der vorhandenen Zeilen aus dem tbody
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });

    sortAscending = !sortAscending;
}

// Funktion zum Setzen der Textausrichtung (LTR oder RTL) und Speichern in localStorage
window.setDirection = function (direction) {

    document.documentElement.setAttribute("dir", direction);
    localStorage.setItem("direction", direction);
};

// Beim Laden der Seite die gespeicherte Textausrichtung aus localStorage abrufen und anwenden
window.onload = function () {

    const savedDirection = localStorage.getItem("direction");

    // Wenn eine gespeicherte Richtung vorhanden ist, diese anwenden
    if (savedDirection) {
        document.documentElement.setAttribute("dir", savedDirection);
    }
};