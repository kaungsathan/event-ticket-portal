<template>
  <div class="card">
    <DataTable
      ref="dt"
      data-key="id"
      :lazy="true"
      :paginator="true"
      :value="subscriptionList"
      @page="onPage($event)"
      @sort="onSort($event)"
      sortMode="multiple"
      :multiSortMeta="lazyParams.multiSortMeta"
      :totalRecords="totalRecords"
      :rows="1"
      :rows-per-page-options="[1, 2, 3]"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
      responsive-layout="scroll"
      :loading="loading"
    >
      <template #header>
        <div class="flex flex-wrap justify-content-between align-items-center">
          <h5 class="m-0">{{ $t("subscriptionList") }}</h5>

          <div class="mt-3 md:mt-0">
            <span class="p-input-icon-left w-full md:w-auto">
              <i class="pi pi-search" />
              <InputText
                v-model="search"
                placeholder="Keyword Search"
                class="w-full md:w-auto"
              />
            </span>
            <!-- <router-link
              v-if="$can('create', 'scsc-subscription')"
              :to="{ name: 'newSubscription' }"
            > -->
            <Button
              label="New"
              class="p-button-success ml-0 md:ml-2 mt-2 md:mt-0"
            />
            <!-- </router-link> -->
            <Menu ref="menu" :model="actionItems" :popup="true" />
            <Button
              icon="pi pi-cog"
              @click="toggleMenu"
              class="p-button-success p-button-outlined ml-2 mt-2 md:mt-0"
            />
          </div>
        </div>
      </template>
      <template #empty> No subscriptionList found. </template>
      <template #loading>
        Loading subscriptionList data. Please wait.
      </template>
      <Column field="name" header="Name" :sortable="true" />
      <Column field="benefits" header="Benefits" :sortable="true" />
      <Column field="description" header="Description" :sortable="true" />
      <Column field="duration" header="Duration" :sortable="true" />
      <Column field="duration_unit" header="Duration Unit" :sortable="true" />
      <Column field="price" header="Price" :sortable="true" />
      <Column field="status" header="Status" :sortable="true" />
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex">
            <!-- <router-link
                v-if="$can('show', 'scsc-subscription')"
                :to="{ name: 'editSubscription', params: { id: data.id } }"
              > -->
            <Button
              type="button"
              icon="pi pi-pencil"
              class="mr-2 p-button-info p-button-rounded p-button-outlined"
            />
            <!-- </router-link> -->
            <Button
              v-if="$can('delete', 'scsc-subscription')"
              type="button"
              icon="pi pi-trash"
              class="p-button-danger p-button-rounded p-button-outlined"
              @click="showConfirmDialog(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <ConfirmDialog :showHeader="false">
      <template #message="slotProps">
        <div class="text-center w-full">
          <Button
            type="button"
            :icon="slotProps.message.icon"
            class="p-button-lg p-button-danger p-button-rounded p-button-outlined mt-4"
          />
          <h4>{{ slotProps.message.message }}</h4>
        </div>
      </template></ConfirmDialog
    >
  </div>
</template>

<script>
import Button from "primevue/button"
import Column from "primevue/column"
import DataTable from "primevue/datatable"
import InputText from "primevue/inputtext"
import Menu from "primevue/menu"
import ConfirmDialog from "primevue/confirmdialog"

import { defineComponent } from "vue"
import useSubscription from "./useSubscription"

export default defineComponent({
  name: "UserList",
  components: {
    Button,
    Column,
    DataTable,
    InputText,
    Menu,
    ConfirmDialog
  },
  setup() {
    const {
      dt,
      lazyParams,
      totalRecords,
      showDeleteDialog,
      showConfirmDialog,
      subscriptionList,
      loading,
      store,
      search,
      actionItems,
      toggleMenu,
      menu,
      deleteUser,
      onPage,
      onSort
    } = useSubscription()

    return {
      dt,
      lazyParams,
      totalRecords,
      showDeleteDialog,
      showConfirmDialog,
      subscriptionList,
      loading,
      store,
      search,
      actionItems,
      toggleMenu,
      menu,
      deleteUser,
      onPage,
      onSort
    }
  }
})
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

::v-deep(.p-datatable.p-datatable-subscriptionList) {
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
