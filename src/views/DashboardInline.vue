<template>
    <v-container fluid>
      <v-row no-gutters justify="space-around">
        <v-col cols="4">
          <h4>
            Bacterial Water Scanner
          </h4>
          <p><small>Detections per 1ml</small></p>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="pointDensity"
            label="Graph density"
          >{{ pointDensity }}</v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="my-0 py-0" cols="3">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <LineGraphChartContainer :SystemData.sync="SystemData" :pointDensity="pointDensity" />
      <v-row justify="space-between" dense>
          <v-col cols="12" class="my-0 py-0 text-center">
            <v-alert color="warning" outlined dense :value="true"	transition="fade-transition" class="mx-auto py-0 my-0" style="width: fit-content;">
              Last contamination alert - <b>{{ (notifications && notifications[0] && new Date(notifications[0].timestamp)) || "Unknown" }}</b>
            </v-alert>
          </v-col>
          <v-col cols="12" md="4">
            <v-card elevation="5">
              <v-card-text>
                <div class="mx-auto">Daily detection size distribution - <span class="text--thin">[Micron units]</span></div>
                <PieChart />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card>
              <v-card-text>
                <div class="mx-auto">Object detections hourly average - <span class="text--thin">[Last 10 hours]</span></div>
                <ColumnsChart /> 
              </v-card-text>
            </v-card>
          </v-col>
      </v-row>
      <alerts-row :SystemData="SystemData" :notifications="notifications" :CartridgeDates="CartridgeDates" />
    </v-container>
</template>

<script>

import ColumnsChart from "@/components/reuse/ColumnsChart.vue";
import LineGraphChartContainer from "@/components/chartjs/LineChartContainer.vue";
import PieChart from "@/components/reuse/PieChart.vue";
import MaterialCard from "@/components/reuse/material/Card.vue";
import MaterialStatsCard from "@/components/reuse/material/StatsCard.vue";
import AlertsRow from "@/components/AlertsRow.vue";
import draggable from "vuedraggable";
import DataService from '@/api/services/data-service';

export default {
    name: "DashboardInline",
    components: { ColumnsChart, draggable, PieChart, MaterialCard, MaterialStatsCard, LineGraphChartContainer, AlertsRow },
    async beforeMount() {
      try {
        const notifications = await DataService.getLastNotifications(5);
        this.notifications = notifications;
      } catch (err) {
        console.log("Failed loading alerts row data. Error=", err);
      }
      try {
        const system = await DataService.getSystemModeAndThreshold();
        if (system) {
          this.SystemData.threshold = system.threshold;
          this.SystemData.system_status = system.system_status;
        }
      } catch (err) {
        console.log("Failed fetching system threshold status. Error=", err);
      }
      try {
        const dates = await DataService.getCartridgeDates();
        if (dates) {
          this.CartridgeDates = dates;
        }
      } catch (err) {
        console.log("Failed fetching cartridge dates. Error=", err);
      }
    },
    data() {
        return {
          pointDensity: 100,
          CartridgeDates: {},
          notifications: [],
          SystemData: {
            threshold: 0,
            system_status: ""
          },
          graphs: [
          {
            id: 1, 
            name: "Live object data",
            text: "Ranging object data sizes",
            cols: 10,
            offset: 2
          },
          {
            id: 2, 
            name: "Object detections hourly average",
            text: "Last 10 hours",
            cols: 6,
            offset: 0
          },
          {
            id: 3, 
            name: "Pie chart",
            text: "Object size distribution by quantity",
            cols: 6,
            offset: 0
          }
        ]
      }
    }
}
</script>

