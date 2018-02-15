<template>
  <div class="item-view">
    <div v-if="item">
      <div class="is-center columns is-mobile">


        <div class="column">
          <img :src="'./static/assets/heros/'+item.id+'.jpg'">
        </div>
        <div class="column">
          <img :src="'./static/assets/back/back_'+item.id+'.jpg'">
        </div>        
        <div class="column">
          <pre>{{JSON.stringify({item}, null,2)}}</pre>
          <button class="button is-primary"
                  @click="onBuy">Buy</button>
        </div>
      </div>
    </div>
    <div v-else-if="item === null">
      Token doesn't exist
    </div>
  </div>
</template>

<script>
import { getItem, buyItem } from '@/api';

export default {
  name: 'item-view',

  data: () => ({
    item: undefined,
    me: null,
  }),

  computed: {
    itemId() {
      return this.$route.params.id;
    },
  },
  async created() {
    this.item = await getItem(this.itemId);
  },

  watch: {},

  methods: {
    onBuy() {
      buyItem(this.itemId, this.item.price)
        .then(() => {
          alert('支付成功，请等待矿工确认，稍后再来刷新看看吧。');
        })
        .catch((e) => {
          alert('失败了，错误看console');
          console.log(e);
        });
    },
  },
};
</script>
