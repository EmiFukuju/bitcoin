# 📜 개발 일지 (DEVELOPMENT LOG)

## 1. 프로젝트 개요

*   **프로젝트명:** 개인용 포트폴리오 트래커 (portfolio-tracker)
*   **개발 기간:** [프로젝트 시작 날짜] ~ 2025-10-28
*   **목표:** React와 Gemini CLI를 활용하여 자산 관리 웹 앱을 개발하고, '바이브 코딩' 방법론을 실습한다.

## 2. 개발 과정

### Week 1 (2025-10-20 ~ 2025-10-28)

#### Day 1-3: 프로젝트 초기 설정 및 기본 UI

*   **작업 내용:**
    *   Vite + React 프로젝트 생성
    *   `AssetForm`, `AssetList` 등 기본 컴포넌트 구조화
    *   `LocalStorage`를 이용한 데이터 저장 로직 초안 작성
*   **Gemini CLI 사용 프롬프트 (예시):**
    *   "React와 Tailwind를 사용한 포트폴리오 트래커 앱의 기본 폴더 구조를 만들어줘."
    *   "LocalStorage에 거래 내역 배열을 저장하고 불러오는 함수를 작성해줘."

#### Day 4-5: Jest 테스트 환경 설정 및 디버깅 (주요 과제)

*   **작업 내용:** Jest, React Testing Library, ts-jest 설치 및 설정
*   **문제 발생:** `npm test` 실행 시 `SyntaxError: Cannot use import statement outside a module` 오류 발생. Vite(ESM)와 Jest(CJS) 간의 모듈 시스템 충돌로 확인됨.
*   **Gemini CLI 사용 프롬프트:**
    *   "Jest SyntaxError: Cannot use import statement outside a module 오류가 발생해. 내 `package.json`과 `jest.config.js` 파일이야. [파일 내용 붙여넣기]"
    *   "ESM 환경에서 Jest를 사용하려면 어떻게 해야 해?"
*   **결과 및 수정사항:**
    *   Gemini의 제안에 따라 `package.json`에 `"type": "module"`을 명시함.
    *   `jest.config.js`를 `ts-jest/presets/default-esm` 프리셋으로 변경함.
    *   `tsconfig.json`에 `"module": "ESNext"`, `"moduleResolution": "NodeNext"` 옵션을 추가하여 모듈 해석 방식을 통일함.
*   **학습 내용:** Vite와 Jest를 함께 사용할 때 발생하는 ESM/CJS 충돌 문제와, `ts-jest`의 ESM 프리셋을 통한 해결 방법을 학습함.

#### Day 6: Git 및 GitHub Pages 배포 설정

*   **작업 내용:** GitHub 저장소 연결 및 GitHub Pages 배포 설정
*   **문제 발생:** `git push` 시 `src refspec main does not match any` 오류 발생. 이후 `protocol '[https' is not supported` 오류 추가 발생.
*   **Gemini CLI 사용 프롬프트:**
    *   "git push -u origin main 실행 시 'src refspec main does not match any' 에러가 떠"
    *   "Git: fatal: protocol '[https' is not supported 오류는 왜 생기는 거야?"
*   **결과 및 수정사항:**
    *   **해결 1 (main):** 로컬 브랜치명(master)과 원격 브랜치명(main)이 불일치함을 파악. `git branch -m master main`으로 로컬 브랜치명 변경 후 해결.
    *   **해결 2 (protocol):** `git remote add origin` 시 URL에 대괄호(`[]`)를 포함해 복사했음을 파악. `git remote remove origin` 후 올바른 주소로 다시 추가하여 해결.

#### Day 7: 기능 구현 및 제출 준비

*   **작업 내용:** 자산 삭제/수정 기능 구현, `README.md` 등 제출 문서 작성.
*   **Gemini CLI 사용 프롬프트:**
    *   "AssetList 컴포넌트에서 삭제 버튼을 누르면 `App.jsx`의 `transactions` 상태에서 해당 티커를 가진 모든 항목을 삭제하는 `deleteAsset` 함수를 작성해줘."
    *   "'바이브 코딩' 시험 제출용 `README.md` 템플릿을 작성해줘."

## 3. 바이브 코딩 활용 소감

*   **AI와의 협업 경험:**
    *   특히 환경 설정 오류(Jest, Git)처럼 원인이 명확하지 않은 문제를 해결할 때 매우 강력했음. 오류 로그를 그대로 입력하면 Gemini가 원인을 분석하고 정확한 해결 명령어를 제시해주어 디버깅 시간을 획기적으로 단축함.
*   **효과적이었던 프롬프트 패턴:**
    *   "현재 상태" (내 코드, `package.json` 등) + "발생한 문제" (오류 로그) + "원하는 목표" (해결하고 싶어) 조합이 가장 효과적이었음.
*   **개선이 필요한 부분:**
    *   간단한 함수 로직은 빠르게 생성해주지만, 전체 애플리케이션의 맥락(Context)을 고려한 복잡한 코드는 추가적인 수정(리팩토링)이 필요했음.

## 4. 최종 결과물 평가

*   **달성한 목표:** Jest 테스트 환경 구축, Git/GitHub 관리, AI 협업을 통한 CRUD 기능 구현.
*   **미완성 기능:** (예: 차트 시각화 기능, UI 디자인 개선 등)
*   **향후 개선 계획:** (예: 백엔드 API를 연결하여 데이터 영구 저장)