var lookup_town = {};
var dropdown_town;

var lookup_type = {};
var dropdown_type;

var records;
var myChart;

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
        limit: 50000,
      },
      // data: { resource_id: "1b702208-44bf-4829-b620-4615ee19b57c" },
      dataType: "JSON",
      success: function (data) {
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
  setTimeout(() => {
    dropdown_town = [];
    for (let item, j = 0; (item = records[j++]); ) {
      let town_name = item.town;

      if (!(town_name in lookup_town)) {
        lookup_town[town_name] = 1;
        dropdown_town.push(town_name);
      }
    }
    dropdown_town.sort();
    const town_list = $("#selTown");
    for (let i = 0; i < dropdown_town.length; i++) {
      town_list.append(`<option>${dropdown_town[i]}</option>`);
    }
  }, 700);
}

// create droplist for flat type
function GetTypeDropdown() {
  setTimeout(() => {
    dropdown_type = [];
    for (let item, i = 0; (item = records[i++]); ) {
      let flat_type = item.flat_type;

      if (!(flat_type in lookup_type)) {
        lookup_type[flat_type] = 1;
        dropdown_type.push(flat_type);
      }
    }
    dropdown_type.sort();
    const type_list = $("#selType");
    for (let j = 0; j < dropdown_type.length; j++) {
      type_list.append(`<option>${dropdown_type[j]}</option>`);
    }
  }, 700);
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;

// fetch data button
function fetch() {
  setTimeout(() => {
    // Determine selected options at dropdown list

    const selTown = document.getElementById("selTown");
    selectedTown = selTown.options[selTown.selectedIndex].innerHTML;
    // console.log(selectedTown);

    const selType = document.getElementById("selType");
    selectedType = selType.options[selType.selectedIndex].innerHTML;
    // console.log(selectedType);

    if (selectedTown == "Choose preferred town") {
      alert("Please select a town.");
    } else if (selectedType == "Choose preferred flat type") {
      alert("Please select a flat type.");
    } else {
      const flat_prices = {};
      for (let item, i = 0; (item = records[i++]); ) {
        const town = item.town;
        const type = item.flat_type;
        // console.log(item.month);
        const year = item.month.slice(0, 4);
        const price = parseInt(item.resale_price);
        if (town == selectedTown && type == selectedType) {
          if (!(year in flat_prices)) {
            flat_prices[year] = [price];
          } else {
            flat_prices[year].push(price);
          }
        }
      }
      for (const [key, value] of Object.entries(flat_prices)) {
        flat_prices[key] = average(flat_prices[key]);
      }
      // console.log(flat_prices);
      if (Object.keys(flat_prices).length === 0) {
        alert("No flats found. Please select another Town or Flat Type");
      } else {
        const ctx = $("#Resale_Chart");

        if (!(myChart === undefined)) {
          // console.log("removing previous chart");
          myChart.destroy();
        }
        myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: Object.keys(flat_prices),
            datasets: [
              {
                label: "Resale Price",
                data: Object.values(flat_prices),
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, 700);
}
