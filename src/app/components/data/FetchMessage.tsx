"use server";
export async function FetchMessage() {
  async function getMessage() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/chat`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    return response.json();
  }

  return await getMessage();
}
