import { ZodSchema, ZodTypeDef } from 'zod'
import { isZodDto, ZodDto } from './dto'
import { createZodValidationException, ZodExceptionCreator } from './exception'

export function validate<
  TOutput = any, // eslint-disable-line @typescript-eslint/no-explicit-any
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput
>(
  value: unknown,
  schemaOrDto: ZodSchema<TOutput, TDef, TInput> | ZodDto<TOutput, TDef, TInput>,
  createValidationException: ZodExceptionCreator = createZodValidationException
) {
  const schema = isZodDto(schemaOrDto) ? schemaOrDto.schema : schemaOrDto

  const result = schema.safeParse(value)

  if (!result.success) {
    throw createValidationException(result.error)
  }

  return result.data
}

export async function validateAsync<
  TOutput = any, // eslint-disable-line @typescript-eslint/no-explicit-any
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput
>(
  value: unknown,
  schemaOrDto: ZodSchema<TOutput, TDef, TInput> | ZodDto<TOutput, TDef, TInput>,
  createValidationException: ZodExceptionCreator = createZodValidationException
) {
  const schema = isZodDto(schemaOrDto) ? schemaOrDto.schema : schemaOrDto

  const result = await schema.safeParseAsync(value)

  if (!result.success) {
    throw createValidationException(result.error)
  }

  return result.data
}
