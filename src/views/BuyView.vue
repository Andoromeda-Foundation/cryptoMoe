<template>
  <div class="hello">
    <article v-if="noMetaMask"
             class="message is-warning">
      <div class="message-header">
        <p>未找到MetaMask</p>
      </div>
      <div class="message-body">
        亲，需要使用Chrome浏览器且安装MetaMask插件，才可在区块链上送TA玫瑰。
        <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">安装MetaMask</a>
      </div>
    </article>

    <h2 class="title is-3">送TA玫瑰</h2>

    <div class="field">
      <label class="label">你的名字</label>
      <div class="control">
        <input v-model=from
               class="input"
               type="text"
               placeholder="张三">
      </div>
    </div>

    <div class="field">
      <label class="label">TA的名字</label>
      <div class="control">
        <input v-model=to
               class="input"
               type="text"
               placeholder="李四">
      </div>
    </div>

    <div class="field">
      <label class="label">数量(1朵玫瑰=0.001 ETH)</label>

      <div class="control">
          <input v-model=value
                 class="input"
                 type="number">
          <!-- <select v-model="value">
            <option value=1>1朵（你是我的唯一）</option>
            <option value=99>99朵（天长地久）</option>
            <option value=520>520朵（我爱你）</option>
            <option value=5201314>5201314朵（我爱你一生一世）</option>
          </select> -->
      </div>
    </div>

    <div class="field">
      <label class="label">爱的箴言</label>
      <div class="control">
        <textarea v-model=message
                  class="textarea"
                  placeholder="我爱你一生一世"></textarea>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link"
                @click="onBuy">确认</button>
      </div>
    </div>

    <article class="message is-info">
      <div class="message-body">
          确认后，您的名字、TA的名字、玫瑰数量以及爱的箴言将会永久的记录在区块链上，无法更改，无法删除。
          您所支付的ETH，其中95%将用于慈善事业，全程依旧采用区块链记录跟踪，另外5%归合约创建者所有，主要用于网站维护等开销。
      </div>
    </article>
  </div>
</template>

<script>
import { buyGift } from '@/api';

export default {
  name: 'BuyGift',
  data() {
    return {
      from: '',
      to: '',
      message: '',
      value: 1,
    };
  },
  computed: {
    noMetaMask() {
      return !window.web3;
    },
  },
  methods: {
    async onBuy() {
      console.log(this.from, this.to, this.message, this.value);
      buyGift(this.from, this.to, this.message, this.value * 0.001)
        .then((giftId) => {
          alert('您的爱正在被矿工打包记录到区块上，请稍后到首页查看');
        })
        .catch((e) => {
          alert('出错啦');
          console.log(e);
        });
    },
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
