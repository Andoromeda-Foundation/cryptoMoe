<template>
</template>

<script>
import { getTotal, getGift } from '@/api';
import { BigNumber } from 'bignumber.js';

export default {
  name: 'item-list',
  data() {
    return {
      items: [],
      total: 0,
      displayedTotal: 0,
    };
  },

  computed: {

  },

  created() {
    getTotal().then((total) => {
      this.total = Number(total);
      this.displayedTotal += 5;
    });
  },

  methods: {
    async loadGift(id, index) {
      /* window.xx = this.items;
      const giftx = await getGift(id);
      //   this.$set(this.items, id, giftx);
      //   this.items.push(null);
      this.items[index] = giftx;
      this.$forceUpdate(); */
    },
    loadMore(increase) {
      /* if (this.displayedTotal >= this.total) {
        alert('没有更多啦');
      }
      this.displayedTotal += increase; */
    },
    valueToQuntity(value) {
      return Number(BigNumber(value).dividedBy(BigNumber('1000000000000000')));
    },
  },
  watch: {
    displayedTotal(newValue) {
      /* const num = Math.min(newValue, this.total);
      console.log(num, 'nnn');
       for (let i = 0; i < num; i += 1) {
        if (!this.items[i]) {
          const giftId = this.total - i - 1;
          this.loadGift(giftId, i);
        }
      } */
    },
  },
};
</script>

