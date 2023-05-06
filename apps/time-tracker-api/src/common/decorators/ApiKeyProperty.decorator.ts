// The decorator should equal the following:
// @ApiProperty({ readOnly: true, foramt: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })

import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export const ApiKeyProperty = (options?: ApiPropertyOptions) =>
  applyDecorators(
    ApiProperty({
      ...options,
      example: '123e4567-e89b-12d3-a456-426614174000',
      format: 'uuid',
      readOnly: true,
    })
  );
