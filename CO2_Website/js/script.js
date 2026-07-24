const countryFilter = document.getElementById("countryFilter");
const companyFilter = document.getElementById("companyFilter");

const DISALLOWED_CHARS = /[^\p{L}\p{N}\s\-]/gu;

// Mapping der Textausrichtung auf die entsprechende Sprache
const LANG_BY_DIRECTION = {
    ltr: "de",
    rtl: "ar"
};

// Funktion zur Bereinigung der Eingabewerte, um unerwünschte Zeichen zu entfernen
function sanitizeInput(rawValue) {
    return rawValue.replace(DISALLOWED_CHARS, "");
}

// Event-Handler für die Eingabe in den Filterfeldern
function handleFilterInput(event) {
    const field = event.target;
    const cleanedValue = sanitizeInput(field.value);

    // Aktualisieren des Feldwerts nur, wenn sich der bereinigte Wert vom aktuellen Wert unterscheidet
    if (cleanedValue !== field.value) {
        field.value = cleanedValue;
    }

    filterTable();
}

// Überprüfen, ob die Filterelemente existieren, bevor Event-Listener hinzugefügt werden
if (countryFilter && companyFilter) {

    countryFilter.addEventListener("input", handleFilterInput);
    companyFilter.addEventListener("input", handleFilterInput);
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

        } 
        else {
            row.style.display = "none";
        }
    });
}

// Funktion zum Sortieren der Tabelle basierend auf der Spaltenindex
let sortColumn = -1;
let sortAscending = true;

// Sortierfunktion für die Tabelle
function sortTable(columnIndex) {

    const table = document.getElementById("emissionsTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // Überprüfen, ob die gleiche Spalte erneut sortiert wird, um die Sortierreihenfolge umzukehren
    if (columnIndex === sortColumn) {
        sortAscending = !sortAscending;
    } 
    else {
        sortColumn = columnIndex;
        sortAscending = true;
    }

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

    updateSortIndicators(columnIndex);
}

// Funktion zum Aktualisieren der Sortiersymbole und aria-sort-Attribute in den Tabellenköpfen
function updateSortIndicators(columnIndex) {
    const headers = document.querySelectorAll("#emissionsTable thead th.sortable");

    // Aktualisieren der Sortiersymbole und aria-sort-Attribute für die Tabellenköpfe
    headers.forEach(function (header, index) {
        const icon = header.querySelector(".sort-icon");

        // Setzen der aria-sort-Attribute und Aktualisieren der Sortiersymbole basierend auf der aktuellen Sortierreihenfolge
        if (index === columnIndex) {
            header.setAttribute("aria-sort", sortAscending ? "ascending" : "descending");
            if (icon) { icon.textContent = sortAscending ? "↑" : "↓"; }
            } 
            else {
            header.setAttribute("aria-sort", "none");
            if (icon) { icon.textContent = "↕"; }
        }
    });
} 

// Hinzufügen von Tastaturzugänglichkeit für die Sortierfunktion
document.querySelectorAll("#emissionsTable thead th.sortable").forEach(function (header, index) {
    header.setAttribute("tabindex", "0");
    header.setAttribute("role", "button");

    // Event-Listener für Tastaturereignisse, um die Sortierfunktion bei Enter oder Leertaste auszulösen
    header.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            sortTable(index);
        }
    });
});

// Funktion zum Setzen der Textausrichtung (LTR oder RTL) und Speichern in localStorage
window.setDirection = function (direction) {

    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", LANG_BY_DIRECTION[direction] ?? "de");
    localStorage.setItem("direction", direction);
};

// Beim Laden der Seite die gespeicherte Textausrichtung aus localStorage abrufen und anwenden
window.onload = function () {

    const savedDirection = localStorage.getItem("direction");

    // Wenn eine gespeicherte Richtung vorhanden ist, diese anwenden
    if (savedDirection) {
        setDirection(savedDirection);
    }
};