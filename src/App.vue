<template>
  <div id="app">
    <nav class="navbar is-light">
      <div class="navbar-brand">
        <router-link class="navbar-item"
                     :to="{ name: 'Home'}">
          <img src="/static/assets/logo.png"
               alt="加密水浒">&nbsp;&nbsp;加密水浒
        </router-link>

        <router-link v-if="!me"
                     class="navbar-item"
                     :to="{ name: 'Login'}">
          登录游戏
        </router-link>

        <router-link v-else
                     class="navbar-item"
                     :to="{ name: 'User', params:{address: me.address}}">
          我的卡牌
        </router-link>

        <router-link class="navbar-item"
                     :to="{ name: 'FAQ'}">
          常见问题
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              Ropsten Test Net
            </p>
          </div>
        </div>
      </div>

    </nav>
    <div class="container main-container">
      <router-view/>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Footer,
  },
  created() {
    this.$store.dispatch('FETCH_ME');
  },
  computed: {
    me() {
      return this.$store.state.me;
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
