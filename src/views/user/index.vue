<template>
  <div class="table">
    <el-table :data="tableData" height="610" border stripe>
      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        :sortable="col.id === 'age'"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      background
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserList } from "@/api/table";

export default {
  name: "User",
  data() {
    return {
      totalData: [],

      pageSize: 10,
      pageSizes: [5, 10, 20, 50],
      currentPage: 1,
    };
  },
  created() {
    this.columnsMap = {
      date: "日期",
      name: "名称",
      address: "地址",
      age: "年龄",
      birthday: "生日",
      phone: "电话",
      email: "邮箱",
    };

    getUserList().then((res) => {
      this.totalData = res.data.data || [];
    });
  },
  watch: {
    totalData(val) {
      this.pageSizes.push(val.length);
    },
  },
  computed: {
    tableData() {
      return this.totalData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    columns() {
      if (this.tableData.length === 0) return [];
      let columns = [];
      for (let key in this.tableData[0]) {
        columns.push({
          id: key,
          label: this.columnsMap[key] || key,
        });
      }
      return columns;
    },
    totalNum() {
      return this.totalData.length;
    },
  },
  methods: {
    sizeChange(val) {
      console.log(val);
      this.pageSize = val !== val ? this.totalNum : val;
      this.currentPage = 1;
    },
    currentChange(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}
</style>