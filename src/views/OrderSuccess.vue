<template>
  <div>
    <nav-header></nav-header>
     <nav-bread>
      <span>OrderSuccess</span>
    </nav-bread>
    <div class="container">
      
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur">
            <span>Confirm</span> address
          </li>
          <li class="cur">
            <span>View your</span> order
          </li>
          <li class="cur">
            <span>Make</span> payment
          </li>
          <li class="cur">
            <span>Order</span> confirmation
          </li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic">
          <img src="/static/images/ok-2.png" alt />
        </div>
        <div class="order-create-main">
          <h3>
            Congratulations!
            <br />Your order is under processing!
          </h3>
          <p>
            <span>Order Id:{{order.orderId}}</span>
            <span>Order Total:{{order.orderTotal|currency('💸')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">Cart List</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/goods">Goods List</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from "@/components/Header.vue";
import NavFooter from "@/components/Footer.vue";
import NavBread from "@/components/Bread.vue";
import Modal from "@/components/Modal.vue";
import axios from "axios";
import { currency } from "@/utils/currency.js";
export default {
  data() {
    return {
        order:{}
    };
  },
  mounted(){
      this.init()
  },
  methods:{
      init(){
          const orderId=this.$route.query.orderId;
          if(!orderId) return;
          axios.get('/users/order/success',{
              params:{
                  orderId:orderId
              }
          }).then(res=>{
              this.order=res.data.result;
          })
      }
  },
  filters: {
    currency: currency
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  }
};
</script>
