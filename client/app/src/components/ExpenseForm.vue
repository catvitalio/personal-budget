<template>
  <div class="page">
    <form @submit.prevent="onSubmit">
      <fieldset class="singleselect-fieldset">
        <multiselect
          v-model="budget"
          label="name"
          :options="categoriesList"
          :searchable="false"
          :show-labels="false"
          track-by="id"
          placeholder="Счет"
        ></multiselect>
      </fieldset>
      <fieldset class="default-fieldset">
        <input type="number" placeholder="Значение" v-model="value" />
      </fieldset>
      <fieldset class="default-fieldset">
        <input type="date" placeholder="Дата" v-model="date" />
      </fieldset>
      <fieldset class="singleselect-fieldset">
        <multiselect
          v-model="category"
          label="name"
          :options="categoriesList"
          :searchable="false"
          :show-labels="false"
          track-by="id"
          placeholder="Категория"
        ></multiselect>
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
import expenseApi from '@/api/expense'
import AppValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from '@/store/modules/createTag'
import Multiselect from 'vue-multiselect'
import {getterTypes} from '@/store/modules/createTag'
import {mapGetters} from 'vuex'

export default {
  name: 'AppExpenseForm',
  components: {
    AppValidationErrors,
    Multiselect
  },
  computed: {
    ...mapGetters({
      tag: [getterTypes].tag
    })
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
      budget: this.initialValues.budget,
      value: this.initialValues.value,
      date: this.initialValues.date,
      category: this.initialValues.category,
      tags: this.initialValues.tags,

      budgetsList: [],
      categoriesList: [],
      tagsList: []
    }
  },
  mounted() {
    expenseApi.getBudgetsList().then(response => {
      this.budgetsList = response.data
    })
    expenseApi.getCategoriesList().then(response => {
      this.categoriesList = response.data
    })
    this.fetchTags()
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag
      }
      this.$store.dispatch(actionTypes.createTag, tag).then(() => {
        this.fetchTags()
        this.tags.push(this.tag)
      })
    },
    onSubmit() {
      const form = {
        budget: this.budget.id,
        value: Number(this.value),
        date: this.date,
        category: this.category.id,
        tags: this.tags.map(obj => obj.id)
      }
      this.$emit('expenseSubmit', form)
    },
    fetchTags() {
      expenseApi.getTagsList().then(response => {
        this.tagsList = response.data
      })
    }
  }
}
</script>

<style lang="scss">
.multiselect {
  font-family: $--font-family;
  font-size: $--font-size-base;
  font-weight: $--font-weight-medium;
  color: $--text;
}

.multiselect__tag {
  background: #f0f0f0 !important;
  border: $--border !important;
  color: $--text !important;
  margin-bottom: 0px !important;
  margin-right: 5px !important;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: $--primary !important;
}

.multiselect__option--highlight {
  background: $--primary !important;
}

.multiselect__option--highlight:after {
  background: $--primary !important;
}
</style>
