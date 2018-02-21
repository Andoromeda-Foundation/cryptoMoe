<template>
  <div>
    <div class="columns is-multiline is-mobile main-container">
      <router-link v-for="item in items" v-if="item" :to="{ name: 'Item', params:{id: item.id}}" :key=item.id.toString() class="column
           is-full-mobile
           is-one-quarter-tablet
           is-one-quarter-desktop
           is-one-quarter-widescreen
           is-one-quarter-fullhd">
        <template v-if="1 <= item.id && item.id <= 114">
          <div class="card">
            <div class="card-image">
              <figure class="image is-5by4">
                <img v-lazy="'http://test.cdn.hackx.org/moe/'+item.id+'.jpg'" style="height: 438.3px;">
              </figure>
            </div>
            <div class="card-price">{{toDisplayedPrice(item.price)}}</div>
            <div class="card-content">
              <div class="content is-small">
                <h4>{{item.nickname}} · {{item.name}}</h4>
                <p class="item-slogan">{{toDisplayedAd(item.id)}}</p>
              </div>
            </div>
            <div class="card-address">
              <router-link v-if="item.owner" :to="{ name: 'User', params:{address: item.owner}}">
                {{item.owner.toUpperCase()}}
              </router-link>
            </div>
            <div class="card-buy-btn">{{$t('BuyNow')}}</div>
          </div>
        </template>
      </router-link>
    </div>
  </div>

</template>

<script>
import { toReadablePrice } from '@/util';
import cardConfig from '@/config/cards.json';

export default {
  name: 'item-lists',
  props: ['itemIds'],

  data: () => ({}),

  computed: {
    items() {
      const maxCardId = Object.keys(cardConfig).length;
      return this.itemIds.filter(id => id <= maxCardId).map(id => {
        const item = this.$store.state.items[id];
        return item || { id };
      });
    }
  },

  methods: {
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price.toFixed(4)} ${readable.unit}`;
    },
    toDisplayedAd(id) {
      const ad = this.$store.state.ads[id];
      if (ad && ad.length >= 45) {
        return `${ad.slice(0, 44)} ...`;
      }
      return ad;
    }
  },

  created() {},

  watch: {
    itemIds(newItemIds) {
      newItemIds.forEach(itemId => {
        this.$store.dispatch('FETCH_ITEM', itemId);
        this.$store.dispatch('FETCH_AD', itemId);
      });
    }
  }
};
</script>
 <style scoped>
.main-container {
  margin-top: 50rem; /* 首页卡片margin */
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.item-slogan {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
}
.card {
  height: 625px;
  border-style: none solid solid none;
  border-width: 1px;
  border-color: gray;
}
.card-price {
  border-style: solid none solid none;
  border-width: 1px;
  border-color: gray;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-weight: bolder;
}
.card-content {
}
.card-address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding-left: 25px;
  padding-right: 25px;
  border-style: solid none solid none;
  border-width: 1px;
  border-color: gray;
}
.card-buy-btn {
  background-color: #ed445a;
  text-align: center;
  height: 35px;
  line-height: 35px;
  color: white;
}
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
</style>

