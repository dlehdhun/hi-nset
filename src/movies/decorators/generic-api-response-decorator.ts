// generic-api-response.decorator.ts
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto } from '../dto/response.dto';

/** 상태코드별 기본 메시지 맵 (원하면 더 추가 가능) */
const DEFAULT_MESSAGE_BY_STATUS: Record<number, string> = {
  200: '성공',
  201: '생성됨',
  204: '내용 없음',
  400: '잘못된 요청',
  401: '인증 필요',
  403: '권한 없음',
  404: '찾을 수 없음',
  409: '충돌',
  500: '서버 오류',
};

type WrapperClass = typeof ResponseDto;

interface GenericApiResponseOptions {
  /** 스웨거 description */
  description?: string;
  /** 200이 아니면 ApiResponse 사용 (기본 200) */
  status?: number;
  /** data가 배열인지 여부 */
  isArray?: boolean;
  /** wrapper로 사용할 클래스 (기본: ResponseDto) */
  wrapper?: WrapperClass;
  /** data/results 등 payload 키 (기본 'data') */
  payloadKey?: string;
  /**
   * Swagger 문서에 표시할 message 예시 문자열.
   * 미지정 시 status 코드로부터 자동 생성(예: 200 -> '성공').
   */
  messageExample?: string;
}

export const GenericApiResponse = <TModel extends Type<unknown>>(
  model: TModel,
  {
    description,
    status = 200,
    isArray = false,
    wrapper = ResponseDto,
    payloadKey = 'data',
    messageExample,
  }: GenericApiResponseOptions = {},
) => {
  const itemsSchema = isArray
    ? { type: 'array', items: { $ref: getSchemaPath(model) } }
    : { $ref: getSchemaPath(model) };

  // message 예시 자동 결정 (옵션 > 상태코드 기본 문구 > '성공')
  const resolvedMessage =
    messageExample ?? DEFAULT_MESSAGE_BY_STATUS[status] ?? '성공';

  // 200이면 ApiOkResponse, 아니면 ApiResponse 사용
  const decoratorFactory =
    status === 200 ? ApiOkResponse : (ApiResponse as typeof ApiOkResponse);

  return applyDecorators(
    ApiExtraModels(wrapper, model),
    decoratorFactory({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(wrapper) },
          {
            type: 'object',
            properties: {
              // message 예시를 override해서 엔드포인트별로 문서 예시가 달라지게 함
              message: { type: 'string', example: resolvedMessage },
              [payloadKey]: itemsSchema,
            },
          },
        ],
      },
    }),
  );
};
