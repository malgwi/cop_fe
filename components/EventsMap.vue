<template>
  <client-only>
    <l-map 
    :zoom="zoom" 
    :center="center">
      <l-tile-layer 
      :url="url" 
      :attribution="attribution"> 
      </l-tile-layer>
      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="latLng(marker.coords)"
        @click="markerClick(marker.name)"
      >
        <!-- <l-popup class="stuff"> </l-popup> -->
        <l-icon :icon-anchor="staticAnchor" class-name="custom-marker">
          <div class="circle-text d-flex align-items-center justify-content-center w-100">
            <div v-for="(text, index) in markerText" :key="index">
              <p v-if="marker.name === text.state" class="m-0">
                {{ text.count }}
              </p>
            </div>
          </div>
        </l-icon>
      </l-marker>
    </l-map>
  </client-only>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import { nigeriaGeoJson } from "../helpers/nigeria_geojson";
export default {
  props: ["events"],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
  },
  data() {
    /* Data properties will go here */
    return {
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
      zoom: 5.5,
      center: [8.855683, 7.179025],
      states: nigeriaGeoJson,
      markers: [],
      staticAnchor: [16, 37],
      markerText: [],
      iconSize: 64
    };
  },
  mounted() {
    /* Code to run when app is mounted */
    this.filterMarker();
    this.numberOfEvents();
  },
  methods: {
    /* Any app-specific functions go here */
    latLng: function(lat, lng) {
      return L.latLng(lat, lng);
    },
    markerClick(e) {
      this.$emit("markerClick", e);
    },
    filterMarker() {
      const filtered = this.states.filter(state =>
        this.events.some(event => event.state === state.name)
      );
      this.markers = filtered;
    },
    numberOfEvents() {
      const counted = Object.entries(
        this.events.reduce(
          (acc, event) => (
            (acc[event.state] = (acc[event.state] || 0) + 1), acc
          ),
          {}
        )
      ).map(([event, count]) =>
        count > 0 ? { count: count, state: event } : ""
      );
      console.log(counted);
      this.markerText = counted;
    }
  }
};
</script>

<style>
.stuff {
  background: #000000;
  padding: 10rem;
}
.custom-marker {
  border-radius: 50%;
  width: 10em;
  padding: 1em;
  background: #1c8f59;
  text-align: center;
  color: #ffffff;
}
.circle-text {
  height: 100% !important;
}
</style>
