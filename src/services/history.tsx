import http from "./http";


async function getHistory() {
    try {
        const res = await http.post('/', {
          "action": "history"
        })
        return res;
    } catch (e) {
        throw e;
    }
};

export default getHistory;