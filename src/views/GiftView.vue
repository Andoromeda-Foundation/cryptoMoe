<template>
  <div class="item-view"
       v-if="gift">

    <div v-if="gift"
         class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{gift.from}} 给 {{gift.to}} 送了{{valueToQuntity(gift.value)}}朵玫瑰花🌹
        </p>
        <a href="#"
           class="card-header-icon"
           aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down"
               aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          {{gift.message}}
          <br>
          <p style="text-align:right;margin-top:10px;">
            <small>{{new Date(Number(gift.birthTime)*1000).toLocaleDateString()}}</small>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getGift } from '@/api';
import { BigNumber } from 'bignumber.js';

export default {
  name: 'item-view',

  data: () => ({
    gift: null,
  }),

  computed: {
    // item() {
    //   return this.$store.state.items[this.$route.params.id];
    // },
  },
  created() {
    getGift(this.$route.params.id)
      .then((gift) => {
        this.gift = gift;
      })
      .catch((e) => {
        console.log(e);
      });
  },

  // refetch comments if item changed
  watch: {},

  methods: {
    valueToQuntity(value) {
      return Number(BigNumber(value).dividedBy(BigNumber('1000000000000000')));
    },
  },
};
</script>
