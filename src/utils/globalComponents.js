import Vue from 'vue'
import MainLayout from '@/layouts/Main'

const Components = [
  MainLayout
]

Components.forEach(component => {
  Vue.component(component.name, component)
})
