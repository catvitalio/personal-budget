<template>
  <div>
    <ul class="arrows-pagination">
      <li>
        <a href="#" @click="prevPage"
          ><span class="pagination-item" :class="{active: hasPrevPage}"
            >← сюда
          </span></a
        >
      </li>
      <li>
        <a href="#" @click="nextPage"
          ><span class="pagination-item" :class="{active: hasNextPage}">
            туда →</span
          ></a
        >
      </li>
    </ul>
    <ul class="arrows-pagination">
      <li v-for="page in pages" :key="page">
        <a href="#" @click="changePage(page)"
          ><span
            class="pagination-item"
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

<style lang="scss">
.arrows-pagination {
  list-style: none;
  text-align: center;
  margin: auto;
  padding: 0;
  li {
    display: inline-block;
    padding: 3px;
    a {
      text-decoration: none;
    }
  }
}

.pagination-item {
  font-size: $--font-size-subtitle;
  font-weight: $--font-weight-medium;
  color: $--text;
  transition: $--transition;
  &:hover {
    color: $--secondary;
    transition: $--transition;
  }
}

.active {
  color: $--primary;
}

span.first::after,
span.last::before {
  content: '...';
}
</style>
