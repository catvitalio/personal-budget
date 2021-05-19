<template>
  <div>
    <ul class="arrows-pagination">
      <li>
        <a href="#" @click="prevPage"
          ><span class="pagination" :class="{active: hasPrevPage}"
            >← сюда
          </span></a
        >
      </li>
      <li>
        <a href="#" @click="nextPage"
          ><span class="pagination" :class="{active: hasNextPage}">
            туда →</span
          ></a
        >
      </li>
    </ul>
    <ul class="arrows-pagination">
      <li v-for="page in pages" :key="page">
        <a href="#" @click="changePage(page)"
          ><span
            class="pagination"
            :class="{
              active: currentPage === page,
              first: page === pages[0] && Math.abs(page - currentPage) > 3,
              last:
                page === pages[pages.length - 1] &&
                Math.abs(page - currentPage) > 3
            }"
            >{{ page }}</span
          ></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import {range} from '@/helpers/utils'

export default {
  name: 'AppPagination',
  data() {
    return {
      currentPage: 1
    }
  },
  props: {
    hasNextPage: {
      type: Boolean,
      required: true
    },
    hasPrevPage: {
      type: Boolean,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() {
      const totalPages = Math.ceil(this.total / 5)
      const pagesCount = range(1, totalPages)
      return pagesCount.filter(
        page =>
          Math.abs(page - this.currentPage) < 3 ||
          page == totalPages ||
          page == 1
      )
    }
  },
  methods: {
    nextPage() {
      if (this.hasNextPage) this.currentPage += 1
      this.$emit('currentPage', this.currentPage)
    },
    prevPage() {
      if (this.hasPrevPage) this.currentPage -= 1
      this.$emit('currentPage', this.currentPage)
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.$emit('currentPage', this.currentPage)
    }
  }
}
</script>

<style>
.arrows-pagination {
  list-style: none;
  margin: auto;
  width: 50%;
  text-align: center;
}

.arrows-pagination > li {
  display: inline-block;
  padding: 3px;
}

.pagination {
  font-size: 26px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  display: inline-block;
  position: relative;
}

.active {
  color: green;
}

span.first::after,
span.last::before {
  content: '...';
}
</style>
