import api from './api'

export const getScores = () => api.get('/scores')
export const addScore = (data) => api.post('/scores', data)