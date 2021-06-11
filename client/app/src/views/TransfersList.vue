<template>
  <div class="page">
    <transition name="slide">
      <app-create-transfer v-if="createForm" :show.sync="createForm" />
      <app-edit-transfer
        v-if="editForm"
        :show.sync="editForm"
        :initialValues="editTransfer"
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
    <div class="buttons-list">
      <router-link :to="{name: 'transfersTagsList'}" exact>
        <button>
          Теги
        </button>
      </router-link>
      <multiselect
        class="sort-choice"
        v-model="sortBy"
        label="name"
        :options="sortItemsList"
        :searchable="false"
        :show-labels="false"
        track-by="value"
        placeholder="Сортировка"
      ></multiselect>
    </div>
    <input class="search-field" v-model="search" placeholder="Поиск" />
    <app-loading v-if="isLoading" />
    <div v-if="transfers">
      <div class="cards-list">
        <div v-for="transfer in transfers" :key="transfer">
          <div class="card">
            <button @click="deleteTransfer(transfer.id)">✖</button>
            <div class="content" @click="clickTransfer(transfer)">
              <h3>{{ transfer.date }}</h3>
              <h1>
                {{ transfer.budget_from.name }} ⇒ {{ transfer.budget_to.name }}
              </h1>
              <p>
                {{ transfer.value }}
              </p>
              <span
                v-for="tag in transfer.tags.map(tag => tag.name)"
                :key="tag"
                >{{ tag }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <transition name="fade">
        <app-pagination
          v-if="total > 5"
          :hasNextPage="hasNextPage"
          :hasPrevPage="hasPrevPage"
          :total="total"
          @currentPage="fetchTransfers"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Multiselect from 'vue-multiselect'
import {actionTypes} from '@/store/modules/transfersList'
import {actionTypes as editTransferActionTypes} from '@/store/modules/editTransfer'
import AppPagination from '@/components/Pagination'
import AppLoading from '@/components/Loading'
import AppCreateTransfer from '@/components/CreateTransfer'
import AppEditTransfer from '@/components/EditTransfer'

export default {
  name: 'AppTransfersList',
  components: {
    AppPagination,
    AppLoading,
    AppCreateTransfer,
    AppEditTransfer,
    Multiselect
  },
  data() {
    return {
      startPage: 1,
      createForm: false,
      editForm: false,
      editTransfer: null,
      sortBy: {name: 'По дате добавления ↑', value: '-id'},
      sortItemsList: [
        {name: 'По дате добавления ↑', value: '-id'},
        {name: 'По дате добавления ↓', value: 'id'},
        {name: 'По дате ↑', value: '-date'},
        {name: 'По дате ↓', value: 'date'},
        {name: 'По источникам ↑', value: '-budget_from'},
        {name: 'По источникам ↓', value: 'budget_from'},
        {name: 'По получателям ↑', value: '-budget_to'},
        {name: 'По получателям ↓', value: 'budget_to'},
        {name: 'По значению ↑', value: '-value'},
        {name: 'По значению ↓', value: 'value'},
        {name: 'По тегам ↑', value: '-tags'},
        {name: 'По тегам ↓', value: 'tags'}
      ],
      search: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.transfersList.isLoading,
      transfers: state => state.transfersList.data.results,
      error: state => state.transfersList.error,
      total: state => state.transfersList.data.count,
      hasNextPage: state => Boolean(state.transfersList.data.next),
      hasPrevPage: state => Boolean(state.transfersList.data.previous)
    })
  },
  watch: {
    createForm() {
      this.fetchTransfers(this.startPage)
    },
    editForm() {
      this.fetchTransfers(this.startPage)
    },
    sortBy() {
      this.fetchTransfers(this.startPage)
    },
    search() {
      this.fetchTransfers(this.startPage)
    }
  },
  mounted() {
    this.fetchTransfers(this.startPage)
  },
  methods: {
    fetchTransfers(pageNumber) {
      this.$store.dispatch(actionTypes.getTransfersList, {
        pageNumber: pageNumber,
        sortBy: this.sortBy.value,
        search: this.search
      })
    },
    clickTransfer(transferItem) {
      if (transferItem === this.editTransfer && this.editForm === true) {
        this.editForm = false
      } else if (transferItem != this.transfer && this.editForm === true) {
        this.editTransfer = transferItem
      } else {
        this.editForm = !this.editForm
        this.editTransfer = transferItem
      }
      this.createForm = false
    },
    deleteTransfer(transferId) {
      this.$store
        .dispatch(editTransferActionTypes.deleteTransfer, {
          slug: transferId
        })
        .then(() => {
          this.fetchTransfers(this.startPage)
          this.editForm = false
        })
    }
  }
}
</script>

<style lang="scss"></style>
