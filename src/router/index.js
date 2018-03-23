import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goodslist from '@/views/Goodslist'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goodslist',
      component: Goodslist
    }
  ]
})
