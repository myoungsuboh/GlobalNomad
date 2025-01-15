module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended', 'prettier'],
  env: {browser: true, node: true, es6: true},
  settings: {
    react: {
      version: 'detect', // React의 버전을 자동으로 감지합니다.
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  rules: {
    'react/react-in-jsx-scope': 'off', //스코프 규칙 오프
    'react/prop-types': 'off', // PropTypes 검사 비활성화
    'no-var': 'error', // var 금지
    'no-useless-escape': 'off', // 쓸모없는 이스케이프 비활성화
    eqeqeq: 'error', // 일치 연산자 사용 필수
    'no-unused-vars': 'error', // 사용하지 않는 변수 금지
    // 'no-console': ['error', {allow: ['warn', 'error', 'info']}], // console.log() 금지
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
};
