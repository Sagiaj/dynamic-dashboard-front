<template>
  <v-snackbar v-model="propagatedError" :multi-line="true" :timeout="10000">
    {{ currentError.error }}
    <br />
    For more info check the console
    <v-btn text outlined color="error" @click="propagatedError = null">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ErrorPopup",
  watch: {
    currentError: {
      handler(errObj) {
        this.propagatedError = errObj.error;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["currentError"])
  },
  data() {
    return {
      propagatedError: null
    };
  }
};
</script>
