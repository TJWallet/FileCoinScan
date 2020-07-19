// import { login, logout, getInfo } from '@/api/login'
// import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '/MvpBackEnd/static/temp/images/header_01.jpg',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_NAME: (state, name) => {
      state.name = name
    },

    SET_AVATAR: (state, avatar) => {
      if (avatar) {
        state.avatar = avatar
      }
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      // const username = userInfo.username ? userInfo.username.trim() : 'admin'
      return new Promise((resolve, reject) => {
        // login(username, userInfo.password).then(response => {
        //   const data = response.Result
        //   setToken(data.memberId)
        //   commit('SET_TOKEN', data.memberId)
        //   commit('SET_ROLES', ['admin'])
        //   commit('SET_NAME', data.username)
        //   commit('SET_AVATAR', data.img)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })

        setToken('0x601568199207182280')
        commit('SET_TOKEN', 0x601568199207182280)
        commit('SET_ROLES', ['admin'])
        commit('SET_NAME', 'admin')
        resolve()
      })
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        //   const data = response.data
        //   if (data.roles && data.roles.length > 0) {
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })

        resolve()
      })
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })

        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
