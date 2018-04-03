<template>
    <div class="salesBank">
        <section class="salesList" v-for="item in list_now">
            <div class="salesTop">
                {{item.district_name}}
            </div>
            <div class="totalHead">
                <ul>
                    <li>
                        <dl>
                            <dt>共放款（元）</dt>
                            <dd :class="item.store_total_amt.toString().length>=12 ? 'fontS' : ''">{{item.store_total_amt | crash_format}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>我的分润（元）</dt>
                            <dd :class="item.royalty_amt.toString().length>=12 ? 'fontS' : ''">+{{item.royalty_amt | yuan}}</dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import {
        Toast
    } from "mint-ui";
    export default {
        name: 'district',
        components: {},
        data() {
            return {
                district_url: '/fenqi/v1/api/trade/district/list', //大区   
                pages_all: 0, //总信息数
                pages: 1, //总页数
                page_per: 20, //每页信息数
                page_now: 1, //当前页数
                list_now: [], //当前展示信息    
            }
        },
        created() {
            document.title = '大区销售情况';
            this.$ajax_axios.ajax_check(this,location.href,this.getDistrictList);
        },
        methods: {
            getDistrictList() {
                let post_data = {
                    'page': this.page_now,
                    'page_size': this.page_per,
                };
                this.$ajax_axios.ajax_get(this, this.district_url, post_data, (data_return) => {
                    this.pages_all = data_return.data.district_cnt;
                    if (this.pages_all <= 0) {
                        Toast('暂无信息')
                    } else {
                        this.list_now = data_return.data.district_trade_infos;
                    }    
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>
