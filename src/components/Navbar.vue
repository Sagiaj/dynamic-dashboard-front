<template>
  <v-navigation-drawer permanent expand-on-hover :mini-variant.sync="miniVariant" app>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar size="50px">
          <img src="https://picsum.photos/50" alt="alt" @click="goTo('')" />
        </v-list-item-avatar>
        <v-list-item-content>Dynamic Dashboard</v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">Admin</v-list-item-title>
          <v-list-item-subtitle>Welcome</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link @click.native="goTo('inline')">
        <v-list-item-icon>
          <v-icon color="primLight">record_voice_over</v-icon>
        </v-list-item-icon>
        <v-list-item-title>In-Line</v-list-item-title>
        <v-list-item-action> </v-list-item-action>
      </v-list-item>
      <v-list-item link @click.native="goTo('lab')">
        <v-list-item-icon>
          <v-icon color="primLight">voice_over_off</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Lab</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  computed: {
  },
  methods: {
    ...mapActions(["propagateError"]),
    goTo(route) {
      if (this.$route.path.match(route) === null) {
        this.$router.push({
          path: `/${route}`,
        });
      }
    }
  },
  data() {
    return {
      miniVariant: true,
      dashboardMode: 0
    };
  },
};
</script>
