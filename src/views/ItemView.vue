<template>
  <div class="item-view">
    <div v-if="item">
      <div class="columns is-multiline is-mobile">
        <div class="column
           is-full-mobile">
          <img :src="'./static/assets/heros/'+item.id+'.jpg'">
        </div>
        <div class="column
           is-full-mobile">
          <img :src="'./static/assets/back/back_'+item.id+'.jpg'">
        </div>
        <div class="column
           is-full-mobile">
          <div class="content">
            <h2>{{item.nickname}} · {{item.name}}</h2>
            <ul>
              <li>拥有者：
                <router-link :to="{ name: 'User', params:{address: item.owner}}">
                  {{item.owner.slice(-6).toUpperCase()}}
                </router-link>
              </li>
              <li>当前价格：{{toDisplayedPrice(item.price)}}</li>
            </ul>
            <p>小广告：{{item.ad}}</p>
            <article v-if="item.owner !== me.address"
                     class="message is-warning">
              <div class="message-body">
                购买此卡后，您可以编辑小广告
              </div>
            </article>
          </div>
          <button v-if="item.owner !== me.address"
                  class="button is-danger"
                  @click="onBuy">买卡</button>
          <button v-if="item.owner === me.address"
                  class="button is-warning"
                  @click="onUpdateAd">编辑小广告</button>
        </div>
      </div>
    </div>
    <div v-else-if="item === null">
      Token doesn't exist
    </div>
  </div>
</template>

<script>
import { getItem, buyItem, setAd } from '@/api';
import { toReadablePrice } from '@/util';

export default {
  name: 'item-view',

  data: () => ({
    item: undefined,
  }),

  computed: {
    itemId() {
      return this.$route.params.id;
    },
    me() {
      return this.$store.state.me;
    },
  },
  async created() {
    this.item = await getItem(this.itemId);
  },

  watch: {},

  methods: {
    onBuy() {
      buyItem(this.itemId, this.item.price)
        .then(() => {
          alert('支付成功，请等待矿工确认，稍后再来刷新看看吧。');
        })
        .catch((e) => {
          alert('失败了，错误看console');
          console.log(e);
        });
    },
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    async onUpdateAd() {
      const ad = prompt('请输入您的小广告内容：');
      if (ad !== null) {
        setAd(this.itemId, ad)
          .then(() => {
            this.item.ad = ad;
          })
          .catch((e) => {
            alert('失败了，错误看console');
            console.log(e);
          });
      }
    },
  },
};
</script>
