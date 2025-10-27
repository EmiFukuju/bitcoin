# 개발 일지

## 프로젝트 개요

- 프로젝트명: 포트폴리오 트래커 (AI-assisted)
- 개발 기간: 2025년 10월 27일 ~ (진행 중)
- 목표: Gemini CLI를 활용한 AI 페어 프로그래밍 방식으로 주식 및 암호화폐 포트폴리오 트래커 웹사이트 개발 및 AI 활용 과정 문서화.

## 개발 과정

### Week 1 (2025년 10월 27일)

#### Day 1 - 프로젝트 초기 설정 및 테스트 환경 구축

- **작업 내용**: 프로젝트 초기 설정 확인 및 Jest 테스트 환경에서 발생하는 오류 해결.
- **Gemini CLI 사용 프롬프트**:
  - "npm test 실행해 줘"
  - "테스트 완료 된 거야?"
  - "로컬 호스트 알려줘"
  - "왜 현재가가 반영이 안 돼?"
  - "시작해"
  - "테스트 하지마"
  - "그니까 현재가가 반영이 안 되고 있으니까 실시간 바이낸스 가격으로 원화 달러 구분해서 해줘"
  - "다 해결 된 것 가타"
  - "이번 세션 완료 해"
  - "저장소 구조... 이걸 만족하게 해줘"
- **결과 및 수정사항**:
  - Jest 테스트 실행 시 `SyntaxError: Cannot use import statement outside a module` 오류 발생.
    - `jest.config.js`를 `babel-jest`를 사용하도록 수정하고, `babel.config.js`를 ES 모듈 문법으로 변경.
  - `ReferenceError: module is not defined in ES module scope` 오류 발생.
    - `babel.config.js`를 CommonJS 문법으로 되돌리고, `babel.config.js`를 `babel.config.cjs`로 파일명 변경.
  - `ReferenceError: jest is not defined` 오류 발생.
    - `jest.config.js`의 `extensionsToTreatAsEsm`에서 `.js` 제거.
  - `Configuration error: Could not locate module ./App.css mapped as: identity-obj-proxy.` 오류 발생.
    - `identity-obj-proxy` 패키지 설치.
  - `Must use import to load ES Module: ...chartjs-adapter-date-fns...` 오류 발생.
    - `jest.config.js`의 `transformIgnorePatterns` 및 `transform` 설정 조정.
  - 최종적으로 모든 Jest 테스트 통과 확인.
  - `addTransaction` 함수에 디버깅용 `console.log` 추가.
  - 사용자 보고 버그 (`새 자산 추가 구매 단가가 원화로 안 바뀌네`, `현재가가 반영이 안 돼`) 해결 확인.
- **학습 내용**:
  - Jest 환경에서 ES 모듈과 CommonJS 모듈의 혼용 시 발생하는 문제점 및 해결 방법 (Babel 설정, 파일 확장자, `package.json`의 `type` 필드).
  - `jest.mock` 사용 시 React Hooks 사용에 대한 주의점.
  - `moduleNameMapper` 및 `transformIgnorePatterns`의 정확한 설정 방법.

## 주요 도전 과제 및 해결 방법

1.  **문제**: Jest 테스트 환경에서 ES 모듈과 CommonJS 모듈 간의 호환성 문제로 인한 다양한 오류 발생.
    - **해결**: `babel.config.js`를 `babel.config.cjs`로 변경하여 CommonJS로 명시하고, `jest.config.js`에서 `babel-jest`를 통한 트랜스파일 설정을 최적화하여 Jest가 모든 모듈을 올바르게 처리하도록 함. `NODE_OPTIONS=--experimental-vm-modules` 제거.
    - **AI 활용**: 오류 메시지 분석, `jest.config.js` 및 `babel.config.js` 설정 변경 제안, 관련 패키지 설치 지시.
2.  **문제**: `jest.mock` 내부에서 `useState` 사용으로 인한 `ReferenceError` 발생.
    - **해결**: `jest.mock` 팩토리 함수 내에서 실제 React Hooks 대신 간단한 변수와 함수를 사용하여 mock 상태를 관리하도록 수정.
    - **AI 활용**: 오류 메시지 분석 및 `jest.mock` 사용 패턴에 대한 지식 기반으로 수정 방안 제시.

## 바이브 코딩 활용 소감

- AI와의 협업 경험: Gemini CLI는 복잡한 설정 문제 해결에 매우 효과적이었습니다. 특히 Jest와 Babel 간의 모듈 호환성 문제와 같이 미묘하고 반복적인 디버깅이 필요한 상황에서 AI의 단계별 지시와 코드 수정 제안은 문제 해결 시간을 크게 단축시켰습니다.
- 효과적이었던 프롬프트 패턴: 구체적인 오류 메시지를 제공하고, 예상되는 문제점과 해결 방안에 대한 질문을 던지는 것이 효과적이었습니다. 또한, 코드 변경 후 즉시 테스트를 실행하여 결과를 확인하는 반복적인 과정이 좋았습니다.
- 개선이 필요한 부분: 때때로 AI가 이전 컨텍스트를 완전히 기억하지 못하고 동일한 해결책을 다시 제안하거나, 사용자 취소 명령을 테스트 중단으로 오해하는 경우가 있었습니다. 이는 명확한 지시와 컨텍스트 재확인이 필요함을 시사합니다.

## 최종 결과물 평가

- 달성한 목표: Jest 테스트 환경 설정 완료 및 모든 테스트 통과. 사용자 보고 버그 (KRW 변환, 현재가 반영) 해결 확인. 프로젝트 문서화 요구사항 (README.md, DEVELOPMENT_LOG.md) 시작.
- 미완성 기능: 없음 (현재까지 보고된 버그 및 설정 문제는 해결됨).
- 향후 개선 계획: `README.md` 및 `DEVELOPMENT_LOG.md`를 지속적으로 업데이트하고, 사용자 요청에 따라 새로운 기능 개발 및 기존 기능 개선을 진행할 예정입니다. 특히, 실시간 Binance 가격 연동 및 KRW/USD 구분 표시 기능은 다음 주요 개발 목표가 될 것입니다.
