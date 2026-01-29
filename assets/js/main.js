document.addEventListener("DOMContentLoaded", function () {
  highlightActiveNav();
  setupFadeInSections();
  loadLeaderboard("assets/data/leaderboard.csv", "leaderboard-body");
  loadLeaderboard("assets/data/leaderboard.csv", "mini-leaderboard-body", 3);
});

/**
 * Highlight active nav link based on current path.
 */
function highlightActiveNav() {
  var path = window.location.pathname;
  var mapping = {
    "home": ["/", "/index.html"],
    "announcements": ["/announcements.html"],
    "officers": ["/officers.html"],
    "leaderboard": ["/leaderboard.html"],
    "calendar": ["/calendar.html"]
  };

  Object.keys(mapping).forEach(function (key) {
    var links = document.querySelectorAll('a[data-nav="' + key + '"]');
    var isActive = mapping[key].some(function (p) {
      return path === p || path.endsWith(p);
    });
    if (isActive) {
      links.forEach(function (link) {
        link.classList.add("active");
      });
    }
  });
}

/**
 * Fade-in / slide-up animation using IntersectionObserver.
 */
function setupFadeInSections() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  var fadeSections = document.querySelectorAll(".fade-section, .card");
  fadeSections.forEach(function (el) {
    observer.observe(el);
  });
}

/**
 * Load leaderboard data from a local CSV file.
 * @param {string} csvPath - Relative path to the CSV file.
 * @param {string} tableBodyId - ID of the tbody element to populate.
 * @param {number} [limit] - Optional limit of rows to display.
 */
function loadLeaderboard(csvPath, tableBodyId, limit) {
  var tbody = document.getElementById(tableBodyId);
  if (!tbody) return;

  fetch(csvPath)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load leaderboard CSV");
      }
      return response.text();
    })
    .then(function (text) {
      var rows = parseCsv(text);
      // Expect header: Name,School,Points
      var data = rows.slice(1) // skip header
        .map(function (cols) {
          return {
            name: cols[0] || "",
            school: cols[1] || "",
            points: parseFloat(cols[2] || "0")
          };
        })
        .filter(function (row) {
          return row.name && !isNaN(row.points);
        })
        .sort(function (a, b) {
          return b.points - a.points;
        });

      if (typeof limit === "number") {
        data = data.slice(0, limit);
      }

      tbody.innerHTML = "";
      data.forEach(function (row, index) {
        var tr = document.createElement("tr");

        var rankTd = document.createElement("td");
        rankTd.textContent = index + 1;

        var nameTd = document.createElement("td");
        nameTd.textContent = row.name;

        var schoolTd = document.createElement("td");
        schoolTd.textContent = row.school;

        var pointsTd = document.createElement("td");
        pointsTd.textContent = row.points.toString();

        tr.appendChild(rankTd);
        tr.appendChild(nameTd);
        tr.appendChild(schoolTd);
        tr.appendChild(pointsTd);

        tbody.appendChild(tr);
      });
    })
    .catch(function () {
      // If CSV fails to load, show a simple message
      tbody.innerHTML = "<tr><td colspan='4'>Leaderboard data unavailable.</td></tr>";
    });
}

/**
 * Simple CSV parser for comma-separated values.
 * Handles basic quoted fields.
 * @param {string} text
 * @returns {string[][]}
 */
function parseCsv(text) {
  var rows = [];
  var currentRow = [];
  var currentValue = "";
  var inQuotes = false;

  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    var nextChar = i + 1 < text.length ? text[i + 1] : null;

    if (char === '"' && !inQuotes) {
      inQuotes = true;
    } else if (char === '"' && inQuotes) {
      if (nextChar === '"') {
        currentValue += '"';
        i++;
      } else {
        inQuotes = false;
      }
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentValue.trim());
      currentValue = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (currentValue.length > 0 || currentRow.length > 0) {
        currentRow.push(currentValue.trim());
        rows.push(currentRow);
        currentRow = [];
        currentValue = "";
      }
    } else {
      currentValue += char;
    }
  }

  if (currentValue.length > 0 || currentRow.length > 0) {
    currentRow.push(currentValue.trim());
    rows.push(currentRow);
  }

  return rows;
}