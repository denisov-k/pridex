<template>
  <widget-container title="Динамика потока на выезд" :exportURL="dataURL" :export-image="exportImage"
                    id="line_race" :extra-buttons="extraButtons" :is-loading="isLoading">
    <div class="chart" ref="chartContainer"></div>
  </widget-container>
</template>

<script>
import WidgetContainer from "@/components/Widget/Container.vue";
import * as echarts from "echarts";
import defaultOptions from "./options";

import api from "@/services/api";

export default {
  name: "LineRace",
  components: {WidgetContainer},
  computed: {
    extraButtons() {
     /* const $t = this.$t.bind(this);
      const icon = this.seriesType === 'bar' ? require('./assets/line.svg') : require('./assets/bar.svg');

      return [
        {icon, onClick: this.switchType, title: $t('switch_type')},
      ]*/
    }
  },
  props: {
    data: Array
  },
  watch: {
    data (val, oldVal) {
      this.setupChart();
    }
  },
  data() {
    return {
      seriesType: 'line',
      isLoading: true,
      dataURL: '',
      series: null
    }
  },
  methods: {
    exportImage() {
      let a = document.createElement("a"),
          image = this.chart.getDataURL({pixelRatio: 2, backgroundColor: '#fff'});

      a.href = image;
      a.download = "Image.png";
      a.click();
    },
    getData() {

      const symbolSize = () => {
        const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (!clientWidth)
          return;
        let fontSize = clientWidth / 1920;

        return 60 * fontSize;
      };

      let series = [
        {
          name: 'Выезды',
          type: this.seriesType,
          data: this.data,
          /*markPoint: {
            symbolSize,
            label: {fontSize: '1rem'},
            data: [
              {name: 'Max', value: 182.2, xAxis: 7, yAxis: 183},
              {name: 'Min', value: 2.3, xAxis: 11, yAxis: 3}
            ]
          },*/
          markLine: {
            data: [{type: 'average', name: 'Avg'}],
            label: {position: 'middle', fontSize: '12px'}
          }
        }
      ];

      return Promise.resolve({series});
    },
    setupChart() {
      this.getData().then(({series}) => {

        this.series = series;

        this.paintChart({series});

      }).catch(e => this.catchError(e)).finally(() => this.isLoading = false);
    },
    switchType() {
      this.seriesType = this.seriesType === 'bar' ? 'line' : 'bar';

      this.series[0].type = this.seriesType;
      this.series[1].type = this.seriesType;

      this.chart.setOption({series: this.series});
    },
    paintChart({series}) {
      const options = {
        ...defaultOptions,
        series
      }
      this.chart.setOption(options);
    },
    repaint($container) {
      if ($container.contentRect.width > 0 && $container.contentRect.height > 0)
        this.chart.resize();
    },
    catchError(e) {
      this.chart.setOption({
        title: {
          show: true,
          textStyle: {
            color: 'grey',
            fontSize: 20
          },
          text: `Ошибка ${e}`,
          left: 'center',
          top: 'center'
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: []
      })

      console.error(e);
    }
  },
  mounted() {
    const chart = echarts.init(this.$refs["chartContainer"]);

    this.chart = chart;
    this.resizeObserver = new ResizeObserver(([$container]) => this.repaint($container));
    this.resizeObserver.observe(this.$el)

    this.setupChart()
  },
  beforeDestroy() {
    this.chart.dispose();
    this.resizeObserver.unobserve(this.$el);
  }
}
</script>

<style scoped>
#line_race {
  height: 55vh;
  padding: 0.5rem 0;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>

<i18n>
{
  "en": {
    "title": "Rainfall vs Evaporation",
    "dim_1": "Rainfall",
    "dim_2": "Evaporation",
    "subtitle": "",
    "switch_type": "Switch view type"
  },
  "ru": {
    "title": "Осадки и Испарения",
    "dim_1": "Осадки",
    "dim_2": "Испарения",
    "subtitle": "",
    "switch_type": "Изменить тип отображения"
  }
}
</i18n>