/* eslint-disable vue/multi-word-component-names */
<template>
  <div>
    <v-snackbar data-cy="snackbar" v-model="getSnackbarState">
      {{ getSnackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          data-cy="snackClose"
          color="red"
          text
          v-bind="attrs"
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  methods: {
    closeSnackbar() {
      this.$store.dispatch("closeSnackbar");
    },
  },
  computed: {
    getSnackbarText() {
      return this.$store.getters.getSnackbarText;
    },
    getSnackbarState() {
      return this.$store.getters.getSnackbar;
    },
  },
};
</script>
