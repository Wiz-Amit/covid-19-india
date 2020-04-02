const app = new Vue({
  el: "#recovery-and-death",
  data: {
    modifiedAt: "April 1'st 2020",
    orderByKey: "cr",
    filterByKey: "",
    records: [
      {
        state: "Andaman and Nicobar Islands",
        total: 10,
        recovered: 0,
        deaths: 0
      },
      { state: "Andhra Pradesh", total: 87, recovered: 2, deaths: 0 },
      { state: "Arunachal Pradesh", total: 0, recovered: 0, deaths: 0 },
      { state: "Assam", total: 5, recovered: 0, deaths: 0 },
      { state: "Bihar", total: 24, recovered: 0, deaths: 1 },
      { state: "Chandigarh", total: 15, recovered: 0, deaths: 0 },
      { state: "Chhattisgarh", total: 9, recovered: 2, deaths: 0 },
      { state: "Dadra and Nagar Haveli", total: 0, recovered: 0, deaths: 0 },
      { state: "Daman and Diu", total: 0, recovered: 0, deaths: 0 },
      { state: "Delhi", total: 123, recovered: 6, deaths: 2 },
      { state: "Goa", total: 5, recovered: 0, deaths: 0 },
      { state: "Gujarat", total: 82, recovered: 5, deaths: 6 },
      { state: "Haryana", total: 43, recovered: 27, deaths: 0 },
      { state: "Himachal Pradesh", total: 3, recovered: 1, deaths: 1 },
      { state: "Jammu and Kashmir", total: 62, recovered: 1, deaths: 2 },
      { state: "Jharkhand", total: 1, recovered: 0, deaths: 0 },
      { state: "Karnataka", total: 105, recovered: 9, deaths: 3 },
      { state: "Kerala", total: 265, recovered: 24, deaths: 2 },
      { state: "Ladakh", total: 13, recovered: 3, deaths: 0 },
      { state: "Lakshadweep", total: 0, recovered: 0, deaths: 0 },
      { state: "Madhya Pradesh", total: 86, recovered: 0, deaths: 6 },
      { state: "Maharashtra", total: 325, recovered: 39, deaths: 12 },
      { state: "Manipur", total: 1, recovered: 0, deaths: 0 },
      { state: "Meghalaya", total: 0, recovered: 0, deaths: 0 },
      { state: "Mizoram", total: 1, recovered: 0, deaths: 0 },
      { state: "Nagaland", total: 0, recovered: 0, deaths: 0 },
      { state: "Odisha", total: 4, recovered: 0, deaths: 0 },
      { state: "Puducherry", total: 3, recovered: 0, deaths: 0 },
      { state: "Punjab", total: 46, recovered: 1, deaths: 4 },
      { state: "Rajasthan", total: 108, recovered: 3, deaths: 0 },
      { state: "Sikkim", total: 0, recovered: 0, deaths: 0 },
      { state: "Tamil Nadu", total: 234, recovered: 6, deaths: 1 },
      { state: "Telangana", total: 97, recovered: 14, deaths: 6 },
      { state: "Tripura", total: 0, recovered: 0, deaths: 0 },
      { state: "Uttar Pradesh", total: 116, recovered: 17, deaths: 1 },
      { state: "Uttarakhand", total: 7, recovered: 2, deaths: 0 },
      { state: "West Bengal", total: 37, recovered: 3, deaths: 6 }
    ]
  },
  computed: {
    td: function() {
      let data = this.records;
      data.forEach(row => {
        row.cr =
          "00" +
          Math.round(((row.recovered + 1) / (row.recovered + row.deaths + 2)) * 100) +
          "%";
        row.cd =
          "00" + Math.round(((row.deaths + 1) / (row.recovered + row.deaths + 2)) * 100) + "%";

        row.cr = row.cr.slice(row.cr.length - 4);
        row.cd = row.cd.slice(row.cd.length - 4);
      });
      if (this.filterByKey) {
        data = data.filter(row => row.state == this.filterByKey);
      }
      return _.orderBy(data, this.orderByKey, "desc");
    }
  },
  methods: {
    orderBy: function(key) {
      if(this.orderByKey == key) this.orderByKey = "";
      else this.orderByKey = key;
    }
  }
});
