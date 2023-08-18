<template>
  <div class="background-image">
    <v-container class="position">
      <v-row class="kolona">
        <v-col>
          <h1 class="h1_style">Car Control</h1>
          <router-link to="/buttons" class="text_style"
            >Control car manually</router-link
          >
          <v-spacer></v-spacer>
          <router-link to="/direction" class="text_style"
            >Set the route for car</router-link
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script></script>
<style>
.background-image {
  background-image: url("@/assets/white-car.jpg");
  background-size: cover; /* Da bi se slika skalirala da prekrije celu površinu */
  background-position: center; /* Da bi slika bila centrirana */
  width: 100%; /* Da bi element zauzeo celu širinu ekrana */
  height: 100vh; /* Da bi element zauzeo celu visinu ekrana */
  font-size: 50px; /* Promenite vrednost prema vašim potrebama */
  justify-content: center;
  height: 100%; /* Opciono, da bi kolona zauzimala celu visinu ekrana */
  width: 100%;
}
.position {
  font-size: 50px; /* Promenite vrednost prema vašim potrebama */
  justify-content: center;
  height: 100%; /* Opciono, da bi kolona zauzimala celu visinu ekrana */
  width: 100%;
}
.kolona {
  display: flex;
  align-items: center; /* Centriraj vertikalno */
  justify-content: center; /* Centriraj horizontalno */
  height: 100%; /* Opciono, da bi kolona zauzimala celu visinu ekrana */
  width: 100%;
}

.h1_style {
  display: block;
  font-size: 80px;
  color: rgb(0, 30, 255);
  font-weight: bold;
}

.text_style {
  display: block;
  font-size: 35px;
  /* color-interpolation-filters: auto; */
  /* color: rgb(0, 30, 255); */
  text-decoration: none; /*da nema podvuceno*/
  font-weight: bold;
  /* color: black; */ /**ne radi */
}
</style>
