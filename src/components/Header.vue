<template>
  <div>

    <div v-if="isShowInfo"
         class="notification is-danger">
      <button class="delete"
              @click="onCloseInfo"></button>
      <div class="content">
        全球第一款严肃区块链游戏！ 8000年人类文明史，所有伟大帝王。 经由顶级艺术家设计，以全新的形象出现在以太萌王中。 这是一款面向全球，所有文明体系的区块链游戏。
        每个文明的玩家都可以找到自己心仪的伟大帝王。 2018年2月22日北京时间22:00整，以太萌王正式发布： 帝业祖龙-嬴政、 陨落的神王-亚历山大、
        欧皇少女-拿破崙·波拿巴、 路痴美食家-乾隆、 丰国大明神-丰臣秀吉、 神罗之始-查理曼 6位伟大君王集体亮相，希望大家，玩得开心！
        <!-- <p v-for="(info,index) in infos"
           :key="index">{{info}}</p> -->
        <br/>
        <br/> The world's first serious blockchain game! 8000 history of human civilization,
        all great emperors. Designed by the top artists, a brand new image appears
        in the epic king. This is a blockchain game for all over the world, all civilized
        system in universal. Every civilization player can find their favorite great
        emperors. February 22, 2018 Beijing time at 22:00, the king of eruption formally
        released: Imperialancestral dragon - YinZheng Fall of God - Alexander European
        royal princess - Napoleon Bonaparte Road crazy eater - Qianlong Toyotomi
        Ming God - Toyotomi Hideyoshi The beginning of the Shinra - Charlemagne 6
        great monarch appearance, I hope everyone, have fun!
      </div>
    </div>

    <header :class="[$route.name === 'Home' ? 'moe-home-header' : '']">
      <section class="hero is-fullheight moe-hero">
        <img class="moe-title-img animated zoomIn"
             src="/static/assets/moe-title.png"
             alt="以太萌王">
      </section>
      <nav class="navbar is-dark">
        <div class="navbar-brand moe-navbar-brand">
          <router-link class=" navbar-item"
                       :to="{ name: 'Home'}">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('CryptoMoe')}}
          </router-link>

          <router-link v-if="!me"
                       class=" navbar-item"
                       :to="{ name: 'Login'}">
            {{$t('Sign In')}}
          </router-link>

          <router-link v-else
                       class=" navbar-item"
                       :to="{ name: 'User', params:{address: me.address}}">
            {{$t('My Cards')}}
          </router-link>

          <router-link class=" navbar-item"
                       :to="{ name: 'FAQ'}">
            {{$t('FAQs')}}
          </router-link>
        </div>

        <div class="navbar-end moe-navbar-end">
          <div class=" navbar-item">
            <div class="field is-grouped">
              <p class="control">
                {{network.name}}
              </p>
            </div>
          </div>
          <div class=" navbar-item">
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

    </header>
  </div>
</template>

<script>
import { getNetwork, getAnnouncements } from '@/api';

export default {
  name: 'Header',
  data() {
    return {
      isShowInfo: true,
      network: {},
      infos: [],
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
      alert(`Unsupported ${network.name}`);
    }
    const infos = [];
    const announcements = await getAnnouncements();
    announcements.forEach(({ type, content }) => {
      if (type === 'info') {
        infos.push(content);
      }
    });
    this.infos = infos;
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
    me() {
      return this.$store.state.me;
    },
  },
  methods: {
    onCloseInfo() {
      this.isShowInfo = false;
    },
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style scoped>
.notification {
  margin-bottom: 0;
}
header {
  position: relative;
}
.moe-hero {
  justify-content: flex-end;
  align-items: center;
  display: none;
  background: transparent url(/static/assets/bg-2.png) scroll no-repeat center;
}
.moe-home-header .navbar {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.moe-home-header .moe-hero {
  display: flex;
}
.moe-title-img {
  width: 66%;
  /* margin: auto; */
}
.navbar-item {
  font-weight: 700;
  padding: 0.7rem 2rem;
  /* margin: 0.5rem 2rem; */
  font-size: 1.14rem;
  color: #fff;
}
a.navbar-item:hover {
  color: #fdda46 !important;
  background-color: transparent !important;
}
</style>
