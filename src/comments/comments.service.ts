/* eslint-disable prettier/prettier */

// Importing necessary modules
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CommentsDTO } from './dto/comment.dto'

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async getAllComment(): Promise<CommentsDTO[]> {
    try {
      const getAllComment = await this.prismaService.comment.findMany()
      return getAllComment
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async postComments(commentDTO: CommentsDTO): Promise<CommentsDTO> {
    try {
      const createComment = await this.prismaService.comment.create({
        // Create a new comment instance with data received in commentDTO.
        data: {
          user_id: commentDTO?.user_id,
          room_id: commentDTO.room_id,
          date_comment: new Date(),
          content: commentDTO.content,
          rate: commentDTO.rate
        }
      })
      return createComment // Return the created comment as a response.
    } catch (error) {
      const { code } = error
      if (code === 'P2003') {
        throw new NotFoundException('Not Found ' + error.meta.field_name) // If the data being received by Prisma has some invalid field, a not found exception is thrown with the message included.
      }
      throw new BadRequestException() // Otherwise, a BAD REQUEST error would be thrown
    }
  }

  async updateCommentbyuser(commentDTO: CommentsDTO, id: number): Promise<any> {
    // Async function for updating an existing comment, takes commentDTO as an input and comment id as the parameters, returns updated comment DTO.

    try {
      const updatecomment = await this.prismaService.comment.update({
        where: {
          id: id // Finds the existing comment through its unique ID.
        },
        data: {
          // user_id: commentDTO.user_id,
          // room_id: commentDTO.room_id,
          date_comment: new Date(),
          content: commentDTO.content,
          rate: commentDTO.rate
        }
      })
      return { message: 'Update comment success', updatecomment } // Returns updated comment DTO storage operation was successful.
    } catch (error) {
      const { code } = error
      if (code === 'P2003') {
        throw new NotFoundException('Not Found ' + error.meta.field_name)
      }
      throw new BadRequestException()
    }
  }

  async deleteComment(id: number): Promise<CommentsDTO> {
    // Async function for deleting a comment, takes id as a parameter and returns deleted comment's DTO object.
    try {
      const deletecomment = await this.prismaService.comment.delete({
        where: {
          id: id // Deletes the comment entry identified by this ID.
        }
      })
      return deletecomment // Returns the deleted comment DTO storage operation was successful.
    } catch (error) {
      const { code } = error
      if (code === 'P2025') {
        // thrown if comment to be deleted does not exist.
        throw new NotFoundException(error.meta.cause)
      }
      throw new BadRequestException()
    }
  }

  async getCommentsbyroomid(roomid: number): Promise<CommentsDTO[]> {
    try {
      const getcommentbyroom = await this.prismaService.comment.findMany({
        where: { room_id: roomid }
      })
      return getcommentbyroom // Returns all comments associated with a specific room ID
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
