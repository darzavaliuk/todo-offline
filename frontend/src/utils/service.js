import {CREATE, DELETE, QUEUE, UPDATE, url} from "./constants";
import axios from "axios";

export const removeFromQueue = (id) => {
    if (localStorage.getItem(QUEUE)) {
        const queue = JSON.parse(localStorage.getItem(QUEUE))
        const filteredQueue = queue.filter((item) => item.payload.id !== id)
        localStorage.setItem(QUEUE, JSON.stringify(filteredQueue))
    } else {
        localStorage.setItem(QUEUE, JSON.stringify([]))
    }
}

export const addToQueue = (item) => {
    if (localStorage.getItem(QUEUE)) {
        const queue = JSON.parse(localStorage.getItem(QUEUE))
        queue.push(item)
        localStorage.setItem(QUEUE, JSON.stringify(queue))
    } else {
        localStorage.setItem(QUEUE, JSON.stringify([item]))
    }
}

export const processQueue = () => {
    if (localStorage.getItem(QUEUE)) {
        const queue = JSON.parse(localStorage.getItem(QUEUE))
        for (let item of queue) {
            switch (item.type) {
                case CREATE:
                    axios.post(url, item.payload)
                    break;
                case UPDATE:
                    axios.put(url + item.payload.id, item.payload)
                    break;
                case DELETE:
                    console.log(url + item.payload.id)
                    axios.delete(url + item.payload.id)
                    break;
                default:
                    break;
            }
            removeFromQueue(item.payload.id)
        }
    }
}
