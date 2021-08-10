const baseURL = 'http://localhost:3000/api/v1';

export const signup = async (credits) => {
  const respond = await fetch(`${baseURL}/users`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ user: credits }),
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};

export const signin = async (credits) => {
  const respond = await fetch(`${baseURL}/user_sessions`, {
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

export const storeCategories = async (storename, catId) => {
  const respond = await fetch(`${baseURL}/store/${storename}?cat_id=${catId}`, {
    headers: { 'Content-Type': 'application/json' },
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

export const AddItemToCart = async (itemId, quantity, userToken, storeName) => {
  const respond = await fetch(`${baseURL}/carts`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: userToken,
    },
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
      quantity: quantity,
      storename: storeName,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};

export const cartItems = async (userToken, storeName) => {
  const respond = await fetch(`${baseURL}/carts?storename=${storeName}`, {
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};

export const delCartItem = async (userToken, itemId) => {
  const respond = await fetch(`${baseURL}/carts/${itemId}`, {
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};

export const addOrder = async (userToken, orderInfo) => {
  const respond = await fetch(`${baseURL}/orders/`, {
    headers: { 'Content-Type': 'application/json', Authorization: userToken },
    method: 'POST',
    body: JSON.stringify(orderInfo),
  })
    .then((res) => res.json())
    .then((data) => data);
  return respond;
};
