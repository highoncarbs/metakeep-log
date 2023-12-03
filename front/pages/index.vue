<template>
  <section class="">
    <div class="level">
      <div class="level-left">

        <p class="title is-size-5 has-text-weight-semibold">Dashboard</p>
      </div>
      <div class="level-right is-hidden-touch">
        <button class="button level-item is-rounded is-light">
          <b-icon icon="account-circle" class="mr-2"></b-icon>
          <p class="">Padam Sethia</p>
        </button>
      </div>
    </div>

    <!-- Stats ? -->
    <div>
      <b-field grouped>
        <p class="control">
          <b-field label="Show Logs">
            <b-select v-model="showItems" placeholder="Show Logs">
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
            </b-select>

          </b-field>
        </p>
        <p class="control">

          <b-field>
            <b-field label="Select Timeframe">
              <b-select v-model="timeframe" placeholder="Show Logs">
                <option value="24hrs">Last 24 hrs</option>
                <option value="7days">Last 7 Days</option>
                <option value="custom">Select Custom Dates</option>
              </b-select>

            </b-field>

          </b-field>
        </p>
        <p class="fade-in control" v-if="timeframe == 'custom'">

          <b-field>
            <b-field label="Select Date Range">
              <b-datepicker placeholder="Click to select" range v-model="custom_range"></b-datepicker>

            </b-field>

          </b-field>
        </p>
        <p class="control">

          <b-field>
            <template #label>
              <span class="has-text-white">Action</span>
            </template>

            <button class="button is-link" @click="getData()">Submit</button>
          </b-field>
        </p>

      </b-field>
      <div class="columns">
        <div class="column is-4">
          <div class="box">

            <p class="heading">TOTAL REQUESTS</p>
            <p class="title has-text-weight-semibold">{{ totalItems }}</p>
            <p class="subtitle is-size-6">in last 1 hr</p>
          </div>

        </div>
        <div class="column is-4">
          <div class="box">

            <p class="heading">UNIQUE USERS</p>
            <p class="title has-text-weight-semibold">{{ unqUsers }}</p>
            <p class="subtitle is-size-6">in last 1 hr</p>
          </div>
        </div>
        <div class="column is-4">
          <div class="box">

            <p class="heading">FAILED REQUESTS</p>
            <p class="title has-text-weight-semibold">{{ failed }}</p>
            <p class="subtitle is-size-6">in last 1 hr</p>
          </div>
        </div>
      </div>
    </div>
    <br>


    <br>
    <div>
      <p class="heading">Select Logs</p>
      <div class="buttons">

        <button class="button is-info is-rounded" :class="{ 'is-light': activeTab != 0 }" @click="activeTab = 0">
          <b-icon icon="counter" class="mr-2"></b-icon>
          API
          Calls</button>
        <button class="button is-info  is-rounded" :class="{ 'is-light': activeTab != 1 }" @click="activeTab = 1">
          <b-icon icon="account-circle" class="mr-2"></b-icon>
          Unique
          Users</button>
        <button class="button is-danger  is-rounded" :class="{ 'is-light': activeTab != 2 }" @click="activeTab = 2">
          <b-icon icon="alert-circle" class="mr-2"></b-icon>
          Failed
          Calls</button>
      </div>
      <div class="box">

        <BarChart :data="chartData" />
      </div>


    </div>
    <br>

    <b-table paginated :total="totalItems" :data="tableData">
      <template #empty>
        <div class="box py-6">
          <figure class="image is-128x128 container pt-6">
            <img src="~/assets/empty.png" class="container" style="opacity:0.3" alt="">
          </figure>
          <br>
          <div class="has-text-centered pb-6 mt-5">

            <p>No logs found for

              <span v-if="timeframe == '24hrs'">

                last 24 hrs
              </span>
              <span v-if="timeframe == '7days'">

                last 7 Days
              </span>
              <span v-if="timeframe == 'custom'">
                <span class="has-text-grey is-underlined" v-if="custom_range.length == 0">
                  selected dates
                </span>
                <span class="has-text-grey is-underlined" v-if="custom_range.length != 0">
                  {{ new Date(custom_range[0]).toLocaleDateString('en-IN',
                    { 'month': 'long', 'day': 'numeric', 'year': 'numeric' }) }}
                  -
                  {{ new Date(custom_range[1]).toLocaleDateString('en-IN',
                    { 'month': 'long', 'day': 'numeric', 'year': 'numeric' }) }}
                </span>
              </span>
            </p>
            <p>Please change the filter options to view data</p>
          </div>
        </div>
      </template>
      <b-table-column width="10%" label="Timestamp" v-slot="props">
        <!-- <p>

        {{ new Date(props.row.timestamp).toLocaleDateString('en-IN',
        { 'hour': 'numeric', 'minutes': 'long', 'second': 'numeric' }) }}
        </p> -->
        <p>
          <span>

            {{ getDate(props.row.timestamp).format('DD/MM/YY HH:mm').split(' ')[0] }}
          </span>
          <span class="has-text-grey">
            {{ getDate(props.row.timestamp).format('DD/MM/YY HH:mm').split(' ')[1] }}
          </span>
        </p>

      </b-table-column>
      <b-table-column width="10%" label="Status" v-slot="props">

        <p class="">
          <span class="has-text-danger has-text-weight-semibold is-size-7" v-if="props.row.status != '200'">Failed</span>
          <span class="has-text-info is-size-7 has-text-weight-semibold" v-else>Success</span>
          <span class="tag is-rounded "
            :class="{ 'is-link is-light': props.row.status == '200', 'is-danger is-light': props.row.status != '200' }">

            {{ props.row.status }}
          </span>
        </p>
      </b-table-column>
      <b-table-column width="10%" label="User ID" v-slot="props">
        <span v-if="props.row.user_id">
          {{ props.row.user_id }}
        </span>
        <span v-else class="has-text-grey-light">
          None
        </span>
      </b-table-column>
      <b-table-column width="20%" label="Request" v-slot="props">
        <span v-if="props.row.req_obj">
          {{ props.row.req_obj }}
        </span>
        <span v-else class="has-text-grey-lighter">
          None
        </span> </b-table-column>
      <b-table-column width="20%" label="Response" v-slot="props">
        <span v-if="props.row.res_obj">
          {{ props.row.res_obj }}
        </span>
        <span v-else class="has-text-grey-lighter">
          None
        </span> </b-table-column>
      <b-table-column width="20%" label="Error" v-slot="props">
        <span v-if="props.row.error_mssg">
          {{ props.row.error_mssg }}
        </span>
        <span v-else class="has-text-grey-lighter">
          None
        </span>
      </b-table-column>
    </b-table>

  </section>
