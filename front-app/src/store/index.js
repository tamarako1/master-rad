import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    button: "",
    direction: [],
    // clientName: "",
    // objectName: "",
    // objectProperties: "",
    // snackbarState: false,
    // snackbarText: "",
  },
  mutations: {
    ADD_DIRECTION(state, direction) {
      state.direction.push(direction);
    },
  },
  actions: {
    // addObject(
    //   { commit, dispatch },
    //   { clientName, objectName, objectProperties }
    // ) {
    //   commit("ADD_NODE_NAME", clientName);
    //   commit("ADD_OBJECT_NAME", objectName);
    //   commit("ADD_OBJECT_PROPERTIES", objectProperties);

    //   dispatch("addNewObjectToFollow", { clientName, objectName });
    // },
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
      commit("ADD_DIRECTION", movement);
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
