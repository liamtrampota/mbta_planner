const MTA_API_URL = "https://api-v3.mbta.com";

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.api+json',
  }
};

export const getRoutes = () => fetch(`${MTA_API_URL}/routes?filter%5Btype%5D=0%2C1`, options);
export const getStops = (routeId) => fetch(`${MTA_API_URL}/stops?filter%5Broute%5D=${routeId}`, options);
export const getPredictedSchedule = (directionId, routeId, stopId) => fetch(`${MTA_API_URL}/predictions?filter%5Bdirection_id%5D=${directionId}&filter%5Broute%5D=${routeId}&filter%5Bstop%5D=${stopId}`)

export const makeRequest = async (request, ...args) => {
  console.log('args:', ...args);
  return new Promise(function(resolve, reject) {
    request(...args)
    .then(async (response)=>{
      console.log('response:', response);
      if (response && response.status === 200){
        let responseJson = response.json();
        resolve(responseJson);
        return;
      } else {
        reject(response.error)
        return;
      }
    })
    .catch((e) => {
      reject(e)
    })
  })
}
