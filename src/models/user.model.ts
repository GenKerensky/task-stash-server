import prisma from "../prisma";
import { encode } from "@msgpack/msgpack";
import { readKey, encrypt, createMessage } from "openpgp";
const { nanoid } = require("nanoid");

type NewUser = {
  email: string;
  publicKey: string;
  privateKey: string;
  verifier: string;
  salt: string;
};

export const createUser = async (newUser: NewUser) => {
  const id = nanoid();
  const publicKey = await readKey({ armoredKey: newUser.publicKey });
  const initialData = {};
  const msgpackEncodedData = encode(initialData);
  const message = await createMessage({ binary: msgpackEncodedData }); // TODO: Add msgpack mime type to the message
  const encryptedData = (await encrypt({
    message,
    encryptionKeys: publicKey,
  })) as Uint8Array; // TODO: Validate this!
  const buffer = Buffer.from(encryptedData);
  return prisma.user.create({
    data: {
      id,
      email: newUser.email,
      publicKey: newUser.publicKey,
      privateKey: newUser.privateKey,
      verifier: newUser.verifier,
      salt: newUser.salt,
      data: buffer,
    },
  });
};
