import { Client, Databases, Account } from "appwrite";

export const PROJECT_ID = "mdn";
export const DATABASE_ID = "realtimechat";
export const COLLECTION_ID_MESSAGE = "message";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("mdn");
export const databases = new Databases(client);
export const account = new Account(client)

export default client;
