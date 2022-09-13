<template>
  <div>
    <DataTable
      :value="customers"
      :paginator="true"
      :rows="10"
      dataKey="id"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 25, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
      :loading="loading"
    >
      <template #header>
        <div class="flex flex-wrap justify-content-between align-items-center">
          <h5 class="m-0">Customers</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <div class="mt-3 md:mt-0">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="searchQuery" placeholder="Keyword Search" />
              </span>
              <router-link :to="{ name: 'newUser' }">
                <Button label="Add New" class="p-button-success ml-2" />
              </router-link>
            </div>
          </span>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column field="firstName" header="First Name"></Column>
      <Column field="age" header="Age"></Column>
      <Column field="phone" header="Phone Number"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="birthDate" header="Date of Birth"></Column>
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex">
            <router-link :to="{ name: 'editUser', params: { id: data.id } }">
              <Button
                type="button"
                icon="pi pi-pencil"
                class="mr-2 p-button-info"
              ></Button>
            </router-link>
            <Button
              type="button"
              icon="pi pi-trash"
              class="p-button-danger"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";
import { useUserStore } from "./../userStore";

export default defineComponent({
  name: "userList",
  setup() {
    const loading = ref(true);
    const store = useUserStore();
    const customers = ref();
    const searchQuery = ref("");

    onMounted(() => {
      fetchUserList();
    });

    const fetchUserList = async () => {
      //fetch API
      await store.fetchAll();
      //get response
      const response = store.getAllResponse;
      //assign value
      if (response) {
        customers.value = response.users;
      }

      loading.value = false;
    };

    return {
      customers,
      loading,
      store,
      searchQuery,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/demo/badges.scss";
img {
  vertical-align: middle;
}
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;

  .p-progressbar-value {
    background-color: #607d8b;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}

::v-deep(.p-datatable.p-datatable-customers) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }

  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
  }

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
}
</style>
<i18n src="./../locale.json">
</i18n>