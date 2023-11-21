import { Client, Databases } from "appwrite";

export const PROJECT_ID = "mdn";
export const DATABASE_ID = "realtimechat";
export const COLLECTION_ID_MESSAGE = "message";

const client = new Client();

export const databases = new Databases(client);
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("mdn");

export default client;
