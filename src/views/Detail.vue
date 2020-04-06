<template>
    <div>
        <!---header--->
        <div class="header-section">
            <div class="container">
                <Router-link :to="{name:'Home'}"><i class="glyphicon glyphicon-chevron-left"></i></Router-link>
                <div class="logo">
                    <a href="index.html" class="logo-content"><h1>您的课程记录</h1></a>
                </div>
            </div>
        </div>
        <!---header--->
        <!--购买记录-->
        <div class="col-md-7">
            <div class="russell-section">
                <div class="crowe">
                    <div class="flowers">
                        <div class="gmjl">
                            购买记录
                        </div>
                        <div class="clearfix"></div>
                    </div>

                    <div class="user user_1" v-for="item in buy_records">
                        <div class="user1">
                            <img :src="item.course.image" class="img-responsive" alt="">
                        </div>
                        <div class="user2">
                            <h5>{{item.course.name}}</h5>
                            <ul>
                                <li><span>购买课时：</span> {{item.c_hour}}节</li>
                                <li><span>课程单价：</span> {{item.c_price}}元</li>
                                <li><span>课程总价：</span> {{item.c_hour * item.c_price|num_format}}元</li>
                                <li><span>购买时间：</span> {{item.paid_at}}</li>
                            </ul>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="clearfix"></div>
        <!--赠送记录-->
        <div class="col-md-7">
            <div class="russell-section" v-if="relation_records != ''">
                <div class="crowe">
                    <div class="flowers">
                        <div class="gmjl">
                            赠送记录
                        </div>
                        <div class="clearfix"></div>
                    </div>

                    <div class="user user_1" v-for="vo in relation_records">
                        <div class="user1">
                            <img :src="vo.course.image" class="img-responsive" alt="">
                        </div>
                        <div class="user2">
                            <h5>{{vo.course.name}}</h5>
                            <ul>
                                <li><span>赠送课时：</span> {{vo.g_hour}}节</li>
                                <li><span>赠送日期：</span> {{vo.paid_at}}</li>
                            </ul>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--上课记录-->
        <div class="col-md-7">
            <div class="russell-section">

                <div class="crowe">
                    <div class="flowers">
                        <div class="gmjl">
                            上课记录
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="kcjl_box">

                        <div class="user user_1" v-for="record in records">
                            <div v-if="record.course != null">
                                <div class="user1">
                                    <img :src="record.course.image" class="img-responsive" alt="">
                                </div>
                                <div class="user2">
                                    <h5>{{record.course.name}}</h5>
                                    <ul>
                                        <li>
                                            <span>课程类型：</span> 购课课程
                                        </li>
                                        <li><span>课时价格：</span> {{record.surplus_price}}元</li>
                                        <li><span>剩余课时：</span> {{record.surplus_hour}}节</li>
                                        <li style="color: #f4645f"><span>上课教练：</span> {{record.user.realname}}</li>
                                        <li><span>上课日期：</span> {{record.updated_at}}</li>
                                    </ul>
                                </div>
                            </div>

                            <div v-if="record.relation_course != null">
                                <div class="user1">
                                    <img :src="record.relation_course.image" class="img-responsive" alt="">
                                </div>
                                <div class="user2">
                                    <h5>{{record.relation_course.name}}</h5>
                                    <ul>
                                        <li>
                                            <span>课程类型：</span> 赠送课程
                                        </li>
                                        <li><span>剩余课时：</span> {{record.surplus_hour}}节</li>
                                        <li style="color: #f4645f"><span>上课教练：</span> {{record.user.realname}}</li>
                                        <li><span>上课日期：</span> {{record.updated_at}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>

                        <div style="text-align: center;margin-top:7px;">
                            <span class="more" style="color: #999;font-size: .85em;display: none">暂时没有更多了</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="clearfix"></div>
    </div>
</template>

<script>
    export default {
        name: 'Detail',
        data() {
            return {
                buy_records: [],
                relation_records: {},
                records: [],
                page: 1,
            }
        },
        created() {
            this.init();
        },
        filters: {
            num_format(value) {
                return value.toFixed(2)
            }
        },
        methods: {
            init() {
                this.axios.get(`/api/customer`)
                    .then((res) => {
                        this.buy_records = res.data.buy_records.data
                        this.relation_records = res.data.relation_records.data
                    })
            },
        },
        // created 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
        // mounted在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
        mounted() {
            // 缓存指针
            let _this = this;
            // 设置一个开关来避免重负请求数据
            let sw = true;
            _this.axios.get('/api/customer')
                .then(function (res) {
                    // 将得到的数据放到vue中的data
                    _this.records = res.data.records.data
                })

            // 注册scroll事件并监听
            window.addEventListener('scroll', function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var windowHeitht = document.documentElement.clientHeight || document.body.clientHeight;
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                // 判断是否滚动到底部
                if (scrollTop + windowHeitht == scrollHeight) {
                    // 如果开关打开则加载数据
                    if (sw == true) {
                        // 将开关关闭
                        sw = false;
                        _this.page += 1;

                        _this.axios.get(`/api/customer/record?page=${_this.page}`).then((res) => {
                            if (res.data.data.length == 0) {
                                $('.more').css('display', 'block'); // 数据加载完后显示自定义样式
                                return false;
                            } else {
                                res.data.data.forEach(function (val, index) {
                                    _this.records.push(val); // 将新的数据追加到原数据后面
                                });
                            }
                            sw = true;
                        })
                    }
                }
            });
        }
    }
</script>
