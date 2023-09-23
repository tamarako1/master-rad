<template>
  <v-row justify="center">
    <v-dialog v-model="getTrajectoryDialogState" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5">
          Do you want to save trajectory?
        </v-card-title>
        <v-card-actions justify="center">
          <v-btn
            color="#E0E0E0"
            variant="text"
            @click="sendDirection"
            width="50%"
          >
            Yes
          </v-btn>
          <v-btn
            color="#E0E0E0"
            variant="text"
            @click="closeDialog"
            width="50%"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    getTrajectoryDialogState() {
      return this.$store.getters.getTrajectoryDialogState;
    },
  },
  methods: {
    sendDirection() {
      this.$store.dispatch("sendDirection", { saveDirection: true });
      this.$store.dispatch("getListOfTrajectories");
      this.trajectories = this.$store.getters.getTrajectories;
      this.$store.dispatch("closeTrajectoryDialog");
    },
    closeDialog() {
      this.$store.dispatch("sendDirection", { saveDirection: false });
      this.$store.dispatch("closeTrajectoryDialog");
    },
  },
};
</script>

<style scoped>
.margin-left {
  width: 50px;
  margin-left: 20px;
}
.margin-right {
  margin-right: 20px;
  margin-left: 80px;
}
</style>
