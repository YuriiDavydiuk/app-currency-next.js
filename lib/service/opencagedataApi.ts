import axios from 'axios';

interface Currency {
  iso_code: string;
}

interface OpenCageResults {
  annotations: { currency: Currency };
}

interface OpenCageRes {
  results: OpenCageResults[];
}

export const getUserInfo = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<OpenCageRes> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<OpenCageRes>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
