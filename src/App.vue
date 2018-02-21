<template>
  <div>
    <div v-if="$route.name === 'Home'">
      <div class="moe-bg"></div>
      <div class="moe-banner">
        <div class="moe-title">以太萌王</div>
        <div class="moe-slogan">君王乱斗，王权之争，谁是你心目中的最强帝王！</div>
      </div>
    </div>
    <div id="app" :class="[$route.name === 'Home' ? homeAppClass : '']">
      <Header />

      <div class="container main-container">
        <router-view :key="key"></router-view>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data: {
    homeAppClass: {
      marginTop: '50rem',
    },
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  }
};
</script>

<style>
.moe-banner {
  position: absolute;
  display: block;
  text-align: center;
  width: 100%;
  top: 650px;
  color: white;
}
.moe-title {
  font-size: 150px;
}
.moe-slogan {
  font-size: 30px;
}
.main-container {
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
#app {
  min-width: 1024px;
  background-color: #4d69ac;
}
</style>
