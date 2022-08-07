import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export const getAvailableSlots = async ({day, duration}) => {
    const response = await api.get(`/slots?day=${day}&duration_hours=${duration.hours}&duration_minutes=${duration.minutes}`)
    return response;
}

export const bookSlot = async ({day, duration, slot}) => {
    const response = await api.post(`/slots/book`, {day, duration, slot})
    return response;
}