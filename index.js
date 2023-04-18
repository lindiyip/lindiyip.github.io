var lookup_town = {};
var result_town = [];

var lookup_type = {};
var result_type = [];

var records = {};

// fetch data button
function fetch() {
  $.ajax({
    url: "https://data.gov.sg/api/action/datastore_search",
    type: "GET",
    data: { resource_id: "1b702208-44bf-4829-b620-4615ee19b57c" },
    dataType: "JSON",
    success: function (data) {
      console.log(data["result"]);
      var records = data["result"]["records"];
      console.log(records);

      let tbodyEl = $("#targetElement"); // HTML Element where we will render data into
      records.forEach((r) => {
        tbodyEl.append("<tr>");
        tbodyEl.append(`<td>${r.town}</td>`);
        // tbodyEl.append(`<td> </td>`);
        tbodyEl.append(`<td>${r.lease_commence_date}</td>`);
        // tbodyEl.append(`<td> </td>`);
        tbodyEl.append(`<td>${r.flat_type}</td>`);
        // tbodyEl.append(`<td> </td>`);
        tbodyEl.append(`<td>${r.resale_price}</td>`);
        tbodyEl.append("</tr>");
      });

      // create droplist_town
      var items_town = records;
      for (let item, i = 0; (item = items_town[i++]); ) {
        let name = item.town;

        if (!(name in lookup_town)) {
          lookup_town[name] = 1;
          result_town.push(name);
        }
      }
      result_town.sort();
      console.log(result_town);

      // create droplist_type
      var items_type = records;
      for (let item, i = 0; (item = items_type[i++]); ) {
        let name = item.flat_type;

        if (!(name in lookup_type)) {
          lookup_type[name] = 1;
          result_type.push(name);
        }
      }
      result_type.sort();
      console.log(result_type);
    },
  });
}

// toggle between hiding and showing the dropdown content */
function dropdownTown(e) {
  document.getElementById("town").classList.toggle("show");
}

// function dropdownTown(e) {
//   let select = document.createElement("select");
//   select.name = "town";
//   select.id = "town";

//   for (const val of result_town) {
//     let option = document.createElement("option");
//     option.value = val;
//     select.appendChild(option);
//   }
//   document.getElementById("town").appendChild(select);
// }

function dropdownFlat(e) {
  document.getElementById("flatModel").classList.toggle("show");
}
function dropdownLease(e) {
  document.getElementById("lease").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// line graph - resale flat prices
// const ctx = $("#myChart");

// new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: records.map((row) => row.timestamp),
//     datasets: [
//       {
//         label: "timestamp",
//         data: records.map((row) => row.value),
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });
