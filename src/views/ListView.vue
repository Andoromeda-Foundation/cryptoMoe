<template>
  <div class="">
    <div v-if="loading" class="loader-wrapper">
      <pulse-loader></pulse-loader>
    </div>
    <div class="columns is-multiline is-mobile">
      <router-link v-for="item in items"
                   v-if="item"
                   :to="{ name: 'Item', params:{id: item.id}}"
                   :key=item.id.toString()
                   class="column
           is-full-mobile
           is-two-thirds-tablet
           is-half-desktop
           is-one-quarter-widescreen
           is-one-quarter-fullhd">
        <template v-if="1 <= item.id && item.id <= 114">
          <div class="card">
            <div class="card-image">
              <figure class="image is-5by4">
                <img v-lazy="'http://test.cdn.hackx.org/heros/'+item.id+'.jpg'">
              </figure>
            </div>
            <div class="card-content">
              <div class="content is-small">
                <h4>{{item.nickname}} · {{item.name}}</h4>
                <ul>
                  <li>拥有者：
                    <router-link :to="{ name: 'User', params:{address: item.owner}}">
                      {{item.owner.slice(-6).toUpperCase()}}
                    </router-link>
                  </li>
                  <li>当前价格：{{toDisplayedPrice(item.price)}}</li>
                </ul>
                <p>标语：{{item.ad}}</p>
              </div>
            </div>
          </div>
        </template>
      </router-link>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import { getTotal, getItemIds, getItem } from '@/api';
import { toReadablePrice } from '@/util';

export default {
  name: 'item-list',
  components: {
    PulseLoader,
  },

  data() {
    return {
      loading: true,
      items: [],
      total: null,
    };
  },

  computed: {},

  async created() {
    this.total = await getTotal();
    const itemIds = await getItemIds(0, this.total);
    const getItemsPromise = itemIds.map(id => getItem(id));
    const items = await Promise.all(getItemsPromise);
    items.sort((a, b) => a.id - b.id);
    this.items = items;
    this.loading = false;
  },

  methods: {
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
  },
  watch: {},
};
</script>
<style scoped>
.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

