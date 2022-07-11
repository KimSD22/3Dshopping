<template>
    <div class="login-info">
        <template v-if="login">
            <form class="login-info-form">
                <p>로그인</p><br>
                <span class="text-wrap">계정: </span>
                <input type="text" v-model="username" placeholder=""/><br>
                <span class="text-wrap">비밀번호: </span>
                <input type="password" v-model="password"/><br><br>
                <input class="submit" type="button" @click="goHome" value="확인">
                <input class="submit" type="button" @click="changeLogin(false, true)" value="회원가입">
            </form>
        </template>
        <template v-if="register">
            <form class="login-info-form">
                <p>회원가입</p><br>
                <span class="text-wrap">닉네임: </span>
                <input type="text" v-model="username" placeholder=""/><br>
                <span class="text-wrap">비밀번호: </span>
                <input type="password" v-model="password"/><br>
                <span class="text-wrap">비번확인: </span>
                <input type="password" v-model="confirmPassword"/><br><br>
                <input class="submit" type="button" @click="goLogin" value="확인">
                <input class="submit" type="button" @click="changeLogin(true, false)" value="기존 계정">
            </form>
        </template>
    </div>
</template>

<script>
    import util from '../util';
    export default {
        name: "login",
        data(){
            return {
                login: false,
                register: true,
                username: '',
                password: '',
                confirmPassword: '',
            }
        },
        methods: {
            goLogin(){
                console.log('username',util.trim(this.username))
                if(!util.trim(this.username) || !util.trim(this.username) ){
                    window.alert('닉네임과 비밀번호를 입력해 주세요');
                    return;
                }
                if(this.password !== this.confirmPassword){
                    window.alert('비밀번호가 일치하지 않습니다');
                    this.password = '';
                    this.confirmPassword = '';
                }else{
                    window.localStorage.setItem('username', this.username);
                    window.localStorage.setItem('password', this.password);
                    this.register = false;
                    window.localStorage.setItem('loginStatus', 'login');
                    this.$store.commit('getUser', this.username);
                    window.alert('회원가입되셨습니다');
                    window.location.href = '/list';
                }
            },
            changeLogin(b1, b2){
                this.login = b1;
                this.register = b2;
            },
            goHome(){
                let username = window.localStorage.getItem('username');
                let password = window.localStorage.getItem('password');
                if(!util.trim(this.username) || !util.trim(this.username) ){
                    window.alert('계정과 비밀번호를 입력해 주세요');
                    return;
                }
                if(username === this.username && password === this.password){
                    this.login = false;
                    window.localStorage.setItem('loginStatus', 'login');
                    this.$store.commit('getUser', this.username);
                    window.alert('로그인되셨습니다');
                    window.location.href = '/list';
                }else{
                    window.alert('계정 혹은 비밀번호가 정확하지 않습니다');
                }
            },
        },
        created(){
            //获取路由中的参数
            if(this.$route.params.loginStatus === 'logout'){
                window.localStorage.clear();
                this.$store.commit('getLoginStatus', false);
                return;
            }
            const loginStatus = this.$store.state.loginStatus;
            if(loginStatus){
                this.login = false;
                this.register = false;
                window.alert('이미 로그인되셨습니다')
                window.location.href = '/list'
            }
        }
    }
</script>

<style scoped>
    .login-info{
        height:100%;
        width:100%;
        text-align: center;
    }
    .login-info-form{
        position: relative;
        top: 100px;
        
    }



.text-wrap{
    display:inline-block;
    width:75px
}



    p{
         font-size: 26px;
         color: #5c6b77;
     }
    .submit{
        font-size: 18px;
    }
    span{
        font-size: 16px;
        color: #5c6b77;
    }
</style>