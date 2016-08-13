export function checkSuccessStatus(response) {
  if (response.status !== 200) {
    return Promise.reject(response);
  }
  return Promise.resolve(response);
}

export function toJSON(response) {
  return response.json();
}
