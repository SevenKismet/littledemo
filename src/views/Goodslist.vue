<template>
  <div>
  <nav-header></nav-header>
  <nav-bread>

    <a href="" slot="hah">leibiao</a>
  </nav-bread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur">Default</a>
      <a href="javascript:void(0)" class="price" @click="sortPrice">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop" @click="showFliterpop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)" v-bind:class="{'cur': priceChecked=='all'}"  @click="setpricefilterall()">All</a></dd>
          <dd v-for="(item ,index) in priceFilter" >
            <a href="javascript:void(0)"  @click="setpricefilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} -{{item.endPrice}}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item ,index) in goodslist">
              <div class="pic">
                <a href="#"><img src="/static/1.jpg"   v-lazy="'/static/' +item.productImage" alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
            加载中。。。。
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
 <nav-footer></nav-footer>

  </div>
</template>
<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/Navfooter'
import NavBread from './../components/NavBread'
import axios from 'axios'

export default{
   data(){
          return{
          msg:'hello',
            goodslist:[],
            priceFilter:[
              {
                startPrice :'0.00',
                endPrice:'500.00'
              },
              {
                startPrice :'500.00',
                endPrice:'1000.00'
              },
              {
                startPrice :'1000.00',
                endPrice:'2000.00'
              },
            ],
            priceChecked:'all',
            filterBy:false,
            overLayFlag:false,
            sortFlag:true,
            page:1,
            pageSize:8,
            busy:true
          }
      },
      components:{
        NavHeader,
        NavFooter,
        NavBread

      },
        mounted:function () {
        this.getGoodslist();
        },
      methods:{
       getGoodslist(fag){
           var params={
             page:this.page,
             pageSize:this.pageSize,
             sort:this.sortFlag? 1:-1,
             pricelevel:this.priceChecked
           }
           axios.get('/goods',{
               params:params
           }).then((res)=>{
               if(fag){
                 this.goodslist=this.goodslist.concat(res.data.result.list);
                 if(res.data.result.count==0){
                     this.busy=true
                 }else {
                   this.busy=false
                 }
                 console.log(this.goodslist);
               }else{
                 this.goodslist=res.data.result.list;
                 this.busy=false
               }

           })
       },
        sortPrice(){
            this.sortFlag=!this.sortFlag,
            this.page=1,
            this.getGoodslist()

        },
        loadMore(){
              this.busy=true;
              setTimeout(() => {
                  this.page++,
                  this.getGoodslist(true)

              }, 500);

        },
        showFliterpop(){
           this.filterBy=true,
            this.overLayFlag=true
        },

        setpricefilter(index){

         this.priceChecked=index;
          this.page=1;
         this.closePop();
         this.getGoodslist();

        },
        setpricefilterall(){
          this.priceChecked='all';
          this.page=1;
          this.closePop();
          this.getGoodslist();
        },
        closePop(){
          this.filterBy=false,
            this.overLayFlag=false
        },

      }
}

</script>
