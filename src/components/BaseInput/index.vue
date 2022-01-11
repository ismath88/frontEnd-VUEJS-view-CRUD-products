<template>
  <VTextField
    :value="value"
    v-bind="$attrs"
    :type="inputType"
    @input.native="updateValue($event.target.value)"
  ></VTextField>
</template>

<script>
export default {
  $_veeValidate: {
    name() {
      return this.label
    },
    value() {
      return this.value
    },
  },
  name: 'BaseInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    textModel: {
      type: String,
      default: '',
      required: false,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    inputType: {
      type: String,
      required: false,
      default: 'text',
      validator: function(value) {
        return (
          ['text', 'number', 'email', 'tel', 'time', 'date'].indexOf(value) !==
          -1
        )
      },
    },
  },
  methods: {
    updateValue: function(val) {
      this.$emit('input', val)
    },
  },
}
</script>
