<template>
  <div id="app">
    <nav class="navbar is-light">
      <div class="navbar-brand">
        <router-link class="navbar-item"
                     :to="{ name: 'Home'}">
          🌹 &nbsp;&nbsp;&nbsp;加密水浒
        </router-link>

        <router-link class="navbar-item"
                     :to="{ name: 'Login'}">
          登陆游戏
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

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            ❤️<br> Created by Cryptogame 爱好者
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('FETCH_ME');
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
