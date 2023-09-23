<template>
  <v-app>
    <v-main>
      <div class="background-image">
        <router-view />
        <trajectory-dialog></trajectory-dialog>
        <snackbar-component></snackbar-component>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TrajectoryDialog from "@/components/TrajectoryDialog.vue";
import SnackbarComponent from "@/components/SnackbarComponent.vue";
export default {
  name: "App",
  components: {
    TrajectoryDialog,
    SnackbarComponent,
  },
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
