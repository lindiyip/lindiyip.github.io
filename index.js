var lookup_town = {};
var dropdown_town = [];

var lookup_type = {};
var dropdown_type = [];

var records = {};

// call API
$.ajax({
  url: "https://data.gov.sg/api/action/datastore_search",
  type: "GET",
  data: { resource_id: "1b702208-44bf-4829-b620-4615ee19b57c" },
  dataType: "JSON",
  success: function (data) {
    // console.log(data["result"]);
    var records = data["result"]["records"];
    // console.log(records);

    // create droplist_town
    var items_town = records;
    for (let item, i = 0; (item = items_town[i++]); ) {
      let name = item.town;

      if (!(name in lookup_town)) {
        lookup_town[name] = 1;
        dropdown_town.push(name);
      }
    }
    dropdown_town.sort();
    $(function () {
      console.log(dropdown_town);
      $.each(dropdown_town, function (i, option) {
        $("#selTown").append($("<option/>").attr("value", option).text(option));
      });
    });

    // create droplist_type
    var items_type = records;
    for (let item, i = 0; (item = items_type[i++]); ) {
      let name = item.flat_type;

      if (!(name in lookup_type)) {
        lookup_type[name] = 1;
        dropdown_type.push(name);
      }
    }
    dropdown_type.sort();
    // console.log(dropdown_type);
    $(function () {
      console.log(dropdown_type);
      $.each(dropdown_type, function (i, option) {
        $("#selType").append($("<option/>").attr("value", option).text(option));
      });
    });
  },
});

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
    },
  });

  // User dropdown selection
  var townSelection = document.getElementById("selTown").value;
  document.getElementById("demo1").innerHTML = townSelection;
  console.log(townSelection);

  var typeSelection = document.getElementById("selType").value;
  document.getElementById("demo2").innerHTML = typeSelection;
  console.log(typeSelection);
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
