import { apiUrl } from '../config.json';

export const getGameSessions = async gameName =>
  fetch(`${apiUrl}/channels/${gameName}`, {
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
