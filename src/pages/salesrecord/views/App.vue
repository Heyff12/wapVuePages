<template>
    <div>
        <section class="totalHead">
            <ul>
                <li>
                    <dl>
                        <dt>共放款（元）</dt>
                        <dd :class="total_trade_amt.toString().length>=12 ? 'fontS' : ''">{{total_trade_amt | crash_format}}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>我的分润（元）</dt>
                        <dd :class="total_royalty_amt.toString().length>=12 ? 'fontS' : ''">+{{total_royalty_amt | yuan}}</dd>
                    </dl>
                </li>
            </ul>
        </section>
        <section class="saleList">
            <ul>
                <li v-for="item in list_now">
                    <dl>
                        <dt><span class="fr color">+{{item.royalty_amt  | yuan}}</span>{{item.real_name}}</dt>
                        <dd>分期单号：{{item.trade_syssn}}</dd>
                        <dd class="grey">放款金额：{{item.trade_amt | crash_format}}<span class="divide"></span>放款日期：{{item.lender_sysdtm | date_cut(10)}}</dd>
                    </dl>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'salesrecord',
        components: {},
        data() {
            return {
                opuser_url: '/fenqi/v1/api/trade/opuser/list', //销售订单     
                pages_all: 0, //总信息数
                pages: 1, //总页数
                page_per: 20, //每页信息数
                page_now: 1, //当前页数
                list_now: [], //当前展示信息  
                total_trade_amt: 0, //总的放款金额
                total_royalty_amt: 0, // 总的分润金额     
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                let post_data = {
                    'page': this.page_now,
                    'page_size': this.page_per,
                };
                this.$ajax_axios.ajax_get(this, this.opuser_url, post_data, (data_return) => {
                    this.pages_all = data_return.data.opuser_cnt;
                    this.total_trade_amt = data_return.data.total_trade_amt;
                    this.total_royalty_amt = data_return.data.total_royalty_amt;
                    this.list_now = data_return.data.opuser_trade_infos;
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    @import '~css/salesrecord';
</style>
