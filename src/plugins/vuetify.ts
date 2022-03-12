import Vue from 'vue';
import { colors } from 'vuetify/lib';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: colors.blue.accent2,
                secondary: colors.cyan.accent2
            },
            light: {
                // primary: colors.grey.darken4,
                primary: colors.teal.darken4,
                secondary: colors.blueGrey.darken1
            }
        }
    }
});
