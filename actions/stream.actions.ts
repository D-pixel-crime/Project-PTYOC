"use server";

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged in/authenticated !");
  if (!apiKey) throw new Error("Unable to find API key !");
  if (!apiSecret) throw new Error("Unable to find API Secret !");

  const client = new StreamClient(apiKey, apiSecret);

  const expiry = Math.round(new Date().getTime() / 1000) + 2 * 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user.id, expiry, issued);

  return token;
};
