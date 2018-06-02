import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'
import MainLayout from '@/layouts/Main'

const Components = [
  Icon,
  MainLayout
]

Components.forEach(component => {
  Vue.component(component.name, component)
})
