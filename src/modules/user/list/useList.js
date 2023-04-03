import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue'
import { useStore } from '../store'
import { useConfirm } from 'primevue/useconfirm'
import { useDebounceFn } from '@/utils/debounce'
import { multisortConvert } from '@/utils/multisort'
import EventBus from '@/libs/AppEventBus'

export const useList = () => {
    const loading = ref(true)
    const store = useStore()
    const confirm = useConfirm()
    const actionMenu = ref()
    const columnMenu = ref()

    const dt = ref() //dt data table
    const lazyParams = ref({})
    const customers = ref()
    const totalRecords = ref(0)
    const search = ref('')

    const roles = ref([
        { name: 'Admin', code: 'amdin' },
        { name: 'Manager', code: 'manager' },
        { name: 'User', code: 'use' }
    ])

    const columns = ref([
        { field: 'firstName', header: 'First Name', sortable: true, selected: true, style: 'min-width: 15rem', frozen: true },
        { field: 'age', header: 'Age', sortable: true, selected: false, style: 'min-width: 5rem' },
        { field: 'gender', header: 'Gender', sortable: true, selected: true, style: 'min-width: 15rem' },
        { field: 'phone', header: 'Phone Number', sortable: true, selected: true, style: 'min-width: 15rem' },
        { field: 'email', header: 'Email Address', sortable: false, selected: false, style: 'min-width: 15rem' },
        { field: 'birthDate', header: 'Birth Date', sortable: true, selected: true, style: 'min-width: 15rem' },
        { field: 'bloodGroup', header: 'Blood Group', sortable: true, selected: true, style: 'min-width: 10rem' },
        { field: 'height', header: 'Height', sortable: true, selected: true, style: 'min-width: 10rem' },
        { field: 'weight', header: 'Weight', sortable: true, selected: false, style: 'min-width: 10rem' },
        { field: 'actions', header: 'Actions', sortable: false, selected: true, style: 'min-width: 10rem', frozen: true, alignFrozen: 'right' }
    ])

    const selectedRole = ref('')
    const actionItems = ref([
        {
            label: 'Import',
            icon: 'pi pi-download',
            command: () => {}
        },
        {
            label: 'Export',
            icon: 'pi pi-upload',
            command: () => {}
        }
    ])

    onMounted(() => {
        resetPagination()
        fetchUserList()
    })

    onBeforeUnmount(() => {
        store.$dispose()
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
            multiSortMeta: [],
            first: 0
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
        lazyParams.value.first = 0
        fetchUserList()
    }

    const showConfirmDialog = (id) => {
        confirm.require({
            header: 'Confirmation',
            message: 'Are you sure want to delete?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes, delete it',
            rejectLabel: 'Cancel',
            acceptClass: 'p-button-danger',
            rejectClass: 'p-button-secondary p-button-text',
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
            EventBus.emit('show-toast', {
                severity: 'success',
                summary: '',
                detail: 'Delete Successfully'
            })
            resetPagination()
            fetchUserList()
        }

        loading.value = false
    }

    const toggleActionMenu = (event) => {
        actionMenu.value.toggle(event)
    }

    const toggleColumnMenu = (event) => {
        columnMenu.value.toggle(event)
    }

    const selectedColumns = computed(() => {
        return columns.value.filter((col) => col.selected)
    })

    watch(
        [search],
        useDebounceFn(() => {
            resetPagination()
            fetchUserList()
        }, 500)
    )

    watch([selectedRole], () => {
        resetPagination()
        fetchUserList()
    })

    return {
        dt,
        lazyParams,
        totalRecords,
        customers,
        loading,
        search,
        actionItems,
        roles,
        selectedRole,
        actionMenu,
        toggleActionMenu,
        showConfirmDialog,
        onPage,
        onSort,
        toggleColumnMenu,
        selectedColumns,
        columns,
        columnMenu
    }
}
