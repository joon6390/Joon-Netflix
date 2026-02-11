# JOONFLIX

TMDB API 기반 영화 탐색 웹 애플리케이션입니다.  
검색, 페이지네이션, 무한 스크롤을 한 화면 흐름 안에서 안정적으로 처리하는 데 집중한 1인 프로젝트입니다.

## 링크

- Live Demo: 배포 예정 (URL 추가 예정)
- GitHub: https://github.com/joon6390/Joon-Netflix

## 프로젝트 개요

- 개발 인원: 1인
- 개발 기간: 2026.02
- 목표: API 연동, 상태 관리, 대량 리스트 UX 구현 역량 검증
- 핵심: 비동기 요청과 화면 상태 동기화

## 주요 기능

1. 카테고리별 영화 조회
2. 영화 검색
3. 페이지네이션
4. 무한 스크롤
5. 로딩 스켈레톤 UI
6. 에러 처리 UI
7. 스크롤 TOP 버튼

## 기술 스택

- React 19 + TypeScript + Vite
- Tailwind CSS
- Zustand + Immer
- Axios
- react-intersection-observer
- lucide-react

## 기술 선택 이유

- React + TypeScript: 컴포넌트 단위 개발과 타입 안정성 확보
- Zustand: 전역 상태 관리에 필요한 코드량 최소화
- Axios: API 공통 설정(`baseURL`, `headers`, `params`) 관리
- Intersection Observer: 스크롤 이벤트보다 효율적인 무한 스크롤 구현

## 폴더 구조

```text
src
├─ api
│  └─ axios.ts
├─ assets
│  └─ movies
├─ components
│  └─ movies
├─ store
│  └─ movieStore.ts
├─ types
│  └─ movie.d.ts
└─ App.tsx
```

## 핵심 구현 포인트

- `PagedCategory`: 페이지 상태와 API 요청 동기화
- `InfiniteCategory`: sentinel 관찰 기반 페이지 증가 및 리스트 누적
- `movieStore`: 검색어/현재 페이지 전역 상태 관리
- `MovieList`: loading/error/success 상태 분기 렌더링
- `AbortController`: 이전 요청 취소로 stale 응답 반영 방지

## 트러블슈팅

### 1) 무한 스크롤 중복 페이지 증가 완화

- 문제: 관찰 타이밍에 따라 페이지가 연속 증가 가능
- 해결: `inView`, `loading`, `hasMore`, ref 플래그 조건으로 증가 제어
- 결과: 중복 요청 및 페이지 폭주 완화

### 2) 포스터 결손 데이터 대응

- 문제: `poster_path`가 비어 있을 때 이미지 깨짐
- 해결: fallback 이미지 렌더링
- 결과: 결손 데이터에서도 UI 안정성 유지

### 3) Hook 의존성 경고 제거

- 문제: `useEffect` 의존성과 내부 값 사용 불일치
- 해결: 검색 쿼리 생성 변수 정합성 수정
- 결과: lint 경고 제거

### 4) 배너 이미지 최적화

- 문제: 대용량 배너 이미지가 초기 로딩에 부담
- 해결: `png` -> `webp` 변환
- 결과: 배너 에셋 크기 `약 3.4MB` -> `약 0.14MB`로 축소

### 5) 미사용 상태 제거

- 문제: 스토어에 사용하지 않는 상태/액션 존재
- 해결: dead state/action 제거
- 결과: 유지보수성 개선

## 실행 방법

### 1) 환경 변수 설정

`.env`

```env
VITE_TMDB_READ_TOKEN=your_tmdb_read_access_token
```

`.env.example`

```env
VITE_TMDB_READ_TOKEN=your_tmdb_read_access_token
```

`.gitignore`

```gitignore
.env
.env.*
!.env.example
```

### 2) 설치 및 실행

```bash
npm install
npm run dev
```

## 스크립트

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 향후 개선 계획

1. React Query 도입으로 캐싱/요청 상태 관리 고도화
2. Vitest + React Testing Library 테스트 추가
3. 접근성 보강(키보드 포커스, aria)
4. Lighthouse 지표 기반 성능 개선

## Contact

- Email: joon6390@naver.com

## Credits

- Movie data from TMDB: https://www.themoviedb.org/
