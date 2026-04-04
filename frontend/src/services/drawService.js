import api from './api'

export const getDraws = () => api.get('/draws')
export const getMyResults = () => api.get('/draws/my-results')
export const runDraw = () => api.post('/draws/run')
export const publishDraw = (id) => api.patch(`/draws/${id}/publish`)