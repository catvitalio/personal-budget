<template>
  <div class="page">
    <transition name="slide">
      <app-create-expense-tag v-if="createForm" :show.sync="createForm" />
      <app-edit-expense-tag
        v-if="editForm"
        :show.sync="editForm"
        :initialValues="editExpenseTag"
      />
    </transition>
    <transition name="slide">
      <button
        @click="createForm = !createForm"
        v-if="createForm === false && editForm === false"
        class="page-button"
      >
        +
      </button>
    </transition>
    <app-loading v-if="isLoading" />
    <div v-if="tags">
      <div class="cards-list">
        <div v-for="tag in tags" :key="tag">
          <div v-if="tag.creator != null" class="card">
            <button @click="deleteExpenseTag(tag.id)">
              ✖
            </button>
            <div class="content" @click="clickExpenseTag(tag)">
              <h1>{{ tag.name }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/expensesTagsList'
import {actionTypes as editExpenseTagActionTypes} from '@/store/modules/editExpenseTag'
import AppLoading from '@/components/Loading'
import AppCreateExpenseTag from '@/components/CreateExpenseTag'
import AppEditExpenseTag from '@/components/EditExpenseTag'

export default {
  name: 'AppExpensesTagsList',
  components: {
    AppLoading,
    AppCreateExpenseTag,
    AppEditExpenseTag
  },
  data() {
    return {
      createForm: false,
      editForm: false,
      editExpenseTag: null
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.expensesTagsList.isLoading,
      tags: state => state.expensesTagsList.data,
      error: state => state.expensesTagsList.error
    })
  },
  watch: {
    createForm() {
      this.fetchExpensesTags()
    },
    editForm() {
      this.fetchExpensesTags()
    }
  },
  mounted() {
    this.fetchExpensesTags()
  },
  methods: {
    fetchExpensesTags() {
      this.$store.dispatch(actionTypes.getExpensesTagsList)
    },
    clickExpenseTag(expenseTagItem) {
      if (expenseTagItem === this.editExpenseTag && this.editForm === true) {
        this.editForm = false
      } else if (expenseTagItem != this.expenseTag && this.editForm === true) {
        this.editExpenseTag = expenseTagItem
      } else {
        this.editForm = !this.editForm
        this.editExpenseTag = expenseTagItem
      }
      this.createForm = false
    },
    deleteExpenseTag(expenseTagId) {
      this.$store
        .dispatch(editExpenseTagActionTypes.deleteExpenseTag, {
          slug: expenseTagId
        })
        .then(() => {
          this.fetchExpensesTags()
          this.editForm = false
        })
    }
  }
}
</script>
