const app = new Vue({
  el: '#recovery-and-death',
  data: {
    orderByKey: 'cr',
    filterByKey: '',
    rawRecords: [],
    records: [],
  },
  mounted: function () {
    fetch('https://api.covid19india.org/data.json')
      .then((response) => response.json())
      .then((json) => {
        // console.table(json.statewise);
        this.rawRecords = json.statewise;

        this.records = this.rawRecords.filter(
          (r) =>
            r.state.toLowerCase() !== 'Total'.toLowerCase() &&
            r.state.toLowerCase() !== 'State Unassigned'.toLowerCase()
        );
      });
  },
  computed: {
    td: function () {
      let data = this.records;
      data.forEach((row) => {
        row.cr =
          '00' +
          Math.round(
            ((parseInt(row.recovered) + 1) /
              (parseInt(row.recovered) + parseInt(row.deaths) + 2)) *
              100
          ) +
          '%';
        row.cd =
          '00' +
          Math.round(
            ((parseInt(row.deaths) + 1) /
              (parseInt(row.recovered) + parseInt(row.deaths) + 2)) *
              100
          ) +
          '%';

        row.cr = row.cr.slice(row.cr.length - 4);
        row.cd = row.cd.slice(row.cd.length - 4);
      });
      if (this.filterByKey) {
        data = data.filter((row) => row.state == this.filterByKey);
      }
      return _.orderBy(data, this.orderByKey, 'desc');
    },
    modifiedAt: function () {
      if (!this.records[0]) return 'Unknown';
      const latestTime = this.rawRecords.find(
        (r) => r.state.toLowerCase() === 'Total'.toLowerCase()
      ).lastupdatedtime;

      return latestTime.slice(0, latestTime.length - 9);
    },
  },
  methods: {
    orderBy: function (key) {
      if (this.orderByKey == key) this.orderByKey = '';
      else this.orderByKey = key;
    },
  },
});
