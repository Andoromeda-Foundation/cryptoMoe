<template>
  <div>
    Total: {{total}}
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
        <div class="card">
          <div class="card-image">
            <figure class="image is-5by4">
              <img :src="'/static/assets/heros/'+item.id+'.jpg'">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <pre>{{JSON.stringify(item, null,2)}}</pre>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getTotal, getItemIds, getItem } from '@/api';

export default {
  name: 'item-list',
  data() {
    return {
      items: [],
      total: null,
    };
  },

  computed: {},

  async created() {
    this.total = await getTotal();
    const itemIds = await getItemIds(0, this.total);
    itemIds.forEach((id) => {
      this.loadItem(id);
    });
  },

  methods: {
    async loadItem(id) {
      this.items[id] = await getItem(id);
      this.$forceUpdate();
    },
  },
  watch: {},
};
</script>
