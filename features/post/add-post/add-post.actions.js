"use server";

import prisma from "../../../lib/prisma";
import { nanoid } from "nanoid";

export async function addPost(formData) {
  const title = formData.get("title");
  const body = formData.get("body");
  console.log("formData", formData);
  try {
    await prisma.post.create({
      data: {
        title,
        body,
        date: new Date(),
        slug: nanoid(10),
        userId: "1",
      },
    });
  } catch (error) {
    throw new Error("Error while creating the post", error);
  }
}

export async function getPosts() {
  return await prisma.post.findMany();
}
