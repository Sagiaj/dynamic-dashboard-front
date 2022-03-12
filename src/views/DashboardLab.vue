<template>
    <v-container grid-list-xl>
        <v-row justify="center">
            <v-col>
                <ThresholdForm ref="thresholdForm" :thresholdData.sync="threshold" />
            </v-col>
        </v-row>
        <v-row justify="space-around">
            <v-col cols="12">
                <v-data-table
                :headers="headers"
                :items="experiments"
                :sort-by="['START TIME', 'A']"
                :sort-desc="[false, true]"
                :loading="loading"
                loading-text="Loading... Please wait"
                multi-sort
                class="elevation-1"
            >
                <template v-slot:top>
                  <v-btn outlined
                      color="primary"
                      class="mb-2"
                      @click.native="refreshResults"
                  >
                    <span>
                      Refresh results
                      <v-icon>mdi-refresh</v-icon>
                    </span>
                  </v-btn>
                </template>
               <template v-slot:item.Bacteria="{ item }">
                <v-chip
                  :color="getColor(item.Bacteria)"
                  dark
                >
                  {{ item.Bacteria }}
                </v-chip>
              </template>
            </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ThresholdForm from "@/components/ThresholdForm.vue";
import DataService from '@/api/services/data-service';

export default {
    name: "DashboardLab",
    components: { ThresholdForm },
    methods: {
      getColor (bacteria) {
        if (Number(bacteria) >= Number(this.threshold.value)) return 'red'
        else return 'green'
      },
      async refreshResults() {
        this.loading = true;
        await new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              let experiments = await DataService.getExperiments();
              this.experiments = experiments;
              resolve(true);
            } catch (err) {
              console.log("Failed fetching experiments. Error=", err);
              resolve(false);
            }
            this.loading = false;
          }, 1000);
        })
      }
    },
    async beforeMount() {
      try {
        await this.refreshResults();
      } catch (err) {
        console.log("Failed fetching experiments. Error=", err);
      }
    },
    data() {
      return {
        loading: false,
        threshold: {
          value: ""
        },
        headers: [
          {
            text: 'Experiment name',
            align: 'start',
            sortable: true,
            value: 'A',
          },
          { text: '0 - 3 µm', value: '0 - 3 µm', sortable: true },
          { text: '3 - 6 µm', value: '3 - 6 µm', sortable: true },
          { text: '6 - 9 µm', value: '6 - 9 µm', sortable: true },
          { text: '9 - 12 µm', value: '9 - 12 µm', sortable: true },
          { text: '12+ µm', value: '12+ µm', sortable: true },
          { text: 'Experiment Type', value: 'A' },
          { text: 'Operator name', value: 'OPERATOR NAME' },
          { text: 'Start time', value: 'TIME START', sortable: true },
          { text: 'Bacteria', value: 'Bacteria' },
          { text: 'Particles', value: 'Total Particles' },
          { text: 'Bottle name', value: 'BOTTLE NAME' }
        ],
        experiments: []
      }
    }
}
</script>
