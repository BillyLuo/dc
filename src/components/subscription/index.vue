<template>
  <div class="subscription">
    <div class="wrapper">
      <div>
        <subscription />
      </div>
    </div>
  </div>
</template>

<script>
import subscription from '@/components/home1/subscription';
export default {
  components: {
    subscription
  },
  data() {
    return {

    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init() {

    }
  }
}
</script>

<style>

</style>
