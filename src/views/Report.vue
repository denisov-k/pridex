<template>
  <div class="container-fluid report">
    <div class="row">
      <div class="col-xs-12">
        <filter-list :values="data" ref="filter"></filter-list>
      </div>
    </div>
    <div class="row" v-if="entity">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" v-for="metric in metricsList">
        <k-p-i :title="metric.title" :subtitle="entity[metric.name]"
               :style="{'-border-color': metric.color}"></k-p-i>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <chart1 :data.sync="entity.entry_dynamics"></chart1>
        <chart2 :data.sync="entity.exit_dynamics"></chart2>
      </div>
    </div>
  </div>
</template>

<script>
import FilterList from "@/components/Report1/FilterList.vue";
import KPI from "@/components/Report1/KPI.vue";
import Chart1 from "@/components/Report1/Chart1/Chart.vue";
import Chart2 from "@/components/Report1/Chart2/Chart.vue";
import axios from "axios";

export default {
  name: "Report",
  components: {
    KPI,
    Chart1,
    Chart2,
    FilterList
  },
  computed: {
    metricsList() {
      return this.metrics.filter((item, index) => this.entity[item.name])
    }
  },
  data: () => {
    return {
      title: 'Пример аналитического экрана',
      subtitle: 'Ещё один заголовок',
      dataURL: 'data/report.json',
      data: [],
      entity: null,
      metrics: [
        { name: 'building_size', title: 'Размер здания', color: '#4aa78e' },
        { name: 'number_of_floors', title: 'Количество этажей в здании', color: '#4a99a7' },
        { name: 'number_of_entries', title: 'Въезды', color: '#206291' },
        { name: 'number_of_exits', title: 'Выезды', color: '#18298a' },
        { name: 'number_of_parking_spaces', title: 'Количество парковочных мест (ПМ)', color: '#5e4aa7' },
        { name: 'entry_camera', title: 'Камера на въезд', color: '#934aa7' },
        { name: 'check_out_camera', title: 'Камера на выезд ', color: '#a74a55' },
        { name: 'presence_sensor', title: 'Датчик присутствия, фиксирующий наличие объекта на паковочном месте', color: '#a7714a' },
        { name: 'reservation', title: 'Бронирование ПМ через мобильное приложение', color: '#a7a54a' },
      ]
    }
  },
  mounted() {
    this.getData();

    this.$watch(
        () => {
          return this.$refs.filter.value
        },
        (val) => {
          this.entity = val;
        }
    )
  },
  methods: {
    getData() {
      let req = axios.request(this.dataURL, {}, null, 'get', {baseURL: '/'});

      req.then(({data}) => {
        this.data = data;
      })
    }
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Title",
    "subtitle": "Subtitle"
  },
  "ru": {
    "title": "Пример аналитического экрана",
    "subtitle": "Ещё один заголовок"
  }
}
</i18n>

<style lang="scss" scoped>
  $text-color: #737373;

  .report {
    display: inline-flex;
    flex-direction: column;
    width: 50%;
    min-width: 300px;
    box-sizing: border-box;
    padding: 1%;
    /*background-color: #eceef0;*/
    /*background-image: url("@/assets/analytics/classic/background.png");*/
    background-position: center;

    .title {
      color: $text-color;
      margin: 20px 10px;
    }
    .subtitle {
      color: $text-color;
      margin: 20px 10px;
    }
  }
</style>