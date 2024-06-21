import axios, { AxiosInstance } from 'axios';
import { useMemo } from 'react';

export const useApi = (): AxiosInstance => {
  const api = useMemo(() => axios.create({
    baseURL: process.env.SUBJECTS_API_BASE_URL || 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
    },
  }), []);

  return api;
};
