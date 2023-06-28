import { Controller, Get, Post, Body, Put, ParseIntPipe, Param, Delete, UseGuards } from '@nestjs/common'
import { CommentsService } from './comments.service';
import { CommentsDTO } from './dto/comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Get('all')
  getComments(): Promise<CommentsDTO[]> {
    return this.commentsService.getAllComment()
  }
  @Post('')
  postComments(@Body() commentDTO: CommentsDTO): Promise<CommentsDTO> {
    return this.commentsService.postComments(commentDTO)
  }
  @Put(':id')
  updateComment(@Body() commentDTO: CommentsDTO, @Param('id', ParseIntPipe) id: number): Promise<CommentsDTO> {
    return this.commentsService.updateCommentbyuser(commentDTO, id)
  }

  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number): Promise<CommentsDTO> {
    return this.commentsService.deleteComment(id)
  }
  @Get(':roomid')
  getcommentbyroom(@Param('roomid', ParseIntPipe) roomid: number): Promise<CommentsDTO[]> {
    return this.commentsService.getCommentsbyroomid(roomid)
  }
}
