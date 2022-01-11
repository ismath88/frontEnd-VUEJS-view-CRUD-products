<template>
  <VContainer fluid>
    <VLayout align-center justify-center column>
      <VFlex xs12 pa-2>
        <VImg
          src="@assets/img/urbanloft-logo.png"
          height="120"
          width="200"
          alt="Urban Loft Logo"
          contain
        ></VImg>
      </VFlex>
      <VFlex id="banner" xs12></VFlex>
      <VFlex xs12 pa-2>
        <p class="caption text-xs-center">
          Building 7 - 8, Oknha Mongrithy Boulevard, Sangkat Phnom Penh Thmey,
          Khan Sen Sok, Phnom Penh, Cambodia.
        </p>
        <p class="caption text-xs-center">+855 (0)92 887 226</p>
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>

<style lang="scss" scoped>
#banner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 600px;
  background-color: #f0f2f5;
  background-image: url('../../assets/img/Banner.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.8;
}
</style>
