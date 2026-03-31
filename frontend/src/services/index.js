import axios from 'axios';

const envBaseURL = process.env.REACT_APP_API_URL
const baseURL = envBaseURL
  ? envBaseURL.replace(/\/+$/, '')
  : process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : ''

if (!baseURL && process.env.NODE_ENV !== 'development') {
  console.warn('Missing REACT_APP_API_URL. Frontend requests will use the current origin.');
}

const service = axios.create({
  baseURL,
  withCredentials: true
})


const MY_SERVICE = {
  test: async () => {
    return await service.get('/');
  },
  signup: async (user) => {
    return await service.post('/signup', user);
  },
  login: user => {
    return service.post('/login', user);
  },

  logout: async () => {
    return await service.get('/logout');
  },

  getUser: () => {
    return service.get('/profile')
  },

  getotherUser: (data) => {
    return service.get(data)
  },
  
  getUsers: () => {
    return service.get('/users')
  },
  
  updateUser: async (data, form) => {
    return await service.patch(data, form);
  },

  deletUser: async (data) => {
    return await service.delete(data)
  },
  deletMatch: async (data) => {
    return await service.delete(data)
  },
  deleteTeam: async (data) => {
    return await service.delete(data)
  },

  updateTeam: async (data, form) => {
    return await service.patch(data, form);
  },

  addTeam: user => {
    return service.post('/teams', user);
  },
  getTeams: async () => {
    return await service.get('/teams');
  },
  
  getMatches: async () => {
    return await service.get('/matchs');
  },

  getMatch: async (data) => {
    return await service.get(data);
  },
  createMatch: async (user) => {
    return await service.post('/matchs', user);
  },
  getTeam: async (data) => {
    return await service.get(data);
  },

  updateEvent: async (data, form) => {
    return await service.patch(data, form);
  },

  createComment: async (data, form) => {
    return await service.post(data, form);
  }

}

export default MY_SERVICE;
