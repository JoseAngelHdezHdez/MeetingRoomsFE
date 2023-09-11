import axios from 'axios';

export const getMeetingRooms = async() => {
    try {
        const {data} = await axios.get(
            'http://127.0.0.1:8000/api/meeting_rooms'
        );
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getSchedule = async(item) => {
    try {
        const {data} = await axios.get(
            `http://127.0.0.1:8000/api/meeting_rooms/${item}/meetings`
        );
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const postMeetingRooms = async(item) => {
    try {
        const {data} = await axios.post(
            'http://127.0.0.1:8000/api/meeting_rooms',
            item
        )
        return data;
    } catch (error) {
        console.log();
    }
}

export const deleteMeetingRooms = async(item) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/meeting_rooms/${item.id}`)
    } catch (error) {
        
    }
}

export const putMeetingRoom = async(item) => {
    try {
        await axios.put(
            `http://127.0.0.1:8000/api/meeting_rooms/${item.id}`,
            item
        )
    } catch (error) {
        console.log();
    }
}