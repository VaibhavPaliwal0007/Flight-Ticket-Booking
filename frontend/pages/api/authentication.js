// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// async function errorHandler(fn) {
//   try {
//      return await fn.call(this);
//   } catch(err) {
//     console.log(err);
//     return { error: err.message };
//   }
// }

export async function login(data) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      console.log(json);
      throw new Error(json.error);
    }

    return json;
  } catch (error) {
    throw new Error(error);
  }
};

export async function adminLogin(data) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error);
    }

    return json;
  } catch (error) {
    throw new Error(error);
  }
};

export async function signup(data) {
  // api is localhost:3000/api/v1/auth/signup
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error.message);
    }

    return json;
  } catch (error) {
    throw new Error(error);
  }
};