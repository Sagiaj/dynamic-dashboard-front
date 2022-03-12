<template>
  <v-container grid-list-xs>
    <v-form ref="form" v-model="thresholdIsValid">
      <v-container grid-list-xs>
        <v-row justify="space-around">
          <v-col cols="3" align-self="center">
            <v-text-field
              clearable
              v-model="threshold"
              :error-messages="thresholdErrors"
              label="Daily threshold"
              required
              @input="$v.threshold.$touch()"
              @blur="$v.threshold.$touch()"
            >
            </v-text-field>
              <v-btn class="mr-4"
                color="primary"
                :loading="savingThreshold"
                @click.native="saveDailyThreshold"
                :disabled="savingThreshold"
              >
                Save Daily Threshold
              </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
import DataService from "@/api/services/data-service";
export default {
  name: "ThresholdForm",
  mixins: [validationMixin],
  props: ["thresholdData"],
  validations: {
    threshold: { required, numeric }
  },
  watch: {
    threshold(val, oldVal) {
      if (!val) { return; }
      this.thresholdData.value = val;
    }
  },
  data() {
    return {
      thresholdIsValid: false,
      savingThreshold: false,
      threshold: ""
    };
  },
  async beforeMount() {
    const [flag] = await DataService.getDailyThreshold();
    this.threshold = (flag && flag.threshold) || "";
  },
  computed: {
    thresholdErrors() {
      const errors = [];
      if (!this.$v.threshold.$dirty) return errors;
      !this.$v.threshold.required && errors.push('Threshold is required.');
      !this.$v.threshold.numeric && errors.push('Only numeric values.');
      return errors;
    }
  },
  methods: {
    saveDailyThreshold() {
      this.$refs.form.validate();
      if (!this.thresholdIsValid) return false;
      DataService.saveDailyThreshold(this.threshold);
      this.$v.threshold.$touch();
    }
  },
};
</script>
