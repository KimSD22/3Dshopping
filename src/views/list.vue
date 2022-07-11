<template>

    <div>
<!-- swiper 轮播图 -->
  <div>
    <swiper />
</div>
  
        <div class="list-control">
            <div class="list-control-filter">
                <span>공간:</span>
                <span class="list-control-filter-item"
                      :class="{on: item === filterBrand}"
                      v-for="item in places"
                      @click="handleFilterBrand(item)">{{item}}</span>
            </div>
            <div class="list-control-filter">
                <span>스타일:</span>
                <span class="list-control-filter-item"
                      :class="{on: item === filterColor}"
                      v-for="item in theStyles"
                      @click="handleFilterColor(item)">{{item}}</span>
            </div>

            <div class="list-control-order">
                <span>정렬:</span>
                <span class="list-control-order-item"
                      :class="{on: order === ''}"
                      @click="handleOrderDefault">랜덤</span>
                <span class="list-control-order-item"
                      :class="{on: order === 'sales'}"
                      @click="handleOrderSales">
                    구매순
                    <template v-if="order === 'sales'">↓</template>
                </span>
                <span class="list-control-order-item"
                      :class="{on: order.indexOf('cost') > -1}"
                      @click="handleOrderCost">
                    가격순
                    <template v-if="order === 'cost-desc'">↓</template>
                    <template v-if="order === 'cost-asc'">↑</template>
                </span>
            </div>
        </div>
        <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
        <div class="product-not-found"
             v-show="!filteredAndOrderedList.length">해당 상품이 없음</div>
    </div>
</template>

<script>
    //导入商品简介组件
    import Product from '../components/product.vue';
    import Swiper from '../components/swiper/swiper.vue';

    export default {
    components: {Product , Swiper},

        computed: {
            list(){
                //从Vuex获取商品列表信息
                return this.$store.state.productList;
            },
            places(){
                return this.$store.getters.places;
            },
            theStyles(){
                return this.$store.getters.theStyles;
            },
            filteredAndOrderedList(){
                //拷贝原数组
                let list = [...this.list];
                //品牌过滤
                if(this.filterBrand !== ''){
                    list = list.filter(item => item.place === this.filterBrand);
                }
                //颜色过滤
                if(this.filterColor !== ''){
                    list = list.filter(item => item.theStyle === this.filterColor);
                }
                //排序
                if(this.order !== ''){
                    if(this.order === 'sales'){
                        list = list.sort((a, b) => b.sales - a.sales);
                    }else if(this.order === 'cost-desc'){
                        list = list.sort((a, b) => b.cost - a.cost);
                    }else if(this.order === 'cost-asc'){
                        list = list.sort((a, b) => a.cost - b.cost);
                    }
                }
                return list;
            }
        },
        data(){
            return {
                //品牌过滤
                filterBrand: '',
                //颜色过滤
                filterColor: '',
                //排序依据，可选值：
                //cost-desc价格降序
                //cost-asc价格升序
                //sales销量
                order: ''
            }
        },
        methods: {
            //공간筛选
            handleFilterBrand(place){
                //点击品牌过滤，再次点击取消
                if (this.filterBrand === place) {
                    this.filterBrand = '';
                }else{
                    this.filterBrand = place;
                }
            },
            //스타일筛选
            handleFilterColor(theStyle){
                //点击颜色过滤，再次点击取消
                if (this.filterColor === theStyle) {
                    this.filterColor = '';
                }else{
                    this.filterColor = theStyle;
                }
            },
            handleOrderDefault(){
                this.order = '';
            },
            handleOrderSales(){
                this.order = 'sales';
            },
            handleOrderCost(){
                //当点击升序时将箭头更新↓,降序设置为↑
                if(this.order === 'cost-desc'){
                    this.order = 'cost-asc';
                }else{
                    this.order = 'cost-desc';
                }
            },
        },
        mounted(){
            //初始化时通过Vuex actions获取商品列表信息
            this.$store.dispatch('getProductList');
        }
    }
</script>

<style scoped>
    .list-control{
        background: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        
    }
    .list-control-filter{
        margin-bottom: 16px;

    }
    .list-control-filter-item,
    .list-control-order-item {
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter-item.on,
    .list-control-order-item.on{
        background: orange;
        border: 1px solid orange;
        color: #fff;
    }
    .product-not-found{
        text-align: center;
        padding: 32px;
    }

.test{
    height:50px;
    width:200px;
    background-color:orange;

}


</style>