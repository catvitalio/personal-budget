<template>
  <div class="page">
    <transition name="slide">
      <app-create-income-tag v-if="createForm" :show.sync="createForm" />
      <app-edit-income-tag
        v-if="editForm"
        :show.sync="editForm"
        :initialValues="editIncomeTag"
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
            <button @click="deleteIncomeTag(tag.id)">
              ✖
            </button>
            <div class="content" @click="clickIncomeTag(tag)">
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
import {actionTypes} from '@/store/modules/incomesTagsList'
import {actionTypes as editIncomeTagActionTypes} from '@/store/modules/editIncomeTag'
import AppLoading from '@/components/Loading'
import AppCreateIncomeTag from '@/components/CreateIncomeTag'
import AppEditIncomeTag from '@/components/EditIncomeTag'

export default {
  name: 'AppIncomesTagsList',
  components: {
    AppLoading,
    AppCreateIncomeTag,
    AppEditIncomeTag
  },
  data() {
    return {
      createForm: false,
      editForm: false,
      editIncomeTag: null
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.incomesTagsList.isLoading,
      tags: state => state.incomesTagsList.data,
      error: state => state.incomesTagsList.error
    })
  },
  watch: {
    createForm() {
      this.fetchIncomesTags()
    },
    editForm() {
      this.fetchIncomesTags()
    }
  },
  mounted() {
    this.fetchIncomesTags()
  },
  methods: {
    fetchIncomesTags() {
      this.$store.dispatch(actionTypes.getIncomesTagsList)
    },
    clickIncomeTag(incomeTagItem) {
      if (incomeTagItem === this.editIncomeTag && this.editForm === true) {
        this.editForm = false
      } else if (incomeTagItem != this.incomeTag && this.editForm === true) {
        this.editIncomeTag = incomeTagItem
      } else {
        this.editForm = !this.editForm
        this.editIncomeTag = incomeTagItem
      }
      this.createForm = false
    },
    deleteIncomeTag(incomeTagId) {
      this.$store
        .dispatch(editIncomeTagActionTypes.deleteIncomeTag, {
          slug: incomeTagId
        })
        .then(() => {
          this.fetchIncomesTags()
          this.editForm = false
        })
    }
  }
}
</script>
