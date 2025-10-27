# 포트폴리오 트래커 (AI-assisted)

## 프로젝트 소개

이 프로젝트는 주식 및 암호화폐 포트폴리오를 추적하는 웹사이트입니다. Gemini AI와의 협업을 통해 개발되었으며, AI 주도 개발 프로세스를 연습하고 문서화하는 것을 목표로 합니다.

## 주요 기능

*   **자산 관리**: 주식 및 암호화폐 자산의 추가, 수정, 삭제 (거래 기록 기반).
*   **실시간 가격 반영**: Binance API를 통해 실시간 자산 가격 제공.
*   **환율 변환**: USD/KRW 환율을 적용하여 포트폴리오 가치를 다양한 통화로 표시.
*   **포트폴리오 요약**: 총 자산 가치, 수익률, 자산별 비중 등 포트폴리오 개요 제공.
*   **포트폴리오 차트**: 자산 분포 및 시간 경과에 따른 가치 변화 시각화.
*   **관심 자산**: 특정 자산을 즐겨찾기에 추가하여 쉽게 추적.
*   **반응형 웹 디자인**: 모바일 및 데스크톱 환경에서 최적화된 사용자 경험 제공.
*   **로컬 데이터 저장**: `localStorage`를 사용하여 사용자 데이터를 브라우저에 저장.

## 설치 및 실행 방법

1.  **리포지토리 클론**:
    ```bash
    git clone https://github.com/your-username/portfolio-tracker.git
    cd portfolio-tracker
    ```
2.  **의존성 설치**:
    ```bash
    npm install
    ```
3.  **애플리케이션 실행**:
    ```bash
    npm run dev
    ```
    애플리케이션이 브라우저에서 `http://localhost:5173` (또는 다른 포트)로 실행됩니다.

## 기술 스택

*   **Frontend**: React.js
*   **Build Tool**: Vite
*   **Language**: JavaScript
*   **Styling**: Bootstrap 5
*   **Code Formatting**: Prettier
*   **Testing**: Jest, React Testing Library
*   **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`)
*   **Data Persistence**: Web Storage API (`localStorage`)
*   **API**: CoinGecko API (for base prices and exchange rates), Binance API (for real-time prices - _planned/in-progress_)
*   **Charting**: Chart.js, react-chartjs-2, chartjs-adapter-date-fns

## 개발 과정에서의 AI 활용 방법

본 프로젝트는 Gemini CLI를 활용한 AI 페어 프로그래밍 방식으로 개발되었습니다. 주요 AI 활용 사례는 다음과 같습니다:

*   **초기 프로젝트 설정**: 프로젝트 구조 생성, 의존성 설치, 기본 파일 작성.
*   **버그 수정**: 테스트 실패 원인 분석 및 해결 방안 제시, 코드 수정.
*   **기능 구현**: 특정 기능에 대한 코드 스니펫 생성 및 통합.
*   **코드 리팩토링**: 기존 코드의 개선 제안 및 적용.
*   **문서화**: `README.md` 및 `DEVELOPMENT_LOG.md`와 같은 프로젝트 문서 작성 및 업데이트.
*   **학습 및 가이드**: 특정 기술 스택이나 구현 패턴에 대한 정보 제공 및 가이드.

AI는 주로 문제 해결을 위한 코드 생성, 오류 진단, 구조 개선 제안 등의 역할을 수행했습니다. 개발 과정에서 발생한 모든 중요한 상호작용은 `DEVELOPMENT_LOG.md`에 기록됩니다.
