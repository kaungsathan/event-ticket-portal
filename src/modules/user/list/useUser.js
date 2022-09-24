import { ref, onMounted, watch } from "vue"
import { useUserStore } from "../userStore"
import { useConfirm } from "primevue/useconfirm"
import { useDebounceFn } from "@/utils/debounce"
import { multisortConvert } from "@/utils/multisort"
import EventBus from "@/libs/AppEventBus"

export default function useUser() {
  const loading = ref(true)
  const store = useUserStore()
  const confirm = useConfirm()

  const dt = ref() //dt data table
  const lazyParams = ref({})
  const customers = ref()
  const totalRecords = ref(0)
  const search = ref("")
  const menu = ref()

  const roles = ref([
    { name: "Admin", code: "amdin" },
    { name: "Manager", code: "manager" },
    { name: "User", code: "use" }
  ])

  const selectedRole = ref("")
  const actionItems = ref([
    {
      label: "Import",
      icon: "pi pi-download",
      command: () => {}
    },
    {
      label: "Export",
      icon: "pi pi-upload",
      command: () => {}
    }
  ])

  const columns = ref([
    { field: "age", header: "Age", sortable: true, style: "min-width: 150px;" },
    {
      field: "phone",
      header: "Phone Number",
      sortable: true,
      style: "min-width: 150px;"
    },
    {
      field: "email",
      header: "Email Address",
      sortable: true,
      style: "min-width: 150px;"
    },
    {
      field: "gender",
      header: "Gender",
      sortable: true,
      style: "min-width: 150px;"
    },
    {
      field: "birthDate",
      header: "Age",
      sortable: true,
      style: "min-width: 150px;"
    },
    {
      field: "university",
      header: "University",
      sortable: true,
      style: "min-width: 150px;"
    },
    {
      field: "bloodGroup",
      header: "Blood Group",
      sortable: true,
      style: "min-width: 150px;"
    },
    {
      field: "weight",
      header: "Weight",
      sortable: true,
      style: "min-width: 150px;"
    },
    {
      field: "eyeColor",
      header: "Eye Color",
      sortable: true,
      style: "min-width: 150px;"
    },
    {
      field: "domain",
      header: "Domain",
      sortable: true,
      style: "min-width: 150px;"
    }
  ])
  const selectedColumns = ref(columns.value)

  onMounted(() => {
    resetPagination()
    fetchUserList()
  })

  const fetchUserList = async () => {
    loading.value = true

    //fetch API
    await store.fetchAll({
      page: (lazyParams.value.page += 1), //default page is 0
      per_page: lazyParams.value.rows,
      order: multisortConvert(lazyParams.value.multiSortMeta),
      search: search.value
    })

    //get response
    const response = store.getAllResponse
    //assign value
    if (response) {
      customers.value = response.users
      totalRecords.value = customers.value.length
    }
    loading.value = false
  }

  const resetPagination = () => {
    lazyParams.value = {
      page: 0,
      rows: dt.value.rows,
      multiSortMeta: []
    }
  }

  //Pagination
  const onPage = (event) => {
    lazyParams.value = event
    lazyParams.value.multiSortMeta = []
    fetchUserList()
  }

  //Sorting
  const onSort = (event) => {
    lazyParams.value = event
    lazyParams.value.page = 0 // when sorting, page doesn't exist
    fetchUserList()
  }

  const showConfirmDialog = (id) => {
    confirm.require({
      message: "Are you sure?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes, delete it",
      rejectLabel: "Cancel",
      acceptClass: "p-button-danger",
      rejectClass: "p-button-danger p-button-text",
      accept: () => {
        deleteUser(id)
      },
      reject: () => {
        //callback to execute when user rejects the action
      },
      onHide: () => {
        //Callback to execute when dialog is hidden
      }
    })
  }

  const deleteUser = async (id) => {
    loading.value = true

    await store.delete({ id: id })
    const response = store.getDeleteResponse

    if (response) {
      EventBus.emit("show-toast", {
        severity: "success",
        summary: "",
        detail: "Delete Successfully"
      })
      resetPagination()
      fetchUserList()
    }

    loading.value = false
  }

  const onToggle = (val) => {
    selectedColumns.value = columns.value.filter((col) => val.includes(col))
  }

  const toggleMenu = (event) => {
    menu.value.toggle(event)
  }

  watch(
    [search],
    useDebounceFn(() => {
      resetPagination()
      fetchUserList()
    }, 500)
  )

  return {
    dt,
    lazyParams,
    totalRecords,
    customers,
    loading,
    store,
    search,
    actionItems,
    menu,
    roles,
    selectedRole,
    columns,
    selectedColumns,
    onToggle,
    toggleMenu,
    deleteUser,
    showConfirmDialog,
    onPage,
    onSort
  }
}
