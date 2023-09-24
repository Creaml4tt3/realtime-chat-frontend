export async function authenticateWithPassport(
  credentials: CredentialPassport
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    const data = await response.json();

    if (data && data.status) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error authenticating with Passport:", error);
    return null;
  }
}
