// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function login(data) {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/login`, {
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
     console.log(error);
      throw new Error(error);
  }
};

export async function signup(data) {
  // api is localhost:3000/api/v1/auth/signup
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/signup`, {
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