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
              <v-col cols="12">
                
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-alert>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import DataService from '@/api/services/data-service';
export default {
    name: "AlertsRow",
    props: ["SystemData", "notifications"],
    data() {
        return {
            alert: true,
            alerts: 0,
            bottomSheet: false
        }
    }
}
</script>
