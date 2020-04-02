<template>
    <div>
        <div class="calendra">
            <div class="login-form">
                <h4>登录</h4>
                <form v-on:submit.prevent="onSubmit">
                    <input type="text" placeholder="请输入手机号" v-model="customer.mobile">
                    <input type="password" class="pass" placeholder="请输入密码" v-model="customer.password">
                    <input type="submit" value="立即登录">
                </form>
                <p>
                    <Router-link :to="{name:'Reset'}">
                        修改密码?
                    </Router-link>
                </p>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                customer: {
                    mobile: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit() {
                const data = {
                    mobile: this.customer.mobile,
                    password: this.customer.password,
                }
                this.axios.post('/api/customer/login', data)
                    .then(res => {
                        if (res.data.success == false) {
                            this.$toast.center(res.data.message);
                            return false;
                        } else {
                            localStorage.token_type = res.data.token_type
                            localStorage.access_token = res.data.access_token
                            this.$router.push({name: 'Home'})
                        }
                    })
            }
        }
    }
</script>

