<template>
  <div class="page">
    <transition name="slide">
      <app-create-transfer-tag v-if="createForm" :show.sync="createForm" />
      <app-edit-transfer-tag
        v-if="editForm"
        :show.sync="editForm"
        :initialValues="editTransferTag"
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
            <button @click="deleteTransferTag(tag.id)">
              ✖
            </button>
            <div class="content" @click="clickTransferTag(tag)">
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
import {actionTypes} from '@/store/modules/transfersTagsList'
import {actionTypes as editTransferTagActionTypes} from '@/store/modules/editTransferTag'
import AppLoading from '@/components/Loading'
import AppCreateTransferTag from '@/components/CreateTransferTag'
import AppEditTransferTag from '@/components/EditTransferTag'

export default {
  name: 'AppTransfersTagsList',
  components: {
    AppLoading,
    AppCreateTransferTag,
    AppEditTransferTag
  },
  data() {
    return {
      createForm: false,
      editForm: false,
      editTransferTag: null
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.transfersTagsList.isLoading,
      tags: state => state.transfersTagsList.data,
      error: state => state.transfersTagsList.error
    })
  },
  watch: {
    createForm() {
      this.fetchTransfersTags()
    },
    editForm() {
      this.fetchTransfersTags()
    }
  },
  mounted() {
    this.fetchTransfersTags()
  },
  methods: {
    fetchTransfersTags() {
      this.$store.dispatch(actionTypes.getTransfersTagsList)
    },
    clickTransferTag(transferTagItem) {
      if (transferTagItem === this.editTransferTag && this.editForm === true) {
        this.editForm = false
      } else if (
        transferTagItem != this.transferTag &&
        this.editForm === true
      ) {
        this.editTransferTag = transferTagItem
      } else {
        this.editForm = !this.editForm
        this.editTransferTag = transferTagItem
      }
      this.createForm = false
    },
    deleteTransferTag(transferTagId) {
      this.$store
        .dispatch(editTransferTagActionTypes.deleteTransferTag, {
          slug: transferTagId
        })
        .then(() => {
          this.fetchTransfersTags()
          this.editForm = false
        })
    }
  }
}
</script>
