'use server';

import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function createPoem(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const category = formData.get('category');
  const imageUrl = formData.get('imageUrl'); // We'll upload from client or pass URL

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const poem = await prisma.poem.create({
    data: {
      title,
      content,
      category,
      image: imageUrl || null,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }
  });

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/category/[slug]', 'page');
  return poem;
}

export async function deletePoem(id) {
  await prisma.poem.delete({
    where: { id }
  });
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updatePoem(id, formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const category = formData.get('category');
  const imageUrl = formData.get('imageUrl');

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const updateData = {
    title,
    content,
    category,
  };

  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const poem = await prisma.poem.update({
    where: { id: parseInt(id) },
    data: updateData
  });

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath('/category/[slug]', 'page');
  return poem;
}

export async function likePoem(id) {
  const poem = await prisma.poem.update({
    where: { id: parseInt(id) },
    data: {
      likes: {
        increment: 1
      }
    }
  });

  revalidatePath('/');
  revalidatePath('/poem/[id]', 'page');
  revalidatePath('/category/[slug]', 'page');
  return poem.likes;
}
