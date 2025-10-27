# 📈 개인용 포트폴리오 트래커 (Portfolio Tracker)

본 프로젝트는 '바이브 코딩 실습' 기말시험 과제로, Gemini CLI와의 협업을 통해 개발한 개인용 주식/코인 자산 관리 웹 애플리케이션입니다.

## 🌟 주요 기능

*   **자산 관리 (CRUD):** 보유한 자산(주식, 코인 등)의 거래 내역을 추가, 조회, 수정, 삭제할 수 있습니다.
*   **대시보드:** 총 자산 현황과 수익률을 요약하여 보여줍니다.
*   **데이터 시각화:** 보유 자산의 비중 및 가치 변화를 차트로 시각화합니다. (구현 중)
*   **데이터 저장:** LocalStorage를 사용하여 브라우저에 거래 내역을 저장합니다.

## 💻 기술 스택

*   **Frontend:** React.js, Vite
*   **Styling:** Bootstrap (또는 사용하신 CSS 라이브러리)
*   **Testing:** Jest, React Testing Library, ts-jest
*   **AI Co-pilot:** Google Gemini CLI
*   **Deployment:** GitHub Pages

## 🚀 설치 및 실행 방법

1.  저장소를 클론합니다.
    ```bash
    git clone https://github.com/EmiFukuju/bitcoin.git
    cd bitcoin
    ```
2.  의존성을 설치합니다.
    ```bash
    npm install
    ```
3.  개발 서버를 실행합니다.
    ```bash
    npm run dev
    ```
    애플리케이션이 브라우저에서 `http://localhost:5173` (또는 다른 포트)로 실행됩니다.

4.  테스트를 실행합니다.
    ```bash
    npm test
    ```

## 🤖 개발 과정에서의 AI 활용 방법

본 프로젝트는 Gemini CLI를 적극적으로 활용하여 '바이브 코딩' 방법론을 실습했습니다.

1.  **테스트 환경 설정 디버깅:**
    *   **문제:** Jest와 Vite(ESM) 환경 간의 충돌로 `SyntaxError: Cannot use import statement outside a module` 오류가 지속적으로 발생했습니다.
    *   **AI 활용:** Gemini CLI에 오류 로그를 제공하고 해결책을 요청했습니다. Gemini는 `package.json`의 `"type": "module"` 설정, `jest.config.js`의 ESM 프리셋 (`ts-jest/presets/default-esm`), `tsconfig.json`의 `moduleResolution` 설정 변경을 제안하며 문제를 해결했습니다.

2.  **Git 및 배포 오류 해결:**
    *   **문제:** `git push` 시 `src refspec main does not match any` 오류, `protocol '[https' is not supported` 오류 등 Git 사용에 어려움을 겪었습니다.
    *   **AI 활용:** Gemini에 터미널 오류 메시지를 그대로 입력하여 원인(브랜치명 불일치, 커밋 부재, 주소 입력 오류)을 진단받고, `git branch -m`, `git commit`, `git remote remove` 등 정확한 해결 명령어를 받아 문제를 해결했습니다.

3.  **기능 로직 구현:**
    *   `deleteAsset`, `updateAsset` 등 CRUD 기능의 핵심 로직을 자연어 (예: "티커를 인자로 받아 해당 티커의 모든 트랜잭션을 삭제하는 함수를 만들어줘")로 요청하여 코드를 생성했습니다.

---

*(선택 사항: 여기에 프로젝트 스크린샷이나 라이브 데모 GIF를 추가하세요.)*
