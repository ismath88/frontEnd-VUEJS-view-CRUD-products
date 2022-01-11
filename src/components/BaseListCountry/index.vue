<template>
  <div>
    <VContainer fluid class="pl-0 pr-0">
      <BaseNotification
        :display="msgDisplayInfo"
        :type="msgType"
        :text="msgText"
      ></BaseNotification>
      <VLayout row wrap>
        <VFlex xs8>
          <BaseButton
            v-if="addBtn"
            :text="$t('button.addButton')"
            :on-click="addEvent"
            to="/administration/global-setting/country/new"
          ></BaseButton>
          <BaseButton
            :disabled="selected.length === 0 || selected.length > 1"
            :text="$t('button.updateButton')"
            :on-click="updateEvent"
            to="/administration/global-setting/country/update"
          ></BaseButton>
          <BaseButton
            v-if="copyBtn"
            :disabled="selected.length === 0 || selected.length > 1"
            :text="$t('button.copyButton')"
            :on-click="copyEvent"
            to="/administration/global-setting/country/copy"
          ></BaseButton>
          <BaseModalDialog
            v-if="deleteBtn"
            :disabled="selected.length === 0"
            :title="$t('message.confirmMessage')"
            :text="$t('button.deleteButton')"
            :on-yes-dialog="deleteEvent"
            class="d-inline"
          ></BaseModalDialog>

          <BaseModalDialog
            v-if="exportBtn"
            :title="$t('button.exportButton')"
            :text="$t('button.exportButton')"
            :message="$t('message.confirmMessage')"
            :on-yes-dialog="exportEvent"
            class="d-inline"
          ></BaseModalDialog>
        </VFlex>
        <VFlex xs4>
          <BaseInput
            v-model="searchTerm"
            :label="$t('label.search')"
            append-icon="search"
            single-line
            hide-details
          ></BaseInput>
        </VFlex>
      </VLayout>
    </VContainer>
    <VDataTable
      v-model="selected"
      :headers="tableHeaders"
      :items="tableItems"
      :search="searchTerm"
      item-key="@id"
      select-all
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>
          <VCheckbox v-model="props.selected" primary hide-details></VCheckbox>
        </td>
        <td class="text-xs-left">{{ props.item.code }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.phoneCode }}</td>
      </template>
    </VDataTable>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseNotification from '@/components/BaseNotification'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BaseListIdType',
  components: {
    BaseInput,
    BaseButton,
    BaseNotification,
  },

  props: {
    addBtn: {
      type: Boolean,
      default: false,
    },
    addEvent: {
      type: Function,
      default: () => {},
    },
    updateBtn: {
      type: Boolean,
      default: false,
    },
    deleteBtn: {
      type: Boolean,
      default: false,
    },
    // deleteEvent: {
    //   type: Function,
    //   default: () => {}
    // },
    copyBtn: {
      type: Boolean,
      default: false,
    },
    // copyEvent: {
    //   type: Function,
    //   default: () => {}
    // },
    exportBtn: {
      type: Boolean,
      default: false,
    },
    exportEvent: {
      type: Function,
      default: () => {},
    },
    tableHeaders: {
      type: Array,
      default: () => {},
    },
    tableItems: {
      type: Array,
      default: () => {},
    },
    onSeleted: {
      type: Function,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      pagination: {
        sortBy: 'code',
      },
      searchTerm: '',
      selected: [],
    }
  },
  computed: {
    ...mapGetters(['msgDisplayInfo', 'msgText', 'msgType']),
  },

  methods: {
    ...mapActions([
      'getCountryList',
      'updateRowSeleted',
      'updateActionState',
      'countryDelete',
    ]),
    updateEvent() {
      this.updateRowSeleted(this.selected)
      this.updateActionState('update')
    },
    copyEvent() {
      this.updateRowSeleted(this.selected)
      this.updateActionState('copy')
    },
    deleteEvent() {
      this.updateRowSeleted(this.selected).then(
        this.countryDelete([...this.selected]),
        (this.selected = [])
      )
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
  },
}
</script>