</template>

<script>
import moment from 'moment';
export default {
  name: 'IndexPage',
  components: {
  },
  data() {
    return {
      activeTab: 0,
      activeTab: 0,
      unqUsers: 20,
      failed: 20,
      showItems: 20,
      currentPage: 1,
      timeframe: "24hrs",
      custom_range: [],
      loading: true,
      totalItems: 1,
      tableData: [

      ],
    }
  },
  computed: {
    chartData() {
      if (this.activeTab == 0) {

        let graph_labels = {}
        this.tableData.filter((row) => {
          graph_labels[moment(row.timestamp).format('DD/MM/YYYY HH:mm')] = 0
        })
        this.tableData.filter((row) => {
          Object.keys(graph_labels).forEach((gr) => {
            if (gr == moment(row.timestamp).format('DD/MM/YYYY HH:mm')) {
              console.log()
              graph_labels[gr] = graph_labels[gr] + 1
            }
          })
        })
        return {
          // date_labels = 
          labels: Object.keys(graph_labels),
          datasets: [
            {
              label: 'Requests',
              data: Object.values(graph_labels),
              backgroundColor: 'rgba(20, 255, 0, 0.3)',
              borderColor: 'rgba(100, 255, 0, 1)',
              borderWidth: 2,
            },
          ],
        }
      }

      if (this.activeTab == 1) {

        let graph_labels = {}
        this.tableData.filter((row) => {
          graph_labels[moment(row.timestamp).format('DD/MM/YYYY HH:mm') + '-' + row.user_id] = 0
        })
        this.tableData.filter((row) => {
          Object.keys(graph_labels).forEach((gr) => {
            if (gr == moment(row.timestamp).format('DD/MM/YYYY HH:mm') + '-' + row.user_id) {
              graph_labels[gr] = graph_labels[gr] + 1
            }
          })
        })
        return {
          // date_labels = 
          labels: Object.keys(graph_labels).map(x => x.split('-')[0]),
          datasets: [
            {
              label: 'Users',
              data: Object.values(graph_labels),
              backgroundColor: 'rgba(20, 255, 0, 0.3)',
              borderColor: 'rgba(100, 255, 0, 1)',
              borderWidth: 2,
            },
          ],
        }


      }
      if (this.activeTab == 2) {

        let graph_labels = {}
        this.tableData.filter((row) => {
          graph_labels[moment(row.timestamp).format('DD/MM/YYYY HH:mm')] = 0
        })
        this.tableData.filter((row) => {
          Object.keys(graph_labels).forEach((gr) => {
            if (gr == moment(row.timestamp).format('DD/MM/YYYY HH:mm')) {
              if (row.status != '200') {

                graph_labels[gr] = graph_labels[gr] + 1
              }
            }
          })
        })
        return {
          // date_labels = 
          labels: Object.keys(graph_labels),
          datasets: [
            {
              label: 'Failed Requests',
              data: Object.values(graph_labels),
              backgroundColor: 'rgba(240, 0, 0,0.3)',
              borderColor: 'rgba(240, 58, 95,0.7)',
              borderWidth: 2,
            },
          ],
        }

      }


    },
  },
  mounted() {
    this.getData();
  },

  methods: {
    // getGraphRange(format_type, max_time, step) {

    //   const locale = 'en'; // or whatever you want...

    //   const hours = [];

    //   moment.locale(locale);  // optional - can remove if you are only dealing with one locale
    //   if (format_type == 'hrs') {

    //     for (let hour = 0; hour < max_time; hour++) {
    //       hours.push(moment({ hour }));
    //       hours.push(
    //         moment({
    //           hour,
    //           minute: step
    //         })
    //       );
    //     }
    //     console.log(hours)
    //     return hours
    //   }
    // },
    getDate(mm) {
      return moment(mm);
    },
    getData() {
      this.loading = true
      let params = {
        show: this.showItems,
        page: this.currentPage,
        time: this.timeframe,
        custom_time: this.custom_range,
      }
      this.$axios.get('/logs/get', { params: params }).then((response) => {
        this.tableData = response.data.data
        this.totalItems = response.data.meta['total_calls']
        this.unqUsers = response.data.meta['uq_users']
        this.failed = response.data.meta['failed']
        if (response.data.success) {
        }
      }).finally(() => {

        this.loading = false
      })
    }
  }
}
</script>

<style>
.box {
  box-shadow: none;
  border: 1px solid #dbdbdb;

}
</style>
