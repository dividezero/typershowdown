import { apiUrl, randomWordApiUrl, randomWordApiKey } from '../config.json';

export const getGameSessions = async gameName =>
  fetch(`${apiUrl}/channels/${gameName}`, {
    method: 'GET',
  });

export const getRandomWords = async number =>
  fetch(`${randomWordApiUrl}/word?key=${randomWordApiKey}&number=${number}`, {
    method: 'GET',
  });
