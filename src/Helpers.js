const baseURL = 'http://localhost:3000/api/v1';

export const signup = async (credits) => {
  const respond = await fetch(`${baseURL}/traders`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ trader: credits }),
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};

export const signin = async (credits) => {
  const respond = await fetch(`${baseURL}/sessions`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(credits),
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};

// New methods

// Categories with limited products
export const storeIndex = async (id) => {
  const respond = await fetch(`${baseURL}/store?id=${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};

export const storeCategories = async (token) => {
  const respond = await fetch(`${baseURL}/trader-categories`, {
    headers: { 'Content-Type': 'application/json', Authorization: token },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};

export const storeItem = async (storename, itemId) => {
  const respond = await fetch(`${baseURL}/${storename}/items/${itemId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};
