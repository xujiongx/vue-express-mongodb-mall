<template>
  <div>
    <!-- 页眉组件 -->
    <nav-header></nav-header>
    <!-- 面包屑组件 -->
    <nav-bread>
      <span>Goods</span>
    </nav-bread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        
        <!-- 排序bar -->
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a
            href="javascript:void(0)"
            class="default"
            @click="sortChecked='default'"
            :class="{'cur':sortChecked=='default'}"
          >Default</a>
          <a
            href="javascript:void(0)"
            class="price"
            @click="sortGoods"
            :class="{'cur':sortChecked=='price'}"
          >Price</a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>

          
        <div class="accessory-result">

          <!-- 过滤器bar -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a
                  href="javascript:void(0)"
                  :class="{'cur':priceChecked=='all'}"
                  @click="getAllGoodsList"
                >All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter" :key="index">
                <a
                  href="javascript:void(0)"
                  @click="setPriceFilter(index)"
                  :class="{'cur':priceChecked==index}"
                >{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- 结果展现界面-->
          <div class="accessory-list-wrap">
            
            <div class="accessory-list col-4">
                <!-- 商品列表页面 -->
              <ul>
                <li v-for="item in goodsList" :key="item.i">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'/static/images/'+item.productImage" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- 滚动加载loading -->
              <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="10">
                <img src="../assets/loading-spinning-bubbles.svg" alt v-show="loading" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
    
    <!-- 模态框 -->
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <div slot="md-title" class="md-title">Add car</div>
      <p slot="message">请先登录在加入购物车</p>
      <div slot="btnGroup">
        <a href="javascript:void(0)" class="btn btn--m" @click="mdShow=false">关闭</a>
      </div>
    </modal>

    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <div slot="md-title" class="md-title">Add car</div>
      <p slot="message">加入购物车成功</p>
      <div slot="btnGroup">
        <a href="javascript:void(0)" class="btn btn--m" @click="mdShowCart=false">继续购物</a>
        <router-link href="javascript:void(0)" class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </modal>

    <!-- 遮罩层 -->
    <div class="md-overlay" v-show="overLayFlag" @click="closeFilePop"></div>
    <!-- 页脚组件 -->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import "../assets/css/base.css";
import "../assets/css/product.css";
import NavHeader from "@/components/Header.vue";
import NavFooter from "@/components/Footer.vue";
import NavBread from "@/components/Bread.vue";
import Modal from '@/components/Modal.vue'

export default {
  data() {
    return {
      //商品列表
      goodsList: [],
      //价格列表
      priceFilter: [
        { startPrice: 0, endPrice: 500 },
        { startPrice: 500, endPrice: 1000 },
        { startPrice: 1000, endPrice: 2000 },
        { startPrice: 2000, endPrice: 5000 },
        { startPrice: 5000, endPrice: 10000 }
      ],
      //过滤器选择所有
      priceChecked: "all",
      //拍序选择default
      sortChecked: "default",
      //弹窗flag
      filterBy: false,
      //遮罩flag
      overLayFlag: false,
      //排序flag
      sort: true,
      //分页
      page: 1,
      pageSize: 8,
      //滚动加载
      busy: true,
      //是否加载loading图标
      loading: true,
      //是否显示加入失败模态框
      mdShow:false,
      //是否显示加入成功模态框
      mdShowCart:false,
    };
  },

  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },

  mounted() {
    //获取所有商品列表
    this.getGoodsList();
  },
  methods: {
    //获取商品列表
    getGoodsList(flag) {
      this.loading = true;
      let url;
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sort ? 1 : -1,
        priceLevel: this.priceChecked
      };
      if (params.priceLevel == "all") {
        url = `/goods/list?page=${params.page}&pageSize=${params.pageSize}&sort=${params.sort}`;
      } else {
        url = `/goods/list?page=${params.page}&pageSize=${params.pageSize}&sort=${
          params.sort
        }&priceLevel=${JSON.stringify(this.priceFilter[params.priceLevel])}`;
      }
      fetch(url)
        .then(res => res.json())
        .then(json => {
          if (json.status == "1") {
            if (flag) {
              this.goodsList = this.goodsList.concat(json.result.list);
              if (json.result.count < this.pageSize) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = json.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
          this.loading = false;
        });
    },
    //显示遮罩和过滤
    showFilterPop() {
      (this.filterBy = true), (this.overLayFlag = true);
    },
    //隐藏过滤和遮罩
    closeFilePop() {
      (this.filterBy = false), (this.overLayFlag = false);
    },
    //价格过滤
    setPriceFilter(index) {
      this.page = 1;
      this.priceChecked = index;
      this.closeFilePop();
      this.getGoodsList();
    },
    //升序和降序
    sortGoods() {
      this.page = 1;
      this.sortChecked = "price";
      this.sort = !this.sort;
      this.getGoodsList();
    },
    //滚动加载更多
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 100);
    },
    //获取所有商品列表信息
    getAllGoodsList() {
      this.page = 1;
      this.priceChecked = "all";
      this.getGoodsList();
      this.closeFilePop();
    },
    //加入购物车
    addCart(productId){
      const url='/goods/addCart'
      const data={productId:productId}
      fetch(url,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          'content-type':'application/json'
        }
      })
      .then(res=>res.json())
      .then(res=>{
        if(res.status==1){
          // alert("加入购物车成功")
        this.$store.commit('updateCartCount',1)
          this.mdShowCart=true;
        }else{
          this.mdShow=true;
        }
      })
    },
    //关闭模态框
    closeModal(){
      this.mdShow=false;
      this.mdShowCart=false;
    }
  }
};
</script>

<style>
</style>