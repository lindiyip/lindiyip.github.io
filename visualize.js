function fetch() {
  $.ajax({
    url: "https://data.gov.sg/api/action/datastore_search",
    type: "GET",
    data: { resource_id: "3a60220a-80ae-4a63-afde-413f05328914" },
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      // const records = data["result"]["records"];
    },
  });
}
