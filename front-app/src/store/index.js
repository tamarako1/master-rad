import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    button: "",
    direction: [],
    trajectories: [],
    addTrajectiryDialog: false,
    snackbarText: "",
    snackbarState: false,
  },
  mutations: {
    ADD_STEP(state, direction) {
      state.direction.push(direction);
    },
    REMOVE_STEP(state) {
      state.direction.pop();
    },
    DELETE_ALL_STEPS(state) {
      state.direction.length = 0;
    },
    SET_TRAJECTORIES(state, trajectory) {
      state.trajectories.push(trajectory);
    },
    OPEN_TRAJECTORY_DIALOG(state) {
      state.addTrajectiryDialog = true;
    },
    CLOSE_TRAJECTORY_DIALOG(state) {
      state.addTrajectiryDialog = false;
    },
    SET_SNACKBAR_TEKST(state, text) {
      state.snackbarText = text;
    },
    SHOW_SNACKBAR(state) {
      state.snackbarState = true;
    },
    CLOSE_SNACKBAR(state) {
      state.snackbarState = false;
    },
  },

  actions: {
    async clickedButton({ state }, button) {
      console.log("button", button);
      state.button = button;

      try {
        const res = await axios.post(
          `http://localhost:5000/api/post/button/${button}`
        );
        const data = res.data;
        console.log("data iz res.send : ", data);
      } catch (error) {
        console.log("Error with axios request", JSON.stringify(error));
      }
    },

    addStep({ commit, getters }, { step, direction }) {
      const movement = step + "-" + direction;
      commit("ADD_STEP", movement);
      console.log("state.direction: ", getters.getDirection);
    },
    deleteStep({ commit, getters }) {
      console.log("metoda delete step");
      commit("REMOVE_STEP");
      console.log("state.direction: ", getters.getDirection);
    },
    deleteAll({ commit, getters }) {
      console.log("metoda delete all");
      commit("DELETE_ALL_STEPS");
      console.log("state.direction: ", getters.getDirection);
    },
    async sendDirection({ getters, commit, dispatch }, { saveDirection }) {
      console.log("send direction metoda, save direction? ", saveDirection);
      console.log("getters.getDirection: ", getters.getDirection);
      if (getters.getDirection.length == 0) {
        dispatch("showSnackbar");
        dispatch("setSnackbarText", "You must choose steps.");
        setTimeout(() => {
          commit("CLOSE_SNACKBAR");
        }, 3000);
        return;
      }
      try {
        const res = await axios.post(
          `http://localhost:5000/api/post/direction/${getters.getDirection}/${saveDirection}`
        );
        const data = res.data;
        console.log("direction - data iz res.send : ", data);
        if (data.error && data.error == 1) {
          console.log(" putanja vec postoji");

          dispatch("showSnackbar");
          dispatch("setSnackbarText", "This trajectory already exist");
          setTimeout(() => {
            commit("CLOSE_SNACKBAR");
          }, 3000);
        }
        if (data.success && data.success == 1) {
          console.log("uspesno dodata putanja");
          dispatch("showSnackbar");
          dispatch("setSnackbarText", "Successfully added trajectory");
          setTimeout(() => {
            commit("CLOSE_SNACKBAR");
          }, 3000);
        }
      } catch (error) {
        console.log("Error with axios request", error);
      }
    },
    async getListOfTrajectories({ commit }) {
      console.log("get directories ");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/trajectories`
        );
        console.log("res ", res);
        const data = res.data;
        console.log("trajektorije ", data);
        data.forEach((tr) => {
          commit("SET_TRAJECTORIES", tr);
        });
      } catch (error) {
        console.log("Error with axios request", error);
      }
    },
    async deleteTrajectory({ commit, dispatch }, { trajectory }) {
      console.log("delete directories ");
      try {
        const res = await axios.delete(
          `http://localhost:5000/api/delete/${trajectory}`
        );
        console.log("res rpilikom delete ", res.data); //ni bne treba mi ovo
        dispatch("showSnackbar");
        dispatch("setSnackbarText", "Successfully deleted trajectory");
        setTimeout(() => {
          commit("CLOSE_SNACKBAR");
        }, 3000);
      } catch (error) {
        console.log("Error with axios request", error);
      }
    },
    openTrajectoryDialog({ commit }) {
      commit("OPEN_TRAJECTORY_DIALOG");
    },
    closeTrajectoryDialog({ commit }) {
      commit("CLOSE_TRAJECTORY_DIALOG");
    },
    setSnackbarText({ commit }, text) {
      commit("SET_SNACKBAR_TEKST", text);
    },
    showSnackbar({ commit }) {
      commit("SHOW_SNACKBAR");
    },
  },
  getters: {
    getDirection(state) {
      return state.direction;
    },
    getTrajectories(state) {
      return state.trajectories;
    },
    getTrajectoryDialogState(state) {
      return state.addTrajectiryDialog;
    },
    getSnackbarText(state) {
      return state.snackbarText;
    },
    getSnackbar(state) {
      return state.snackbarState;
    },
  },
});
