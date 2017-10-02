<template>
<div>
  <slot name="header">
    some default value
  </slot>
  <slot name="body"></slot>
</div>
</template>

<script>
export default {
  name: 'CampaignNote'
}
</script>

<style>

</style>
