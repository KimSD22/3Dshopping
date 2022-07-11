<template>
    <div>
        <template v-if="show">
            <div class="header">
                <router-link to="/list"
                             class="header-title">연습용</router-link>
                <div class="header-menu">
                    <router-link to="/cart"
                                 class="header-menu-cart">
                        장바구니
                        <span v-if="cartList.length">{{cartList.length}}</span>
                    </router-link>
                </div>

                <span class="bar"></span>

                <div class="header-menu">
                        {{user}}
                </div>

                <span class="bar"></span>

                <div class="header-menu">
                    <router-link to="/login/logout"
                                 class="header-menu-cart">
                        로그아웃
                    </router-link>
                </div>
            </div>
        </template>
        <!-- 挂载所有路由 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                user: this.$store.state.username
            }
        },
        computed: {
            cartList(){
                return this.$store.state.cartList;
            },
            show(){
                return this.$store.state.loginStatus;
            }
        }
    }
</script>

<style scoped>
/* 
.header-menu{
    font-size:14px;
    margin-left:
}

.bar{
    
    width:2px;
    height:10px;
    background-color:white;
    
}
 */

</style>