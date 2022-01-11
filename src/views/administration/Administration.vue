<template>
  <VContainer>
    <VLayout>
      <VFlex row xs12 md10>
        <BaseExpansionPanel title="title.administration">
          <BaseCardButton
            v-for="(card, i) in globalButtonItems"
            :key="i"
            :url="card.url"
            :card-title="card.title"
            :image="card.image"
          ></BaseCardButton>
        </BaseExpansionPanel>
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
export default {
  name: 'Administration',
  data: () => ({
    globalButtonItems: [
      {
        url: '/administration/global-setting',
        title: 'title.globalSetting',
        image: 'AD Global Settings.png',
      },
      {
        url: '/administration/user-maintenance/users',
        title: 'title.userMaintenance',
        image: 'CC Customer.png',
      },
    ],
  }),
}
</script>
