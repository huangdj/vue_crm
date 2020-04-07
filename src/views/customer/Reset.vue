<template>
    <div>
        <div class="calendra">
            <div class="login-form">
                <Router-link :to="{name:'Login'}"><i class="glyphicon glyphicon-chevron-left"></i></Router-link>
                <h4>修改密码</h4>
                <form v-on:submit.prevent="onSubmit">
                    <div class="change_password_box">
                        <div class="change_password_tit">手机号</div>
                        <input placeholder="请输入手机号" v-model="customer.mobile">

                    </div>
                    <div class="change_password_box">
                        <div class="change_password_tit change_password_tit1">验证码</div>
                        <input class="change_password_yzm" placeholder="请输入验证码" v-model="customer.code">
                        <button type="button" class="tel_code" @click="getCode()">获取验证码</button>
                    </div>
                    <div class="change_password_box">
                        <div class="change_password_tit change_password_tit1">新密码</div>
                        <input class="change_password" placeholder="请输入新密码" v-model="customer.password">
                    </div>
                    <input class="change_password changeBtn" type="submit" value="修改密码">
                </form>
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
                    code: '',
                    password: ''
                }
            }
        },
        methods: {
            getCode() {
                this.axios.post(`/api/customer/send`, {mobile: this.customer.mobile}).then(res => {
                    if (res.data.success == false) {
                        this.$toast.center(res.data.message);
                        return false;
                    } else {
                        this.$toast.center(res.data.message);
                    }
                })
            },
            onSubmit() {
                const data = {
                    mobile: this.customer.mobile,
                    code: this.customer.code,
                    password: this.customer.password,
                }
                this.axios.put('/api/customer/reset_password', data)
                    .then(res => {
                        if (res.data.success == false) {
                            this.$toast.center(res.data.message);
                            return false;
                        } else {
                            this.$router.push({name: 'Login'})
                        }
                    })
            }
        }
    }
</script>
