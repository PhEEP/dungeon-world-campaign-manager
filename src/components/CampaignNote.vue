<template>
<div>
  <slot name="title"></slot>
  <slot name="date">
    Create Date
  </slot>
  <slot name="body">
    Body Text
  </slot>
  <hr>
</div>
</template>

<script>
  export default {
    name: 'CampaignNote'
  }

</script>

<style>
</style>

