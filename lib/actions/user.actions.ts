"use server"

// Create account flow

// 1. Users enters full name and email
// 2. Check if the user already exist using the email (will be used to identify if we still need to create a user document)
// 3. Send OTP to user's email
// 4. This will send a secret key for creating a session
// 5. Create a new user document if the user is a new user
// 6. Return the user's accountId that will be used to complete the login
// 7. Verify OTP ans authenticate to login

import { createAdminClient } from "../appwrite"
import { appwriteConfig } from "../appwrite/config"
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils"

const getUserByEmail = async (email: string) => {
    const {databases} = await createAdminClient()

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("email", [email])],
    )
    return result.total > 0 ? result.documents[0] : null
}

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
    fullName,
    email,
    }: {
    fullName: string;
    email: string;
    }) => {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({email})
    if (!accountId) throw new Error ('Failed to send an OTP')
    
    if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fphotos-vecteurs-libre%2Favatar-logo&psig=AOvVaw2tqB5Uf8OPh6rN0J3bvnKv&ust=1750150379087000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCi27HI9Y0DFQAAAAAdAAAAABAE",
        accountId,
      },
    );
  }

  return parseStringify({ accountId });



}