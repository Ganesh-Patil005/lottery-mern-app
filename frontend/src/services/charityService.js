import api from './api'

export const getCharities = () => api.get('/charities')
export const createCharity = (data) => api.post('/charities', data)
export const updateCharity = (id, data) => api.patch(`/charities/${id}`, data)