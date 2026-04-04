import api from './api'

export const subscribe = (data) => api.post('/subscriptions/subscribe', data)
export const getSubscriptionStatus = () => api.get('/subscriptions/status')
export const cancelSubscription = () => api.patch('/subscriptions/cancel')