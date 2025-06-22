import { Length } from 'class-validator';

export class CreateQuestionDto {
  @Length(5)
  title: string;
  @Length(10)
  body: string;
}
