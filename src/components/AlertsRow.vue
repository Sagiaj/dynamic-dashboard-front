<template>
  <v-container fluid>
    <v-btn fixed right bottom x-large class="mx-5 my-2" color="warning" @click.native="bottomSheet = true">
      <v-badge
        :content="notifications.length"
        :value="notifications"
        color="red"
        overlap
      >
        <span>
          Alerts
          <v-icon large>
            mdi-alert
          </v-icon>
        </span>
      </v-badge>
    </v-btn>
    <v-bottom-sheet inset v-model="bottomSheet" multi-line>
      <v-alert
        v-model="alert"
        multi-line
        type="warning"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-alert"
      >
        <v-row>
          <v-col cols="7">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Last 5 contamination alerts</h3>
                </div>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" v-for="(notification, idx) in notifications" :key="`idx-${idx}`">
                    <v-alert type="error" outlined dense>
                      Contamination alert at {{ new Date(notification.timestamp) }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="5">
            <v-row justify="space-around">
              <v-col cols="12">
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">System capture mode</h3>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-badge overlap>
                      <span slot="badge">{{ SystemData.system_status }}</span>
                      <v-avatar :color="SystemData.system_status === 'Live Processing' ? 'green green--after' : 'red red--after'">
                        <v-icon v-if="SystemData.system_status === 'Live Processing'" dark>mdi-broadcast</v-icon>
                        <v-icon v-else dark>mdi-broadcast-off</v-icon>
                        <!-- <v-icon dark>mdi-access-point-network-off</v-icon> -->
                      </v-avatar>
                    </v-badge>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" class="mt-5">
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Cartridge status</h3>
                      <span class="text--secondary">Days left: <span :class="`${progressData.color}--text`">{{ progressData.value }}</span></span>
                    </div>
                  </v-card-title>
                  <v-card-text v-if="CartridgeDates">
                    <v-progress-linear :color="progressData.color" :value="progressData.value" stream :buffer-value="0" :height="20" striped></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-alert>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
export default {
    name: "AlertsRow",
    props: ["SystemData", "notifications", "CartridgeDates"],
    computed: {
      daysLeft() {
        return Number(this.CartridgeDates.left_until_finish);
      },
      progressData() {
        const data = {
          color: "light-grey",
          value: 0
        };
        if (!this.CartridgeDates) {
          return data;
        }
        if (!Number.isInteger(this.daysLeft)) {
          data.value = "";
          return data;
        }
        if (this.daysLeft < 0) {
          data.color = "red";
          data.value = 100;
          return data;
        }
        data.value = 100 - ( (this.daysLeft / 30) * 100 );
        if (data.value < 25) {
          data.color = "light-blue";
        } else if (data.value < 50) {
          data.color = "light-green darken-4";
        } else if (data.value < 75) {
          data.color = "lime";
        } else if (data.value >= 75) {
          data.color = "orange";
        }
        return data;
      }
    },
    data() {
        return {
            alert: true,
            alerts: 0,
            bottomSheet: false
        }
    }
}
</script>
