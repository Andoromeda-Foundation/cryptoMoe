<template>
  <div>
    <div class="columns is-multiline is-mobile main-container">
      <router-link v-for="item in items"
                   v-if="item"
                   :to="{ name: 'Item', params:{id: item.id}}"
                   :key=item.id.toString()
                   class="column
           is-full-mobile
           is-one-quarter-tablet
           is-one-quarter-desktop
           is-one-quarter-widescreen
           is-one-quarter-fullhd
           hvr-grow">
        <template v-if="1 <= item.id && item.id <= 114">
          <div class="card">
            <div class="card-image">
              <figure class="image is-16by9 is-141">
                <img v-lazy="'http://test.cdn.hackx.org/moe/'+item.id+'.jpg'">
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
              <router-link v-if="item.owner"
                           :to="{ name: 'User', params:{address: item.owner}}">
                {{$t('Owner')}}: {{item.owner.toUpperCase().slice(-6)}}
              </router-link>
            </div>
            <div v-if="item.owner !== me.address"
                 class="card-action button is-danger">{{$t('BuyNow')}}</div>
            <div v-else
                 class="card-action button is-warning">
              {{$t('Edit Slogan')}}
            </div>
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
      return this.itemIds.filter(id => id <= maxCardId).map((id) => {
        const item = this.$store.state.items[id];
        return item || { id };
      });
    },

    me() {
      return this.$store.state.me || {};
    },
  },

  methods: {
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    toDisplayedAd(id) {
      const ad = this.$store.state.ads[id];
      if (ad && ad.length >= 45) {
        return `${ad.slice(0, 44)} ...`;
      }
      return ad;
    },
  },

  created() {},

  watch: {
    itemIds(newItemIds) {
      newItemIds.forEach((itemId) => {
        this.$store.dispatch('FETCH_ITEM', itemId);
        this.$store.dispatch('FETCH_AD', itemId);
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
  display: block;
  line-height: 1.5em;
  height: 4.5em;
  /* height is 3 lines */
  overflow: hidden;
}
.card {
  overflow: hidden;
  border-radius: 5px;
  /* height: 625px; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  /* border-style: none solid solid none;
  border-width: 1px;
  border-color: gray; */
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.card-price {
  border-style: solid none solid none;
  border-width: 1px;
  border-color: gray;
  text-align: center;
  height: 2.2rem;
  font-size: 1.1em;
  line-height: 2.2rem;
  font-weight: bolder;
}
.card-address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 2.2rem;
  font-size: 0.9em;
  line-height: 2.2rem;
  text-align: center;
  border-style: solid none solid none;
  border-width: 1px;
  border-color: gray;
  border-bottom: none;
}
.card-action {
  width: 100%;
  border-radius: 0;
}
.is-141 {
  padding-top: 141%;
}
</style>

