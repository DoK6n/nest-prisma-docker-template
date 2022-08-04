// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * 이제 클래스 유효성 검사기 패키지를 사용하여 CreateArticleDto에 유효성 검사 데코레이터를 추가합니다. CreateArticleDto에 다음 규칙을 적용합니다:
 * - `title`은 비어 있거나 5자 미만일 수 없습니다.
 * - `description`의 최대 길이는 300이어야 합니다.
 * - `body`은 비울 수 없습니다.
 * - `title`, `description` 및 `body`는 `string` 유형이어야 하고 `published`는 `boolean` 유형이어야 합니다.
 *
 * 이러한 규칙은 `ValidationPipe`에 의해 선택되어 경로 처리기에 자동으로 적용됩니다.
 * 유효성 검사를 위해 데코레이터를 사용할 때의 장점
 * - `CreateArticleDto`가 `POST /articles` endpoint 대한 모든 인수에 대한 단일 정보 소스로 유지된다는 것입니다.
 *   따라서 별도의 유효성 검사 클래스를 정의할 필요가 없습니다.
 */
export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
