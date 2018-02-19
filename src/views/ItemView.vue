<template>
  <div class="item-view">
    <div v-if="item">
      <div class="columns is-multiline is-mobile">
        <div class="column
           is-full-mobile">
          <img :src="'http://test.cdn.hackx.org/heros/'+item.id+'.jpg'">
        </div>
        <div class="column
           is-full-mobile">
          <img :src="'http://test.cdn.hackx.org/back/back_'+item.id+'.jpg'">
        </div>
        <div class="column
           is-full-mobile">
          <div class="content">
            <h2>{{item.nickname}} · {{item.name}}</h2>
            <ul>
              <li>{{$t('Owner')}}：
                <router-link :to="{ name: 'User', params:{address: item.owner}}">
                  {{item.owner.slice(-6).toUpperCase()}}
                </router-link>
              </li>
              <li>{{$t('Current Price')}}：{{toDisplayedPrice(item.price)}}</li>
            </ul>
            <p class="item-slogan">{{$t('Slogan')}}: {{ad}}</p>
            <article v-if="item.owner !== me.address"
                     class="message is-warning">
              <div class="message-body">
                {{$t('EDIT_SLOGAN_TIP')}}
              </div>
            </article>
          </div>
          <button v-if="item.owner !== me.address"
                  class="button is-danger"
                  @click="onBuy">{{$t('Buy')}}</button>
          <button v-if="item.owner === me.address"
                  class="button is-warning"
                  @click="onUpdateAd">{{$t('Edit Slogan')}}</button>
        </div>
      </div>
    </div>
    <div v-else-if="item === null">
      Token doesn't exist
    </div>
  </div>
</template>

<script>
import { buyItem, setGg } from '@/api';
import { toReadablePrice } from '@/util';

export default {
  name: 'item-view',

  data: () => ({}),

  computed: {
    itemId() {
      return this.$route.params.id;
    },
    me() {
      return this.$store.state.me || {};
    },
    item() {
      return this.$store.state.items[this.itemId];
    },
    ad() {
      return this.$store.state.ads[this.itemId];
    },
  },
  async created() {
    this.$store.dispatch('FETCH_ITEM', this.itemId);
    this.$store.dispatch('FETCH_AD', this.itemId);
  },

  watch: {},

  methods: {
    onBuy() {
      if (this.$store.state.signInError) {
        return this.$router.push({ name: 'Login' });
      }
      buyItem(this.itemId, this.item.price)
        .then(() => {
          alert(this.$t('BUY_SUCCESS_MSG'));
        })
        .catch((e) => {
          alert(this.$t('BUY_FAIL_MSG'));

          console.log(e);
        });
    },
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    async onUpdateAd() {
      const ad = prompt(this.$t('UPDATE_SLOGAN_PROMPT'));
      if (ad !== null) {
        if (ad.length > 100) {
          return alert(this.$t('UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG'));
        }
        setGg(this.itemId, ad)
          .then(() => {
            this.$store.dispatch('FETCH_AD', this.itemId);
          })
          .catch((e) => {
            alert(this.$t('UPDATE_SLOGAN_FAIL_MSG'));
            console.log(e);
          });
      }
      return 0;
    },
  },
};
</script>
 <style scoped>
.item-slogan {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
