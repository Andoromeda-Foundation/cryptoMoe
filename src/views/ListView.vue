<template>
  <div class="">
    <div v-if="loading"
         class="loader-wrapper">
      <pulse-loader></pulse-loader>
    </div>
    <ItemList :items='items' />
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader';
import ItemList from '@/components/ItemList';
import { getTotal, getItemIds, getItem } from '@/api';
import { toReadablePrice } from '@/util';

export default {
  name: 'item-list',
  components: {
    PulseLoader,
    ItemList,
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

