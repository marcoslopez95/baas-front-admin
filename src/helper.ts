import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { toast, ToastOptions } from 'vue3-toastify';

export const helperStore = defineStore('helper',() => {
    
  const items = ref()
  const item = ref()
  const router = useRouter()
  const form = ref()
  const paginated = ref({
    "currentPage":1,
    "perPage":6,
  })
  const isAutenticated = () => {
    return localStorage.getItem('token') || false
  }

  const http = (url:string,method: Method = 'get', options: AxiosRequestConfig = {}, notification = '') => {
    return new Promise(async (resolve, reject) => {
      try{
        let config: AxiosRequestConfig = {
          url,
          method,
          ...options
        }
        // console.log('asd',config)
        if(isAutenticated()){
          config.headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        let response: AxiosResponse = await axios(config)
        if(notification){
          showNotify(notification)
        }
        resolve(response)
      }catch(error: AxiosResponse | any){
        getErrors(error.response.data.errors)
        if(error.response && error.response.status === 401){
          // console.log('aq2')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
        }
        reject(error)
      }
    })
  }

  const getErrors = (errors:any) => {
    let error:string[] = []
    let op:ToastOptions = {
      type: 'error',
    }
    if(errors){
    // console.log('asd',errors)
    for(let err in errors){
      // console.log('er',errors[err][0])
      error.push(errors[err][0])
    }
    }
    // console.log(error)
    error.forEach(er => showNotify(er,op))
    
  }

  const showNotify = (msg:string, options: ToastOptions = {type:'success'}) => {
    toast(msg, {
      theme: 'colored',
      ...options
    }); // ToastOptions
  }

  const url = ref('')

  
  const pagination = reactive({
    perPage : 15,
    currentPage : 1,
    to: 1,
    total: 0,
  })

  const perPage = [
    5,10,15,20,50,100
  ]

  const index = async (params:any = {}) => {
    item.value = []
    let response:any = await http(url.value,'get',{
      params: {
        ...params,
        perPage: pagination.perPage,
        currentPage: pagination.currentPage,
      }
    })
    items.value = response.data.data    
    pagination.to = response.data.to
    pagination.total = response.data.last_page
  }

  const show = (id:any) => {
    return new Promise(async (resolve, reject) => {
      try{
        let response = await http(url.value+'/'+id,'get',)
        
        resolve(response)
      }catch(err){
        reject(err)
      }
    })
  }

  const put = (id:any, data:any) => {
    return new Promise(async (resolve, reject) => {
      try{
        let response = await http(url.value+'/'+id,'put',{data})
        
        resolve(response)
      }catch(err){
        reject(err)
      }
    })
  }

  const create = (data:any) => {
    return new Promise(async (resolve, reject) => {
      try{
        let response = await http(url.value,'post',{data})
        
        resolve(response)
      }catch(err){
        reject(err)
      }
    })
  }

  const deleted = (id:any) => {
    return new Promise(async (resolve, reject) => {
      try{
        let response = await http(url.value+'/'+id,'delete')
        
        resolve(response)
      }catch(err){
        reject(err)
      }
    })
  }
  return {
    pagination,
    isAutenticated,
    items,
    item,
    http,
    paginated,
    form,
    showNotify,
    getErrors,
    index,
    show,
    put,
    create,
    deleted,
    url,
    perPage
  }
})

export const isAutenticated = () => {
  return localStorage.getItem('token') || false
}

