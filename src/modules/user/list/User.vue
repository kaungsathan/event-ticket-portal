<template>
  <div>
    <DataTable
      :value="customers"
      :paginator="true"
      :rows="10"
      data-key="id"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[10, 25, 50]"
      current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
      responsive-layout="scroll"
      :loading="loading"
    >
      <template #header>
        <div class="flex flex-wrap justify-content-between align-items-center">
          <h5 class="m-0">{{ $t("customer") }}</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <div class="mt-3 md:mt-0">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="searchQuery" placeholder="Keyword Search" />
              </span>
              <router-link
                v-if="$can('create', 'user')"
                :to="{ name: 'newUser' }"
              >
                <Button label="Add New" class="p-button-success ml-2" />
              </router-link>
            </div>
          </span>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column field="firstName" header="First Name" />
      <Column field="age" header="Age" />
      <Column field="phone" header="Phone Number" />
      <Column field="email" header="Email" />
      <Column field="gender" header="Gender" />
      <Column field="birthDate" header="Date of Birth" />
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex">
            <router-link
              v-if="$can('edit', 'user')"
              :to="{ name: 'editUser', params: { id: data.id } }"
            >
              <Button
                type="button"
                icon="pi pi-pencil"
                class="mr-2 p-button-info"
              />
            </router-link>
            <Button
              v-if="$can('delete', 'user')"
              type="button"
              icon="pi pi-trash"
              class="p-button-danger"
              @click="showConfirmDialog(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="showDeleteDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to delete this user?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="showDeleteDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteUser"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import useUser from "./useUser";

export default defineComponent({
  name: "UserList",
  setup() {
    const {
      showDeleteDialog,
      showConfirmDialog,
      customers,
      loading,
      store,
      searchQuery,
      deleteUser,
    } = useUser();

    return {
      showDeleteDialog,
      showConfirmDialog,
      customers,
      loading,
      store,
      searchQuery,
      deleteUser,
    };
  },
});
</script>

<i18n src="./../locale.json">
</i18n>

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
