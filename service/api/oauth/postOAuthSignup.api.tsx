import INSTANCE_URL from '../instance';

export async function postOAuthSignup(body: { nickname: string; redirectUri: string; token: string }) {
  const response = await INSTANCE_URL.post('/oauth/sign-up/kakao', body);
  return response.data;
}