<template>
  <div>
    <v-row justify="center">
      <v-btn
        id="turbo"
        class="btn-style"
        @click="clickedButton('t')"
        height="72"
        width="250"
        color="rgba(230, 230, 230, 0.8)"
        rounded
        >TURBO</v-btn
      >
    </v-row>
    <v-row justify="center">
      <v-btn
        id="up"
        @click="clickedButton('u')"
        height="72"
        width="250"
        color="rgba(230, 230, 230, 0.7)"
        rounded
        >UP</v-btn
      >
    </v-row>

    <v-row justify="center">
      <v-btn
        id="left"
        @click="clickedButton('l')"
        height="72"
        width="250"
        color="rgba(230, 230, 230, 0.7)"
        rounded
        >LEFT</v-btn
      >
      <v-flex xs6 sm3></v-flex>
      <v-btn
        id="right"
        @click="clickedButton('r')"
        height="72"
        width="250"
        color="rgba(230, 230, 230, 0.7)"
        rounded
        >RIGHT</v-btn
      >
    </v-row>

    <v-row justify="center">
      <v-btn
        id="down"
        @click="clickedButton('d')"
        height="72"
        width="250"
        color="rgba(230, 230, 230, 0.7)"
        rounded
        class="btn-style"
        >DOWN</v-btn
      >
    </v-row>
    <v-row justify="center">
      <router-link to="/" class="text-style2">Back to home page</router-link>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      butonClicked: "",
      isActive: false,
    };
  },
  methods: {
    clickedButton(button) {
      this.$store.dispatch("clickedButton", button);
    },
  },
};
</script>

<style>
.btn-style {
  margin-bottom: 20px; /* Prilagodite vrednost prema potrebi */
  margin-top: 20px;
}
.text-style2 {
  display: block;
  font-size: 25px;
  color-interpolation-filters: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  align-content: center;
  text-align: center;
  color: black;
}
</style>
