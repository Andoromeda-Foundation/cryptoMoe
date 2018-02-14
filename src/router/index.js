import Vue from 'vue';
import Router from 'vue-router';
import GiftView from '@/views/GiftView';
import BuyView from '@/views/BuyView';
import ListView from '@/views/ListView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ListView,
    },
    { name: 'Gift', path: '/gift/:id(\\d+)', component: GiftView },
    { name: 'Buy', path: '/buy', component: BuyView },
  ],
});
