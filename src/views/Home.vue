<template>
    <div>
        <!---header--->
        <div class="header-section">
            <div class="container">
                <div class="logo">
                    <a href="index.html" class="logo-content"><h1>客户管理系统</h1></a>
                </div>
            </div>
        </div>
        <!---header--->
        <!---content--->
        <div class="col-md-7 main-grid1">
            <div class="russell-section">

                <div class="gallery">
                    <h4>你喜欢的课程都在这里~</h4>
                    <section class="slider" style="margin-top: 3px;margin-bottom: 3px;">
                        <div class="flexslider">
                            <ul class="slides">
                                <li v-for="advert in adverts">
                                    <a href="javascript:;"><img :src="advert.image"/></a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="main-grids">
            <div class="col-md-7 main-grid1">
                <div class="news-grids">
                    <div class="news_box">
                        <div class="news">
                            <div class="new1">
                                <h4>选择课程，开始上课啦~</h4>
                            </div>
                            <div class="new2">
                                <Router-link :to="{name:'Detail'}">
                                    课程记录
                                </Router-link>
                            </div>
                            <div class="clearfix"></div>
                        </div>

                        <form role="form" class="course_form_box" v-on:submit.prevent="onSubmit">
                            <input type="hidden" v-model="customer.id">
                            <div class="form-group_box">
                                <div class="change_password_box">
                                    <div class="xzkc">会员姓名：</div>
                                    <input class='txt' type='text' v-model="customer.username" readonly/>

                                </div>
                                <div class="change_password_box xzkc_mar_top">
                                    <div class="xzkc">选择教练：</div>
                                    <select class="txt" v-model="record.user_id">
                                        <option value="">请选择</option>
                                        <option :value="user.id" v-for="user in users">{{user.realname}}</option>
                                    </select>
                                </div>

                                <div class="change_password_box xzkc_mar_top">
                                    <div class="xzkc ">购课课程：</div>
                                    <select class="txt" v-model="record.buy_course_id">
                                        <option value="">请选择</option>
                                        <option :value="buy.course.id" v-for="buy in buy_records">{{buy.course.name}}
                                        </option>
                                    </select>
                                </div>
                                <div class="change_password_box xzkc_mar_top" v-if="relation_records != ''">
                                    <div class="xzkc">赠课课程：</div>
                                    <select v-model="record.relation_course_id">
                                        <option value="">请选择</option>
                                        <option :value="relation.course.id" v-for="relation in relation_records">
                                            {{relation.course.name}}
                                        </option>
                                    </select>
                                </div>
                                <input class="change_password changeBtn1" type="submit" value="提交">
                            </div>
                        </form>
                    </div>
                    <!-- start equalizer -->

                    <div class="clearfix"></div>
                </div>
                <!-- start equalizer -->
                <div class="video">
                    <div id="jp_container_1" class="jp-video jp-video-360p" role="application"
                         aria-label="media player">
                    </div>
                </div>
            </div>

            <div class="copy-section">
                <p>Copyright &copy; 2020-02-05.Company name All rights reserved</p>
            </div>
        </div>
    </div>
</template>

<script>
    // 弹框提示语，参考文档：https://github.com/lin-xin/vue-toast
    // 1. cnpm install vue2-toast -S
    // 2. 在 main.js 中做相关引入
    // 3. 在要使用的页面中：this.$toast.center(res.data.message);

    export default {
        name: 'Home',
        data() {
            return {
                customer: {},
                adverts: [],
                users: [],
                buy_records: {},
                relation_records: {},
                record: {
                    user_id: '',
                    customer_id: '',
                    buy_course_id: '',
                    relation_course_id: ''
                },
            }
        },
        created() {
            this.init()
        },
        updated() {
            $('.flexslider').flexslider({
                animation: "slide",
                directionNav: false
            });
        },
        methods: {
            init() {
                this.axios.get(`/api/customer`)
                    .then((res) => {
                        // console.log(res);
                        this.customer = res.data.customer
                        this.adverts = res.data.adverts
                        this.users = res.data.users
                        this.buy_records = res.data.buy_records.data
                        this.relation_records = res.data.relation_records.data
                        this.record.customer_id = res.data.customer.id
                    })
            },
            onSubmit() {
                this.axios.post('/api/customer/begin', this.record)
                    .then(res => {
                        if (res.data.success == false) {
                            this.$toast.center(res.data.message);
                            return false;
                        } else {
                            this.$toast.center(res.data.message);
                            this.$router.push({name: 'Home'})
                            //提交后清空表单
                            this.record.user_id = '';
                            this.record.buy_course_id = '';
                            this.record.relation_course_id = '';
                        }
                    })
            }
        }
    }
</script>


