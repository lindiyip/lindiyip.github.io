function fetch() {
  $.ajax({
    url: "https://data.gov.sg/api/action/datastore_search",
    type: "GET",
    data: { resource_id: "1b702208-44bf-4829-b620-4615ee19b57c" },
    dataType: "JSON",
    success: function (data) {
      console.log(data["result"]["records"]);
      const records = data["result"]["records"];
      // ---- USE CODE UP TILL HERE --------

      // FOR DATA VISUAL ONLY
      let tbodyEl = $("#targetElement"); // HTML Element where we will render data into
      records.forEach((r) => {
        tbodyEl.append("<tr>");
        tbodyEl.append(`<td>${r.town}</td>`);
        tbodyEl.append(`<td> </td>`);
        tbodyEl.append(`<td>${r.lease_commence_date}</td>`);
        tbodyEl.append(`<td> </td>`);
        tbodyEl.append(`<td>${r.flat_type}</td>`);
        tbodyEl.append(`<td> </td>`);
        tbodyEl.append(`<td>${r.resale_price}</td>`);
        tbodyEl.append("</tr>");
      });
    },
  });
}
