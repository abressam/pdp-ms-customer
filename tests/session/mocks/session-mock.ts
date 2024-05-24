export const mockSalt = '1234567890' as string;
export const mockSecret = '1234567890' as string;

export const mockUserId = 1;
export const mockPassword = 'abc';
export const mockIsAdmin = true;
export const mockPasswordEncode =
  'e5c994559c1ea11d6f6b217ada2cc66828a1643d9f179126a16c87104aadb4642ea5db4ba2a7be40beed0b93aaef58058cd4f7701f26a607da3d5abebf4ff45f';

export const mockJwtValid =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNzEzMzYwMTI0LCJleHAiOjguNjRlKzY1fQ.eAAHP_kufAyxRL1txJ7MDIHmOr1h7ljEamEItfSL3_c' as string;
export const mockJwtExpired =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNzEzMzYwMzY2LCJleHAiOjE3MTMzNjAzNjZ9.zsRt1gDjJMRdmErKkFhpmsXRcSjmYCIitTOB_8XNGc0' as string;

export const mockValidRequest = {
  headers: {
    authorization: `Bearer ${mockJwtValid}`,
  },
} as Request | any;

export const mockEmptyRequest = {
  headers: {
    authorization: undefined,
  },
} as Request | any;

export const configMock = () => ({
  auth: {
    salt: mockSalt,
    secret: mockSecret,
  },
});
