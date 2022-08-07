import axios from 'axios'
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://slot-booking-2022.herokuapp.com/' : 'http://localhost:3000'
export const api = axios.create({
    baseURL: `${apiUrl}/api`,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export const getAvailableSlots = async ({day, duration}) => {
    const response = await api.get(`/slots?day=${day}&duration_hours=${duration.hours}&duration_minutes=${duration.minutes}`)
    return response;
}

export const bookSlot = async ({day, duration, slot, uuid}) => {
    const response = await api.post(`/slots/book`, {day, duration, slot, uuid})
    return response;
}