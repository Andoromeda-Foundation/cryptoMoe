import Vue from 'vue';
import Router from 'vue-router';
import ItemView from '@/views/ItemView';
import ListView from '@/views/ListView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ListView,
    },
    { name: 'Item', path: '/item/:id(\\d+)', component: ItemView },
  ],
});
