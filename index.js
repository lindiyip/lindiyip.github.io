var lookup_town = {};
var dropdown_town = [];

var lookup_type = {};
var dropdown_type = [];

var records;

var selectedTown = "";
var selectedType = "";

window.onload = function () {
  CallAPI();
};

// call API
async function CallAPI() {
  try {
    await $.ajax({
      url: "https://data.gov.sg/api/action/datastore_search",
      type: "GET",
      data: {
        resource_id: "f1765b54-a209-4718-8d38-a39237f502b3",
        limit: 1500,
      },
      // data: { resource_id: "1b702208-44bf-4829-b620-4615ee19b57c" },
      dataType: "JSON",
      success: function (data) {
        //
        // Accessing data in records

        records = data["result"]["records"];
        // console.log(records);
      },
    });
  } catch (e) {
    console.log("Unable to fetch data from API");
  }
}

// create droplist for towns
function GetTownDropdown() {
  for (let item, i = 0; (item = records[i++]); ) {
    let town_name = item.town;

    if (!(town_name in lookup_town)) {
      lookup_town[town_name] = 1;
      dropdown_town.push(town_name);
    }
  }
  dropdown_town.sort();
  $(function () {
    $.each(dropdown_town, function (i, option) {
      $("#selTown").append($("<option/>").attr("value", i).text(option));
    });
  });
}

// create droplist for flat type
function GetTypeDropdown() {
  for (let item, i = 0; (item = records[i++]); ) {
    let town_type = item.flat_type;

    if (!(town_type in lookup_type)) {
      lookup_town[town_type] = 1;
      dropdown_type.push(town_type);
    }
  }
  dropdown_town.sort();
  $(function () {
    $.each(dropdown_town, function (i, option) {
      $("#selTown").append($("<option/>").attr("value", i).text(option));
    });
  });
}

// fetch data button
function fetch() {
  console.log(records);
}

// Determine selected options at dropdown list
// const selTown = document.getElementById("selTown");
// selectedTown = selTown.options[selTown.selectedIndex];
// console.log(selectedTown);

// const selType = document.getElementById("selType");
// selectedType = selType.options[selType.selectedIndex];
// console.log(selectedType);

// Create bar graph for resale flat prices
// Flat model
// Price

// countOccurence = 0;
// totalAmount = 0;
// for (i = 0; 1 < records.length; i++) {
//   if (records.town == selectedTown) {
//     console.log("vaildated");
//     countOccurence += 1;
//     totalAmount += records.resale_price;
//   }
// }
// console.log(countOccurence);
// console.log(totalAmount);

// const ctx = $("#myChart");
// new Chart(ctx, {
//   type: "bar",
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
