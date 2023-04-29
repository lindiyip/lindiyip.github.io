var lookup_town = {};
var dropdown_town;

var lookup_type = {};
var dropdown_type;

var records;
var recordsRental;
var myChart;
var rentalChart;

var selectedTown = "";
var selectedType = "";

window.onload = function () {
  CallAPI();
  CallAPIRental();
};

// Get resale flat information
async function CallAPI() {
  try {
    await $.ajax({
      url: "https://data.gov.sg/api/action/datastore_search",
      type: "GET",
      data: {
        resource_id: "f1765b54-a209-4718-8d38-a39237f502b3",
        limit: 150000,
      },
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

// Get rental flat information
async function CallAPIRental() {
  try {
    await $.ajax({
      url: "https://data.gov.sg/api/action/datastore_search",
      type: "GET",
      data: {
        resource_id: "9caa8451-79f3-4cd6-a6a7-9cecc6d59544",
        limit: 83000,
      },
      dataType: "JSON",
      success: function (data) {
        // Accessing data in records
        recordsRental = data["result"]["records"];
        // console.log(recordsRental);
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

    // For getting resale town list
    for (let item, j = 0; (item = records[j++]); ) {
      let town_name = item.town;

      if (!(town_name in lookup_town)) {
        lookup_town[town_name] = 1;
        dropdown_town.push(town_name);
      }
    }

    // For getting rental town list
    for (let item, n = 0; (item = recordsRental[n++]); ) {
      let town_rental = item.town;

      if (!(town_rental in lookup_town)) {
        lookup_town[town_rental] = 1;
        dropdown_town.push(town_rental);
      }
    }

    dropdown_town.sort();
    const town_list = $("#selTown");
    for (let i = 0; i < dropdown_town.length; i++) {
      town_list.append(`<option>${dropdown_town[i]}</option>`);
    }
  }, 1000);
}

// create droplist for flat type
function GetTypeDropdown() {
  setTimeout(() => {
    dropdown_type = [];

    // For getting resale type list
    for (let item, i = 0; (item = records[i++]); ) {
      let flat_type = item.flat_type;
      if (!(flat_type in lookup_type)) {
        lookup_type[flat_type] = 1;
        dropdown_type.push(flat_type);
      }
    }

    // For getting rental type list
    for (let item, m = 0; (item = recordsRental[m++]); ) {
      let flat_type_rental = item.flat_type;
      flat_type_rental = flat_type_rental.replace("-", " ");
      if (!(flat_type_rental in lookup_type)) {
        lookup_type[flat_type_rental] = 1;
        dropdown_type.push(flat_type_rental);
      }
    }

    dropdown_type.sort();
    const type_list = $("#selType");
    for (let j = 0; j < dropdown_type.length; j++) {
      type_list.append(`<option>${dropdown_type[j]}</option>`);
    }
  }, 1000);
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
      // Resale flat prices calculations
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
        flat_prices[key] = average(flat_prices[key]).toFixed(2);
      }
      // console.log(flat_prices);
      if (Object.keys(flat_prices).length === 0) {
        alert("No resale flats found. Please select another Town or Flat Type");
      } else {
        // Unhide rental graph if data is available
        const hideResaleTitle = $("#Resale_Title")[0];
        hideResaleTitle.classList.remove("hide");

        const hideResale = $("#Resale_Chart")[0];
        hideResale.classList.remove("hide");

        // To generate resale flat graph
        if (!(myChart === undefined)) {
          // console.log("removing previous chart");
          myChart.destroy();
        }

        var options_resale = {
          chart: {
            id: "Rental_Chart",
            group: "housing",
            type: "area",
            height: 250,
          },
          series: [
            {
              name: "Resale flat prices",
              data: Object.values(flat_prices),
            },
          ],
          xaxis: {
            categories: Object.keys(flat_prices),
          },
          yaxis: {
            labels: {
              minWidth: 40,
            },
          },
        };

        myChart = new ApexCharts(
          document.querySelector("#Resale_Chart"),
          options_resale
        );

        myChart.render();
      }

      // Rental prices calculation
      const rental_prices = {};
      for (let item, j = 0; (item = recordsRental[j++]); ) {
        const town = item.town;
        const type = item.flat_type.replace("-", " ");
        const year = item.rent_approval_date.slice(0, 4);
        let price = parseInt(item.monthly_rent);
        if (town == selectedTown && type == selectedType) {
          if (!(year in rental_prices)) {
            rental_prices[year] = [price];
          } else {
            rental_prices[year].push(price);
          }
        }
      }
      for (const [key, value] of Object.entries(rental_prices)) {
        rental_prices[key] = average(rental_prices[key]).toFixed(2);
      }

      if (Object.keys(rental_prices).length === 0) {
        alert("No rental flats found. Please select another Town or Flat Type");
      } else {
        // Append data to sync x-axis for synchronise chart
        rental_prices[2017] = "0";
        rental_prices[2018] = "0";
        rental_prices[2019] = "0";
        rental_prices[2020] = "0";

        // Unhide rental graph if data is available
        const hideRentalTitle = $("#Rental_Title")[0];
        hideRentalTitle.classList.remove("hide");

        const hideRental = $("#Rental_Chart")[0];
        hideRental.classList.remove("hide");

        // To generate rental graph
        if (!(rentalChart === undefined)) {
          // console.log("removing previous chart");
          rentalChart.destroy();
        }
        var options_rent = {
          chart: {
            id: "Rental_Chart",
            group: "housing",
            type: "line",
            height: 250,
          },
          series: [
            {
              name: "Rental flat prices",
              data: Object.values(rental_prices),
            },
          ],
          xaxis: {
            categories: Object.keys(rental_prices),
          },
          yaxis: {
            labels: {
              minWidth: 40,
            },
          },
        };

        rentalChart = new ApexCharts(
          document.querySelector("#Rental_Chart"),
          options_rent
        );

        rentalChart.render();
      }
    }
  }, 700);
}
