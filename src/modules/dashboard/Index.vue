<template>
    <div>
        <h1>Home</h1>
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-4">
                <label for="nrc">Blood Type</label>
                <BloodType id="nrc" v-model="bloodType"></BloodType>
            </div>
            <div class="col-12 md:col-6 lg:col-4">
                <label for="nrc">Gender</label>
                <Gender id="gender" v-model="gender"></Gender>
            </div>
            <div class="col-12 md:col-6 lg:col-4">
                <label for="nrc">NRC</label>
                <NRC id="nrc" v-model="nrc"></NRC>
            </div>
            <div class="col-12 md:col-6 lg:col-4">
                <label for="nrc">Phone Number</label>
                <PhoneNumber id="nrc" v-model:countryCode="countryCode" v-model:phoneNumber="phoneNumber"></PhoneNumber>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import BloodType from '@/components/BloodType.vue'
import Gender from '@/components/Gender.vue'
import NRC from '@/components/NRC.vue'
import PhoneNumber from '@/components/PhoneNumber.vue'

const bloodType = ref('A')
const nrc = ref('6/HTAWANA(N)130599')
const countryCode = ref('+95')
const phoneNumber = ref('092423239')
const gender = ref('MALE')
</script>
<style lang=""></style>
