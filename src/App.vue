<template>
  <div id="app">
    <nav class="navbar is-light">
      <div class="navbar-brand">
        <router-link class="navbar-item"
                     :to="{ name: 'Home'}">
          <img src="/static/assets/logo.png">&nbsp;&nbsp;{{$t('CryptoHero')}}
        </router-link>

        <router-link v-if="!me"
                     class="navbar-item"
                     :to="{ name: 'Login'}">
          {{$t('Sign In')}}
        </router-link>

        <router-link v-else
                     class="navbar-item"
                     :to="{ name: 'User', params:{address: me.address}}">
          {{$t('My Cards')}}
        </router-link>

        <router-link class="navbar-item"
                     :to="{ name: 'FAQ'}">
          {{$t('FAQs')}}
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              {{network.name}}
            </p>
          </div>
        </div>
        <div class="navbar-item">
          <div class="field is-grouped">

            <div class="control">
              <div class="select">
                <select v-model="locale">
                  <option v-for="(item) in $config.i18n"
                          :key="item.locale"
                          :value="item.locale">
                    {{item.langDisplay}}</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>

    </nav>
    <div class="container main-container">
      <router-view :key="key"></router-view>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import { getNetwork } from '@/api';

export default {
  name: 'App',
  components: {
    Footer,
  },
  data() {
    return {
      network: {},
    };
  },
  async created() {
    this.$store.dispatch('initLocale');
    this.$store.dispatch('FETCH_ME');
    const network = await getNetwork();

    if (!network) {
      alert('Unknown network!');
      return;
    }
    this.network = network;
    if (!network.contract) {
      alert(`我们还没有部署到${network.name}`);
    }
  },
  computed: {
    locale: {
      get() {
        const locale = this.$store.state.locale;
        const i18n = this.$config ? this.$config.i18n : [];
        const lang = i18n.find(
          item =>
            item.locale === locale ||
            item.aliases.some(alias => alias === locale),
        );
        return lang ? lang.locale : null;
      },
      set(value) {
        this.$store.dispatch('setLocale', value);
      },
    },
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    },
    me() {
      return this.$store.state.me;
    },
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style>
.main-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
