<template>
  <div>
    <div class="mb-6 rounded-xl border border-surface-200 p-4">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div>
          <label class="mb-2 flex items-center text-sm"><i class="pi pi-filter"></i>&nbsp; {{ $t('Role') }} </label>
          <Select v-model="selectedRole" :options="roles" optionLabel="name" optionValue="name" placeholder="Select role" class="w-full" showClear />
        </div>

        <!-- <div>
          <label class="mb-2 flex items-center text-sm"><i class="pi pi-filter"></i>&nbsp;{{ $t('Status') }} </label>
          <Select v-model="selectedStatus" :options="statuses" optionLabel="name" optionValue="code" placeholder="Select status" class="w-full" showClear />
        </div> -->

        <!-- <div>
          <label class="mb-2 flex items-center text-sm"><i class="pi pi-filter"></i>&nbsp;{{ $t('Date') }}</label>
          <DatePicker :placeholder="$t('Date Range')" inputId="selectedDateBetween" v-model="selectedDateBetween" selectionMode="range" :manualInput="false" dateFormat="dd/mm/yy" class="w-full" showIcon :showButtonBar="true" />
        </div> -->
      </div>
    </div>
    <div class="overflow-hidden rounded-xl border border-surface-200">
      <DataTable
        ref="dt"
        dataKey="id"
        size="small"
        :lazy="true"
        :paginator="true"
        :value="records"
        @page="onPage($event)"
        @sort="onSort($event)"
        sortMode="multiple"
        :multiSortMeta="lazyParams.multiSortMeta"
        :totalRecords="totalRecords"
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50, 100]"
        :scrollable="true"
        :first="lazyParams.first"
        scrollHeight="60vh"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :loading="isLoading"
        responsiveLayout="scroll"
        class="p-4"
      >
        <template #header>
          <div class="flex flex-wrap justify-end gap-2">
            <IconField class="w-full md:w-auto">
              <InputIcon class="pi pi-search" />
              <InputText v-model="search" placeholder="Keyword Search" class="w-full md:w-auto" />
            </IconField>
            <router-link v-if="$can('create', 'users')" :to="{ name: 'newUser' }">
              <Button label="New" severity="success" />
            </router-link>

            <Popover ref="columnMenu" appendTo="body" id="columnPanel" style="width: 250px">
              <div v-for="column in columns" :key="column.field" class="my-1 flex gap-4">
                <Checkbox :inputId="column.field" name="column" :modelValue="column.selected" :binary="true" @change="column.selected = !column.selected" :disabled="column.frozen" />
                <label :for="column.field">{{ column.header }}</label>
              </div>
            </Popover>
            <Button icon="pi pi-sliders-h" @click="toggleColumnMenu" outlined severity="secondary" />
          </div>
        </template>
        <template #empty> No records found. </template>
        <template #loading> Loading records data. Please wait. </template>

        <Column v-for="column in selectedColumns" :key="column.field" :field="column.field" :header="column.header" :sortable="column.sortable" :frozen="!isMobile && column.frozen" :alignFrozen="column.alignFrozen" :style="column.style">
          <template v-if="column.field === 'actions'" #body="{ data }">
            <div class="flex gap-2">
              <router-link v-if="$can('edit', 'users')" :to="{ name: 'editUser', params: { id: data.id } }">
                <Button type="button" icon="pi pi-pencil" size="small" text rounded outlined />
              </router-link>
              <Button v-if="$can('delete', 'users')" type="button" size="small" icon="pi pi-trash" severity="danger" text rounded @click="showConfirmDialog(data.id)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Menu ref="actionMenu" :model="actionItems" :popup="true" />
  <ConfirmDialog>
    <template #message="slotProps">
      <div class="w-full text-center">
        <i :class="slotProps.message.icon" class="mt-2 text-red-500" style="font-size: 3rem"></i>
        <div class="mt-2">{{ slotProps.message.message }}</div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useList } from './useList'
import { useDevice } from '@/utils/device'

const { dt, lazyParams, totalRecords, records, isLoading, search, actionItems, roles, selectedRole, actionMenu, showConfirmDialog, onPage, onSort, toggleColumnMenu, selectedColumns, columns, columnMenu } = useList()
const { isMobile } = useDevice()
</script>

<style lang="scss" scoped></style>
