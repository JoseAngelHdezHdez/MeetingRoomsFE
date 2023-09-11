import axios from 'axios';

export const getMeetings = async() => {
    try {
        const {data} = await axios.get(
            'http://127.0.0.1:8000/api/meetings'
        );
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const postMeeting = async(item) => {
    try {
        const {data} = await axios.post(
            'http://127.0.0.1:8000/api/meetings',
            item
        )
        return data;
    } catch (error) {
        console.log();
    }
}

export const deleteMeeting = async(item) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/meetings/${item.id}`)
    } catch (error) {
        
    }
}

export const putMeeting = async(item) => {
    try {
        await axios.put(
            `http://127.0.0.1:8000/api/meetings/${item.id}`,
            item
        )
    } catch (error) {
        console.log();
    }
}