<template>
  <div>
    <section class="hero user-info-wrapper"
             v-bind:style="{ backgroundColor: '#'+address.slice(-6)}">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
          </h1>
          <h2 class="subtitle">
            用户: {{address}}
          </h2>
        </div>
      </div>
    </section>

    <div class="tabs">
      <ul>
        <li class="is-active">
          <a v-if="me && me.address.toUpperCase() === address">我的卡牌</a>
          <a v-else>他的卡牌</a>
        </li>
      </ul>
    </div>
    <ItemList :items='items' />
  </div>
</template>

<script>
import ItemList from '@/components/ItemList';
import { getItem, getItemsOf } from '@/api';

export default {
  name: 'UserView',
  components: {
    ItemList,
  },
  data: () => ({
    items: [],
  }),

  computed: {
    address() {
      return this.$route.params.address.toUpperCase();
    },
    me() {
      return this.$store.state.me;
    },
  },
  async created() {
    const itemIds = await getItemsOf(this.$route.params.address);
    const getItemsPromise = itemIds.map(id => getItem(id));
    const items = await Promise.all(getItemsPromise);
    items.sort((a, b) => a.id - b.id);
    this.items = items;
    this.loading = false;
  },

  watch: {},

  methods: {},
};
</script>
<style scoped>
.user-info-wrapper {
  border-radius: 5px;
}
</style>

