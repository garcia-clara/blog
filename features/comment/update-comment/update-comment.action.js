'use server'

import prisma from '../../../lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function updateComment(formData, commentId) {
  const body = formData.get('body')
  const { userId } = await auth()
  
  try {
    // Récupérer d'abord le commentaire pour vérifier l'appartenance
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    })
    
    // Vérifier que l'utilisateur est bien le propriétaire du commentaire
    if (comment.clerkUserId !== userId) {
      throw new Error('Not authorized to update this comment')
    }
    
    // Mettre à jour le commentaire
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        body: body
      },
    })
  } catch (error) {
    throw new Error(`Error while updating the comment: ${error.message}`)
  }
}