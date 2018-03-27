<template>
    <div class="bounced_my" v-show="visible">
        <div class="bounced_my_body" v-bind:class="newclass">
            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bounced',
    props: ['visible','newclass'],
    data() {
        return {}
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>
