const app = new Vue({
  el: "#recovery-and-death",
  data: {
    modifiedAt: "April 5th 2020",
    orderByKey: "cr",
    filterByKey: "",
    records: []
  },
  mounted: function() {
    fetch("./assets/covid19-data.json")
      .then(response => response.json())
      .then(json => this.records = json);
  },
  computed: {
    td: function() {
      let data = this.records;
      data.forEach(row => {
        row.cr =
          "00" +
          Math.round(
            ((row.recovered + 1) / (row.recovered + row.deaths + 2)) * 100
          ) +
          "%";
        row.cd =
          "00" +
          Math.round(
            ((row.deaths + 1) / (row.recovered + row.deaths + 2)) * 100
          ) +
          "%";

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
      if (this.orderByKey == key) this.orderByKey = "";
      else this.orderByKey = key;
    }
  }
});
