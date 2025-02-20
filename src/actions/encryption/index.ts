"use server";
import {
  generateToken as generator,
  validateToken as validator,
} from "@/utils/hashing/encrypt-string";

export const generateToken = async (data: string): Promise<string> => {
  return generator(data);
};

export const validateToken = async (token: string): Promise<string | null> => {
  return validator(token);
};
