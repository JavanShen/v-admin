<template>
    <div class="table">
        <user-table
            :table-data="tableData"
            :columns="columns"
            :loading="loading"
            @edit="editRow"
        ></user-table>
        <el-pagination
            @size-change="sizeChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            background
            class="pagination"
        >
        </el-pagination>

        <user-edit :visible.sync="showEdit" :form-data="editForm" @submit="updateUserInfo"></user-edit>
    </div>
</template>

<script>
import { getUserList, updateUser } from "@/api/user";
import UserTable from "./components/table.vue";
import UserEdit from "./components/form.vue";
import { betweenDate } from "@/utils/date";

export default {
    name: "User",
    components: {
        UserTable,
        UserEdit,
    },
    data() {
        return {
            totalData: [],
            loading: true,

            pageSize: 10,
            pageSizes: [5, 10, 20, 50],
            currentPage: 1,
            currentEdit: {
                index: 0,
                tableData: [],
            },

            showEdit: false,
            editForm: {},
        };
    },
    created() {
        this.columnsMap = {
            date: "日期",
            name: "姓名",
            address: "地址",
            age: "年龄",
            birthday: "生日",
            phone: "电话",
            email: "邮箱",
        };

        this.today = new Date();
        this.getData()
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
            let columns = [],
                headOrder = [
                    "id",
                    "name",
                    "address",
                    "age",
                    "birthday",
                    "phone",
                    "email",
                ];
            for (let key of Object.keys(this.tableData[0]).sort(
                (a, b) => headOrder.indexOf(a) - headOrder.indexOf(b)
            )) {
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
        currentEditIndex() {
            return (this.currentPage-1)*this.pageSize+this.currentEdit.index;
        }
    },
    methods: {
        sizeChange(val) {
            this.pageSize = val !== val ? this.totalNum : val;
            this.currentPage = 1;
        },
        editRow(row,index,tableData) {
            this.editForm = { ...row };
            this.currentEdit = {
                index,
                tableData,
            };
            this.showEdit = true;
        },
        updateUserInfo(val){
            updateUser(val).then(res=>{
                if(res.data.code===0){
                    let data=res.data.data
                    data.age=betweenDate(data.birthday,this.today)
                    
                    this.totalData.splice(this.currentEditIndex,1,res.data.data);

                    this.$message.success("修改成功");

                    this.showEdit=false;
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        getData() {
            getUserList().then((res) => {
                this.totalData = (res.data.data || []).map((item) => {
                    item.age = betweenDate(item.birthday, this.today);
                    return item;
                });
                this.loading = false;
            });
        },
    },
};
</script>

<style scoped>
.pagination {
    margin-top: 20px;
}
</style>