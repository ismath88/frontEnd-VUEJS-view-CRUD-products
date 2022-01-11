<template>
  <VContainer fluid>
    <VLayout row>
      <VFlex xs12>
        <div class="title">
          {{ $t('navbar.user') }} : {{ $t('title.modeOverview') }}
        </div>
        <BaseList
          :table-headers="tableheader"
          :table-items="getUserData"
          :export-event="onExport"
          :add-event="onAdd"
          add-btn
          update-btn
          delete-btn
          copy-btn
        ></BaseList>
      </VFlex>
    </VLayout>
  </VContainer>
</template>

<script>
import BaseList from '@/components/ListUserMainUsers/index'
import i18n from '@/i18n'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserMainUser',
  components: {
    BaseList,
  },
  data: () => ({
    tableheader: [
      {
        text: i18n.t('label.userName'),
        value: 'username',
      },
      {
        text: i18n.t('label.firstName'),
        value: 'firstname',
      },
      {
        text: i18n.t('label.lastName'),
        value: 'lastname',
      },
    ],
  }),
  computed: {
    ...mapGetters(['getUserData']),
  },
  mounted() {
    this.getUser()
  },

  methods: {
    ...mapActions(['getUser', 'updateActionState']),
    onAdd() {
      this.updateActionState('new').then(() => {
        this.$router.push('/administration/user-maintenance/users/new')
      })
    },
  },
}
</script>
