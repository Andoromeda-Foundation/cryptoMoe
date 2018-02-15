import Vue from 'vue';
import Router from 'vue-router';
import ItemView from '@/views/ItemView';
import ListView from '@/views/ListView';
import LoginView from '@/views/LoginView';
import FaqView from '@/views/FaqView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      	name: 'Home',
        path: '/',        
      	component: ListView,
    },
    {
        name: 'Login',      
      	path: '/Login',
      	component: LoginView,
    },    
    {
        name: 'FAQ',
      	path: '/FAQ',
      	component: FaqView,
    },        
    { 
    	name: 'Item',
    	path: '/item/:id(\\d+)',
    	component: ItemView 
    },
  ],
});
