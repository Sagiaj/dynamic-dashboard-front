<template>
    <v-container grid-list-xl>
      <v-row justify="space-around">
          <v-col cols="12">
              <MaterialCard title="Live object data" titleType="alert" text="Real-time detections">
                <LineGraphChartContainer :SystemData.sync="SystemData" />
              </MaterialCard>
          </v-col>
          <v-col cols="12" class="mx-auto text-center">
            <v-alert color="warning" outlined :value="true"	transition="fade-transition" width="50%" class="mx-auto">
              <div>
                <h3 class="headline mb-0">Last contamination alert</h3>
              </div>
              {{ (notifications && notifications[0] && new Date(notifications[0].timestamp)) || "Unknown" }}
            </v-alert>
          </v-col>
          <v-col cols="12" md="3">
              <MaterialCard title="Object detections hourly average" titleType="alert" text="[Last 10 hours]">
                <PieChart />
              </MaterialCard>
          </v-col>
          <v-col cols="12" md="9">
              <MaterialCard title="Daily detection size distribution" titleType="alert" text="[um units per 1mL]">
                <ColumnsChart /> 
              </MaterialCard>
          </v-col>
      </v-row>
      <alerts-row :SystemData="SystemData" :notifications="notifications"/>
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
        console.log("Failed fetching system threshold status");
      }
    },
    data() {
        return {
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

