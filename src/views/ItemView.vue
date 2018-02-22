<template>
  <div class="item-view">
    <div v-if="item">
      <div class="columns is-multiline is-mobile">
        <div class="column
           is-full-mobile moe-item-display">
          <img :src="'http://test.cdn.hackx.org/moe/'+item.id+'.jpg'" class="moe-item-img">
        </div>
        <div class="column
           is-full-mobile">
          <div class="content">
            <h2>{{item.nickname}} · {{item.name}}</h2>
            <h4>{{toDisplayedPrice(item.price)}}</h4>
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
            <article v-if="item.owner !== me.address" class="message is-warning">
              <div class="message-body">
                {{$t('EDIT_SLOGAN_TIP')}}
              </div>
            </article>
          </div>

          <template v-if="item.owner !== me.address">
            <div class="buttons">
              <p>
                <button class="button is-danger is-outlined" @click="onBuy(1)">{{ $t('BUY_BTN') }}</button>
                <button class="button is-danger is-outlined" @click="onBuy(1.1)">{{ $t('PREMIUM_BUY_BTN', { rate: '10%' }) }}</button>
                <button class="button is-danger is-outlined" @click="onBuy(1.3)">{{ $t('PREMIUM_BUY_BTN', { rate: '30%' }) }}</button>
                <button class="button is-danger is-outlined" @click="onBuy(1.5)">{{ $t('PREMIUM_BUY_BTN', { rate: '50%' }) }}</button>
                <button class="button is-danger is-outlined" @click="onBuy(2)">{{ $t('PREMIUM_BUY_BTN', { rate: '100%' }) }}</button>
              </p>
              <p>
                <button class="button is-danger is-outlined" @click="showInput()" v-show="!isShowInput">手动输入价格</button>
                <input class="input customize-input" type="text" placeholder="" v-model="customizedPrice" v-show="isShowInput">
                <button class="button is-success is-outlined" @click="onCustomizedPriceBuy()" v-show="isShowInput">按输入价格购买</button>
              </p>
            </div>
            <article class="message is-danger">
              <div class="message-body">
                {{$t('BUY_PRICE_TIP')}}
              </div>
            </article>
          </template>

          <button v-if="item.owner === me.address" class="button is-warning" @click="onUpdateAd">{{$t('Edit Slogan')}}</button>
          <button v-if="item.owner === me.address" class="button is-warning" @click="onUpdatePrice">修改价格</button>
        </div>
      </div>
      <div class="columns is-multiline is-mobile">
        <div class="column
           is-full-mobile">
          <div class="message-body">
            <p>
              <div v-html="item.introduce"></div>
            </p>
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

export default {
  name: 'item-view',

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
    showInput() {
      this.isShowInput = true;
      this.customizedPrice = this.item.price;
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
      const buyPrice = parseFloat(this.customizedPrice).toFixed(0);
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
      const price = prompt(this.$t('UPDATE_PRICE_PROMPT'));
      if (price !== null) {
        if (price.length < 10) {
          return alert(this.$t('UPDATE_PRICE_ERROR_MSG'));
        }
        setPrice(this.itemId, price)
          .then(() => {
            this.$store.dispatch('FETCH_ITEM', this.itemId);
          })
          .catch((e) => {
            alert(this.$t('UPDATE_PRICE_FAIL_MSG'));
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
.moe-item-display {
  text-align: center;
}
.moe-item-img {
  height: 800px;
}
.tag {
  margin-right: 10px;
}
.customize-input {
  width: 450px;
}
</style>
