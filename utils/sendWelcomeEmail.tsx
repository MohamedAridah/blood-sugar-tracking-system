type Params = {
  username: string;
  email: string;
};

export const sendWelcomeEmail = async (data: Params) => {
  return await fetch("/api/sign-up", {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
};
