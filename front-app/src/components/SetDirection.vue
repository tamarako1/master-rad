<template>
  <div>
    <v-row justify="center">
      <v-col cols="6">
        <v-select
          id="up"
          :items="steps"
          label="UP"
          v-model="choosenStepUp"
          @change="addStep('u')"
        ></v-select>
        <v-select
          id="left"
          :items="steps"
          label="LEFT"
          v-model="choosenStepLeft"
          @change="addStep('l')"
        ></v-select>
        <v-select
          id="right"
          :items="steps"
          label="RIGHT"
          v-model="choosenStepRight"
          @change="addStep('r')"
        ></v-select>
        <v-select
          id="down"
          :items="steps"
          label="DOWN"
          v-model="choosenStepDown"
          @change="addStep('d')"
          margin-bottom="20px"
        ></v-select>
        <v-row justify="center">
          <v-card
            margin-top="50px"
            color="rgba(220, 220, 220, 0.7)"
            width="600px"
          >
            <v-card-text class="show_steps">{{
              listOfchoosenSteps
            }}</v-card-text>
          </v-card>
        </v-row>
        <v-row justify="center">
          <v-btn
            @click="deleteStep"
            height="57"
            width="200"
            color="rgba(220, 220, 220, 0.7)"
            rounded
            class="my-custom-margin"
            >DELETE STEP</v-btn
          >
          <v-flex xs6 sm3></v-flex>
          <v-btn
            @click="deleteAll"
            height="57"
            width="200"
            color="rgba(220, 220, 220, 0.7)"
            rounded
            class="my-custom-margin"
            >DELETE ALL</v-btn
          >
          <v-row justify="center">
            <v-btn
              @click="sendDirection"
              height="57"
              width="200"
              color="rgba(220, 220, 220, 0.7)"
              rounded
              class="my-custom-margin"
              >SUBMIT</v-btn
            >
          </v-row>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <router-link to="/" class="text_style3">Back to home page</router-link>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      choosenStepUp: [],
      choosenStepLeft: [],
      choosenStepRight: [],
      choosenStepDown: [],
      allSteps: [],
    };
  },
  computed: {
    listOfchoosenSteps() {
      let stepsString = "steps:";
      this.allSteps.forEach((step) => {
        stepsString = stepsString + " " + step + ", ";
      });
      return stepsString;
    },
  },
  methods: {
    addStep(direction) {
      switch (direction) {
        case "u":
          this.allSteps.push(`${this.choosenStepUp}-up`);
          this.$store.dispatch("addStep", {
            step: this.choosenStepUp,
            direction,
          });
          break;
        case "l":
          this.allSteps.push(`${this.choosenStepLeft}-left`);
          this.$store.dispatch("addStep", {
            step: this.choosenStepLeft,
            direction,
          });
          break;
        case "r":
          this.allSteps.push(`${this.choosenStepRight}-right`);
          this.$store.dispatch("addStep", {
            step: this.choosenStepRight,
            direction,
          });
          break;
        case "d":
          this.allSteps.push(`${this.choosenStepDown}-down`);
          this.$store.dispatch("addStep", {
            step: this.choosenStepDown,
            direction,
          });
          break;
      }
    },
    deleteStep() {
      console.log("delete");
      this.allSteps.pop();
      this.$store.dispatch("deleteStep");
    },
    deleteAll() {
      console.log("delete all");
      this.allSteps.splice(0, this.allSteps.length);
      this.$store.dispatch("deleteAll");
    },
    sendDirection() {
      this.$store.dispatch("sendDirection");
    },
  },
};
</script>

<style scoped>
.select-input {
  padding: 20px;
  padding-left: 60px;
  padding-right: 60px;
}
.my-custom-margin {
  margin-top: 20px;
  margin-bottom: 20px; /* Prilagodite vrednost prema potrebi */
}
.text_style3 {
  display: block;
  font-size: 25px;
  color-interpolation-filters: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  align-content: center;
  text-align: center;
  /* color: black; */ /**ovde je dobro, ali necu samo ovde da bude */
}

.show_steps {
  font-size: 1.25rem; /* Primer za text-h6 */
  padding-top: 8px; /* Primer za py-2 */
  color: black;
}
</style>
