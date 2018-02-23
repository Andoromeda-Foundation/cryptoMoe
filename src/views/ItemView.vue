<template>
  <div class="item-view">
    <div v-if="item">
      <div class="columns is-multiline is-mobile">
        <div class="column
           is-full-mobile moe-item-display">
          <img :src="'http://test.cdn.hackx.org/moe/'+item.id+'.jpg'"
               class="moe-item-img hvr-wobble-horizontal">
        </div>
        <div class="column
           is-full-mobile">
          <div class="content">
            <h2>{{item.nickname}} · {{item.name}}</h2>

            <h4>{{toDisplayedPrice(item.price)}}</h4>

            <article class="message is-warning">
              <div class="message-body">
                <countdown :time="countdownFreeTime">
                  <template slot-scope="props">{{ $t('CHANGE_PRICE_COUNTDOWN_TIP', { time:toDisplayedTime(), days:
                    props.days, hours: props.hours, minutes: props.minutes, seconds:
                    props.seconds })}}</template>
                </countdown>
              </div>
            </article>

            <h4>{{item.moe_point}}</h4>
            <p>
              <span class="tag is-primary">{{$t('Owner')}}</span>
              <router-link :to="{ name: 'User', params:{address: item.owner}}">
                {{item.owner.toUpperCase().slice(-6)}}
              </router-link>
            </p>
            <p>
              <span class="tag is-link">出生地</span>{{item.birth_place}}</li>
            </p>
            <p>
              <span class="tag is-info">伴侣</span>{{item.cp}}</p>
            <p>
              <span class="tag is-success">眼睛颜色</span>{{item.eye_color}}</p>
            <p>
              <span class="tag is-warning">头发颜色</span>{{item.hair_color}}</p>
            <p>
              <span class="tag is-dark">身高</span>{{item.height}}</p>
            <p>
              <span class="tag is-light">体重</span>{{item.weight}}</p>
            <p class="item-slogan">
              <span class="tag is-black">{{$t('Slogan')}}</span>{{ad}}</p>
            <article v-if="item.owner !== me.address"
                     class="message is-warning">
              <div class="message-body">
                {{$t('EDIT_SLOGAN_TIP')}}
              </div>
            </article>
          </div>

          <template v-if="item.owner !== me.address">
            <div class="buttons">
              <p>
                <button class="button is-danger is-outlined"
                        @click="onBuy(1)">{{ $t('BUY_BTN') }}</button>
                <button class="button is-danger is-outlined"
                        @click="onBuy(1.1)">{{ $t('PREMIUM_BUY_BTN', { rate: '10%' }) }}</button>
                <button class="button is-danger is-outlined"
                        @click="onBuy(1.3)">{{ $t('PREMIUM_BUY_BTN', { rate: '30%' }) }}</button>
                <button class="button is-danger is-outlined"
                        @click="onBuy(1.5)">{{ $t('PREMIUM_BUY_BTN', { rate: '50%' }) }}</button>
                <button class="button is-danger is-outlined"
                        @click="onBuy(2)">{{ $t('PREMIUM_BUY_BTN', { rate: '100%' }) }}</button>
              </p>

              <p v-show="!isShowInput">
                <button class="button is-danger is-outlined"
                        @click="showInput">{{$t('INPUT_PRICE_BTN')}}
                </button>
              </p>

              <div v-show="isShowInput"
                   class="field has-addons">
                <p class="control">
                  <a class="button is-static">
                    ETH
                  </a>
                </p>
                <p class="control">
                  <input class="input "
                         type="number"
                         placeholder=""
                         v-model="customizedPrice"
                         v-show="isShowInput">
                </p>

                <p class="control">
                  <button class="button is-success is-outlined"
                          @click="onCustomizedPriceBuy">{{$t('BUT_AT_INPUT_PRICE_BTN')}}</button>
                </p>
              </div>

            </div>
            <article class="message is-danger">
              <div class="message-body">
                {{$t('BUY_PRICE_TIP')}}
              </div>
            </article>
          </template>

          <button v-if="item.owner === me.address"
                  class="button is-warning"
                  @click="onUpdateAd">{{$t('Edit Slogan')}}</button>
          <button v-if="item.owner === me.address"
                  class="button is-warning"
                  @click="onUpdatePrice">{{$t('CHANGE_PRICE_BTN')}}</button>
        </div>
      </div>
      <div class="columns is-multiline is-mobile">
        <div class="column
           is-full-mobile">
          <div class="message-body">
            <div v-html="item.introduce"></div>
          </div>
        </div>
        <div class="column
           is-full-mobile">
          <div v-html="item.youkuEmbed"></div>
        </div>
      </div>
    </div>
    <div v-else-if="item === null">
      Token doesn't exist
    </div>
  </div>
</template>

<script>
import { buyItem, setGg, setNextPrice, setPrice } from '@/api';
import { toReadablePrice } from '@/util';
import countdown from '@xkeshi/vue-countdown';
import web3 from '@/web3';

export default {
  name: 'item-view',
  components: {
    countdown,
  },

  data: () => ({
    isShowInput: false,
    customizedPrice: 0,
  }),

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
    countdownFreeTime() {
      let time = 0;
      if (this.item) {
        time = this.item.freeTime.toNumber() * 1000 - new Date().getTime();
      }
      return time < 0 ? 0 : time;
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
    toDisplayedTime() {
      return new Date(this.item.freeTime.toNumber() * 1000).toLocaleString();
    },
    showInput() {
      this.isShowInput = true;
      this.customizedPrice = web3.fromWei(this.item.price, 'ether');
    },

    onBuy(rate) {
      if (this.$store.state.signInError) {
        return this.$router.push({ name: 'Login' });
      }
      const buyPrice = this.item.price.times(rate).toFixed(0);
      buyItem(this.itemId, buyPrice)
        .then(() => {
          alert(this.$t('BUY_SUCCESS_MSG'));
          setNextPrice(this.itemId, buyPrice);
        })
        .catch((e) => {
          alert(this.$t('BUY_FAIL_MSG'));
          console.log(e);
        });
    },

    onCustomizedPriceBuy() {
      if (this.$store.state.signInError) {
        return this.$router.push({ name: 'Login' });
      }
      const buyPrice = web3.toWei(this.customizedPrice, 'ether');
      buyItem(this.itemId, buyPrice)
        .then(() => {
          alert(this.$t('BUY_SUCCESS_MSG'));
          setNextPrice(this.itemId, buyPrice);
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

    async onUpdatePrice() {
      let priceInEth = prompt(this.$t('UPDATE_PRICE_PROMPT'));
      if (priceInEth === null) {
        return;
      }
      priceInEth = Number(priceInEth);
      if (isNaN(priceInEth) || priceInEth <= 0) {
        return alert(this.$t('UPDATE_PRICE_ERROR_MSG'));
      }
      const priceInWei = web3.toWei(priceInEth, 'ether');
      // double confirm
      const msg = this.$t('UPDATE_PRICE_CONFRIM', { priceInWei, priceInEth });
      if (!confirm(msg)) {
        return;
      }

      setPrice(this.itemId, priceInWei)
        .then(() => {
          alert(this.$t('UPDATE_PRICE_SUCCESS_MSG'));
        })
        .catch((e) => {
          alert(this.$t('UPDATE_PRICE_FAIL_MSG'));
          console.log(e);
        });
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
.moe-item-display {
  text-align: center;
}
.moe-item-img {
  border-radius: 5px;
  width: 90%;
}
.tag {
  margin-right: 10px;
}
</style>
