<template>
  <widget-container :title="$t('title')" id="map" :is-loading="isLoading" :on-resize="repaint">
    <div id="chartContainer" class="chart" ref="chartContainer"></div>
  </widget-container>
</template>

<script>
import leaflet from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster';
import 'leaflet-search';
import "leaflet-lasso";
import layers from './layers.json';

import api from "@/services/api";
import WidgetContainer from "@/components/Widget/Container.vue";

const COLORS = ['green', 'white', 'red', 'orange', 'yellow', 'black']

export default {
  name: "Map",
  components: {WidgetContainer},
  props: {
    tile: Object
  },
  data() {
    return {
      isLoading: true,
      dataURL: 'data/classic/map.json',
      baseLayer: layers[2],
      chart: Object,
      point: [
        56.225833,
        43.94747,
        "Нижний Новгород, 40 лет Победы ул., 7",
        62
      ],
    }
  },
  created() {

  },
  methods: {
    getData(count) {
      return api.request(this.dataURL, {}, null, 'get', {baseURL: '/'}).then(({data}) => {
        // return api.request(this.dataURL).then((response) => {
        return {points: data}
      })
    },
    setupChart() {
      this.chart = leaflet.map('chartContainer').setView([56.126944, 43.8915], 11);

      //this.getData().then(({points}) => {
        this.paintChart({points: [this.point], baseLayer: this.baseLayer})

        this.isLoading = false;
      //})
    },
    paintChart({points, baseLayer}) {

      this.chart.options.crs = leaflet.CRS.EPSG3395;

      let tileLayerOptions = {
        subdomains: baseLayer.subdomains || [],
        attribution: '',
        reuseTiles: true,
        updateWhenIdle: false
      };

      leaflet.tileLayer(baseLayer.value, tileLayerOptions).addTo(this.chart);

      let markersLayer = this.setMarkers(points);

      let controlSearch = new L.Control.Search({
        position: 'topright',
        layer: markersLayer,
        initial: false,
        zoom: 12,
        marker: false
      });

      this.chart.addControl(controlSearch);

      L.control.lasso({}).addTo(this.chart);

      this.chart.on('lasso.finished', (event) => {
        console.log(event.layers);
      });

      //setInterval(fillMarkers, 10000);
    },
    setMarkers(points) {
      let markersGroup = leaflet.markerClusterGroup({chunkedLoading: true}),
          markers = [];

      for (let point of points) {
        let title = `${point[2]} <br>${point[0]}, ${point[1]}`,
            color = COLORS[getRandomInt(COLORS.length)];

        let markerIcon = leaflet.divIcon({
          className: ``,
          iconSize: [20, 20],
          html: `<div alt="LOL" class='blob ${color}'></div>`,
        });

        let marker = leaflet.marker(leaflet.latLng(point[0], point[1]), {
          title: title,
          icon: markerIcon,
          alt: point[2]
        });

        marker.bindPopup(title);
        markersGroup.addLayer(marker);
        markers.push(marker);
      }

      this.chart.addLayer(markersGroup);

      return markersGroup;
    },
    repaint() {
      setTimeout(() => {
        this.chart.invalidateSize();
      }, 1000)
    }
  },
  mounted() {
    this.setupChart();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
</script>

<i18n>
{
  "en": {
    "title": "Map",
    "subtitle": ""
  },
  "ru": {
    "title": "Карта",
    "subtitle": ""
  }
}
</i18n>

<style src="leaflet/dist/leaflet.css"></style>
<style src="leaflet.markercluster/dist/MarkerCluster.css"></style>
<style src="leaflet.markercluster/dist/MarkerCluster.Default.css"></style>
<style src="leaflet-search/dist/leaflet-search.min.css"></style>
<style lang="scss" scoped>
#map {
  height: 55vh;
}

.chart {
  height: 100%;

  .leaflet-control-search {
    display: flex;
  }

  .leaflet-control-search .search-input {
    margin: auto 0 auto 4px;
  }

  .blob {
    background: #367dc3;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    /*margin: 10px;*/
    height: 20px;
    width: 20px;
    /*transform: scale(1);*/
    animation: pulse-blue 2s infinite;
  }
}

@keyframes pulse-black {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

.blob.white {
  background: white;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  animation: pulse-white 2s infinite;
}

@keyframes pulse-white {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.blob.red {
  background: rgba(255, 82, 82, 1);
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}

.blob.orange {
  background: rgba(255, 121, 63, 1);
  box-shadow: 0 0 0 0 rgba(255, 121, 63, 1);
  animation: pulse-orange 2s infinite;
}

@keyframes pulse-orange {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 121, 63, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 121, 63, 0);
  }
}

.blob.yellow {
  background: rgba(255, 177, 66, 1);
  box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
  animation: pulse-yellow 2s infinite;
}

@keyframes pulse-yellow {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 177, 66, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 177, 66, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 177, 66, 0);
  }
}

.blob.blue {
  background: rgba(52, 172, 224, 1);
  box-shadow: 0 0 0 0 rgba(52, 172, 224, 1);
  animation: pulse-blue 2s infinite;
}

@keyframes pulse-blue {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(52, 172, 224, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
  }
}

.blob.green {
  background: rgba(51, 217, 178, 1);
  box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
  }
}

.blob.purple {
  background: rgba(142, 68, 173, 1);
  box-shadow: 0 0 0 0 rgba(142, 68, 173, 1);
  animation: pulse-purple 2s infinite;
}

@keyframes pulse-purple {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(142, 68, 173, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(142, 68, 173, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(142, 68, 173, 0);
  }
}
</style>