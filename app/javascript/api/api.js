import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
});

export const getAvailableSlots = async ({day, duration}) => {
    const response = await api.get(`/slots?day=${day}&duration=${duration}`)
    return response;
}

export const bookSlot = async ({day, duration, slot}) => {
    const response = await api.post(`/slots/book`, {day, duration, slot})
    return response;
}