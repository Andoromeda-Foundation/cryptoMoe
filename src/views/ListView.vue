<template>
  <div class="news-view1">
    <section class="hero is-medium is-danger is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
          玫瑰爱链
      </h1>
      <h2 class="subtitle">
        爱TA，就把爱永久的记录在区块链上
      </h2>
    </div>
  </div>
</section>
    <br><br>
    <div class="columns is-multiline is-mobile">
      <router-link v-for="gift in items"
                   :key="gift.id"
                   v-if="gift"
                   :to="{ name: 'Gift', params:{id: gift.id}}"
                   class="column is-full-mobile is-two-thirds-tablet is-half-desktop
                   is-one-third-widescreen is-one-quarter-fullhd">
        <div class="card">
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
      </router-link>
    </div>
    <div style="text-align:center">
      <button v-if="displayedTotal < total"
              class="button"
              @click="loadMore(3)">加载更多</button>
    </div>
  </div>
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
      window.xx = this.items;
      const giftx = await getGift(id);

      //   this.$set(this.items, id, giftx);
      //   this.items.push(null);
      this.items[index] = giftx;
      this.$forceUpdate();
    },
    loadMore(increase) {
      if (this.displayedTotal >= this.total) {
        alert('没有更多啦');
      }
      this.displayedTotal += increase;
    },
    valueToQuntity(value) {
      return Number(BigNumber(value).dividedBy(BigNumber('1000000000000000')));
    },
  },
  watch: {
    displayedTotal(newValue) {
      const num = Math.min(newValue, this.total);
      console.log(num, 'nnn');
      for (let i = 0; i < num; i += 1) {
        if (!this.items[i]) {
          const giftId = this.total - i - 1;
          this.loadGift(giftId, i);
        }
      }
    },
  },
};
</script>
