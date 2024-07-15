<template>
  <div>
   
    <div v-if="items.length === 0">Loading...</div>
    <GmapMap
      v-else
      :center="mapCenter"
      :zoom="zoom"
      style="width: 100%; height: 80vh;"
    >
      <GmapMarker
        v-for="(location, index) in items"
        :key="index"
        v-if="location.latitude"
        :position="getPosition(location)"
        :icon="getIcon(location)"
        @click="openInfoWindow(index)"
      />

      <!-- Info Window -->
      <GmapInfoWindow
        :options="{ maxWidth: 200 }"
        :opened="infoWindowOpened === index"
        @closeclick="infoWindowOpened = -1"
        v-for="(location, index) in items"
        :key="'info' + index"
        :position="getPosition(location)"
      >
        <div>
          <h3>{{ location.first_name }} {{ location.last_name }}</h3>
          <p>{{ location.location_address }}</p>
        </div>
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {
      zoom: 8,
      infoWindowOpened: -1, // State to control which info window is open
      googleMapsReady: false, 
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (typeof google !== 'undefined' && google.maps) {
        this.googleMapsReady = true; // Set Google Maps as ready
      }
    });
  },
  computed: {
    mapCenter() {
    let validItems = this.items.filter(item => item.latitude !== null && item.latitude !== undefined && item.longitude !== null && item.longitude !== undefined);
    
    if (validItems.length > 0) {
      return {
        lat: parseFloat(validItems[0].latitude),
        lng: parseFloat(validItems[0].longitude)
      };
    }
    return { lat: 0, lng: 0 }; // Default center if no valid items
  }
  },
  methods: {
    getPosition(location) {
      return {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
      };
    },
    getIcon(location) {
      if (!this.googleMapsReady) return null; // Return null if Google Maps is not ready
      return {
        url: location.avatar, // Use the avatar URL as the marker icon
        scaledSize: new google.maps.Size(40, 40), // Size of the icon
        origin: new google.maps.Point(0, 0), // Origin point of the icon
        anchor: new google.maps.Point(20, 20) // Anchor point of the icon
      };
    },
    openInfoWindow(index) {
      this.infoWindowOpened = index; // Open the info window for the clicked marker
    }
  }
};
</script>
