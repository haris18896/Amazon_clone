import axios from 'axios';

const instance = axios.create({
    // the API (cloud function) URL
    baseURL: "http function initialized (http://localhost:5001/clone-4cb1b/us-central1/api)"
})

export default instance;