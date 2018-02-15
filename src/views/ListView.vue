<template>
  <div>
    <div class="columns is-multiline is-mobile">
      <div v-for="item in items"
           v-if="item"
           :key=item.id
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
              <ul>
                <li>Owner: {{item.owner}}</li>
                <li>Price: {{item.price}}</li>
                <li>StartingPrice: {{item.startingPrice}}</li>
                <li>NextPrice: {{item.nextPrice}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem } from '@/api';
import { BigNumber } from 'bignumber.js';

export default {
  name: 'item-list',
  data() {
    return {
      items: [],
    };
  },

  computed: {},

  created() {
    for (let i = 1; i <= 114; i += 1) {
      this.loadItem(i);
    }
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
