import axios from 'axios';

export const getPlacesData = async (type, swLat, neLat, swLng, neLng ) => {
  try {
    const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: swLat,
        bl_longitude: swLng,
        tr_longitude: neLng,
        tr_latitude: neLat,
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPID_API,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};