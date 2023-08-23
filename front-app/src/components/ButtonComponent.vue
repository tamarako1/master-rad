<template>
  <div>
    <v-row justify="center">
      <v-btn
        id="up"
        class="btn-style-up"
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
        class="btn-style-down"
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
      interval: null,
    };
  },
  methods: {
    clickedButton(button) {
      this.$store.dispatch("clickedButton", button);
    },
    //kada se komande salju preko mtastature slace se drugacija slova da bi se u C aplikaciji stalno slala komanda, a ne na 1500ms
    handleKeyPress(event) {
      if (event.key === "ArrowUp") {
        this.clickedButton("g");
      } else if (event.key === "ArrowDown") {
        this.clickedButton("h");
      } else if (event.key === "ArrowLeft") {
        this.clickedButton("j");
      } else if (event.key === "ArrowRight") {
        this.clickedButton("k");
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyPress);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyPress);
  },
};
</script>

<style>
.btn-style-up {
  margin-bottom: 20px;
  margin-top: 100px;
}
.btn-style-down {
  margin-bottom: 20px;
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
