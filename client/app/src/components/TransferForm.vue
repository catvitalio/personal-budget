<template>
  <div class="page">
    <form @submit.prevent="onSubmit">
      <fieldset class="singleselect-fieldset">
        <multiselect
          v-model="budget_from"
          label="name"
          :options="budgetsList"
          :searchable="false"
          :show-labels="false"
          track-by="id"
          placeholder="Источник"
        ></multiselect>
      </fieldset>
      <fieldset class="singleselect-fieldset">
        <multiselect
          v-model="budget_to"
          label="name"
          :options="budgetsList"
          :searchable="false"
          :show-labels="false"
          track-by="id"
          placeholder="Получатель"
        ></multiselect>
      </fieldset>
      <fieldset class="default-fieldset">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Значение"
          v-model="value"
        />
      </fieldset>
      <fieldset class="default-fieldset">
        <dateselect
          v-model="date"
          :inputAttributes="{size: 50, placeholder: 'Дата'}"
        />
      </fieldset>
      <fieldset class="multiselect-fieldset">
        <div class="multiselect-form">
          <multiselect
            v-model="tags"
            tag-placeholder="Добавить новый тег"
            placeholder="Теги"
            selectLabel=""
            selectGroupLabel=""
            selectedLabel="Выбрано"
            deselectLabel="Выбрано"
            deselectGroupLabel=""
            label="name"
            track-by="id"
            :options="tagsList"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
          ></multiselect>
        </div>
      </fieldset>
      <fieldset>
        <button type="submit" class="form-button" :disabled="isSubmitting">
          Добавить
        </button>
      </fieldset>
    </form>

    <transition name="fade">
      <app-validation-errors v-if="errors" :validation-errors="errors" />
    </transition>
  </div>
</template>

<script>
import transferApi from '@/api/transfer'
import AppValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from '@/store/modules/createTransferTag'
import Multiselect from 'vue-multiselect'
import {getterTypes} from '@/store/modules/createTransferTag'
import {mapGetters} from 'vuex'

export default {
  name: 'AppTransferForm',
  components: {
    AppValidationErrors,
    Multiselect
  },
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      budget_from: this.initialValues.budget_from,
      budget_to: this.initialValues.budget_to,
      value: this.initialValues.value,
      date: this.initialValues.date,
      tags: this.initialValues.tags,

      budgetsList: [],
      tagsList: []
    }
  },
  computed: {
    ...mapGetters({
      tag: getterTypes.tag
    })
  },
  mounted() {
    transferApi.getBudgetsList().then(response => {
      this.budgetsList = response.data
    })
    this.fetchTags()
    this.getNowDate()
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag
      }
      this.$store.dispatch(actionTypes.createTransferTag, tag).then(() => {
        this.fetchTags()
        this.tags.push(this.tag)
      })
    },
    onSubmit() {
      const form = {
        budget_from: this.budget_from.id,
        budget_to: this.budget_to.id,
        value: Number(this.value),
        date: this.date,
        tags: this.tags.map(obj => obj.id)
      }
      this.$emit('transferSubmit', form)
    },
    fetchTags() {
      transferApi.getTagsList().then(response => {
        this.tagsList = response.data
      })
    },
    getNowDate() {
      if (this.initialValues.date === '') {
        this.date = new Date(Date.now()).toISOString().substring(0, 10)
      }
    }
  }
}
</script>
