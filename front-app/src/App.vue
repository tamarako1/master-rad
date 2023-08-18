<template>
  <v-app>
    <v-main>
      <div class="background-image">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
};
</script>

<style>
.background-image {
  background-image: url("@/assets/white-car.jpg");
  background-size: cover; /* Da bi se slika skalirala da prekrije celu površinu */
  background-position: center; /* Da bi slika bila centrirana */
  width: 100%; /* Da bi element zauzeo celu širinu ekrana */
  height: 100vh; /* Da bi element zauzeo celu visinu ekrana */
  overflow: hidden; /* Onemogućite klizanje unutar kontejnera */
  /* color: black; */
}
.fullscreen-container {
  height: 100vh; /* Visina ekrana */
  overflow: hidden; /* Onemogućite klizanje unutar kontejnera */
}
</style>
