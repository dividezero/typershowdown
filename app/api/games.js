import { apiUrl } from '../config.json';

export const getGameSessions = async (gameName, status = '') =>
  fetch(`${apiUrl}/channels/${gameName}/${status}`, {
    method: 'GET',
  });

export const clearChannel = async channelId =>
  fetch(`${apiUrl}/channels/clear/${channelId}`, {
    method: 'GET',
  });

export const getRandomWords = async number =>
  fetch(`${apiUrl}/typerShowdown/words/${number}`, {
    method: 'GET',
  });
