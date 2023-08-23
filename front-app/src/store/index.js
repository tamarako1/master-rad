import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    button: "",
    direction: [],
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
  },

  actions: {
    async clickedButton({ state }, button) {
      console.log("button", button);
      state.button = button;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/button/${button}`
        );
        const data = res.data;
        console.log("data iz res.send : ", data);
      } catch (error) {
        console.log("Error with axios request", JSON.stringify(error));
      }
    },

    addStep({ commit, getters }, { step, direction }) {
      console.log("metoda add step");
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
    async sendDirection({ getters }) {
      console.log("send direction metoda ");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/direction/${getters.getDirection}`
        );
        const data = res.data;
        console.log("data iz res.send : ", data);
      } catch (error) {
        console.log("Error with axios request", error);
      }
    },
  },
  getters: {
    getDirection(state) {
      return state.direction;
    },
  },
});
