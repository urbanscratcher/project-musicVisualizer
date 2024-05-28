# 오디오 시각화 도구

## 소개

- 이것은 프로그래밍 수업의 기말 프로젝트로 만들고 있는 간단한 음악 시각화 프로젝트입니다.
- 나는 빠른 푸리에 변환과 p5js를 사용하여 오디오를 시각화하는 다양한 기술을 연구하고 있습니다.
- 처음 몇 장면은 강사님이 템플릿으로 작성한 것이지만, 더 나은 결과를 위해 약간 수정했습니다.

## 목표 및 영감

- 나의 주요 목표는 복잡한 객체와 배열을 활용하여 고급 프로그래밍 기술을 적용하는 것입니다. 또한 p5js를 사용한 시뮬레이션 및 모션에 익숙해지고 싶습니다.
- 이 프로젝트는 다섯 가지 주요 기능에 중점을 둘 것입니다: 중간, 높은, 낮은 블록, 불꽃놀이 비트, 애니메이션 페인팅 점, 이우환 작가에게 영감을 받은 것, 색이 떨어지는 픽셀화된 막대.
- p5.js DOM을 사용하여 사용자 인터페이스(UI)를 개선하는 데 중점을 둘 것입니다.
- 나는 이우환 작가의 역동성과 동양적 단순함의 조합에서 영감을 받았습니다. 이러한 모순된 느낌을 전달하기 위해, 브러시의 아날로그 질감을 동적인 음악과 결합하려고 합니다.

## 데모

- https://project-music-visualizer.netlify.app/

## 시각화 목록

1. 파동
2. 스펙트럼
3. 바늘
4. 능선 플롯
5. 블록
6. 비트 불꽃놀이

## 프로그램 설계

- jsdoc https://project-music-visualizer.netlify.app/jsdoc/index.html

## 코딩 기술

- 객체 지향 프로그래밍 스타일로 코드를 작성했습니다.
- 현대 자바스크립트(ES6, 비공개 변수, 클래스 등)를 구현했습니다.
- ES6 모듈을 채택하기 위해 p5js의 인스턴스 모드를 사용했습니다.
- 쉽게 소통할 수 있도록 jsdoc을 지원합니다.

## 빠른 푸리에 변환

- https://p5js.org/reference/#/p5.FFT
- `FFT.analyze()`는 0과 255 사이의 값 1024개가 포함된 배열을 반환합니다. 각 값은 작은 주파수 범위(소리의 피치)의 진폭(소리의 크기)을 나타냅니다.
- `FFT.waveform()`은 -1과 1 사이의 값 1024개가 포함된 배열을 반환합니다. 각 값은 작은 시간 동안의 소리의 진폭을 나타냅니다.
- `FFT.energy(freq1, [freq2])`는 `freq1` 및 `freq2` 매개변수로 지정된 주파수 범위에서 소리의 볼륨을 반환합니다.

## 자원

### 프로젝트 아이디어 수집용 나의 컬렉션

- https://www.pinterest.co.kr/404joun/visualizer/

### 공식 문서

- p5js https://p5js.org/
- 자바스크립트 https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JsDoc https://jsdoc.app/

### CSS 스타일 초기화

- Uniform CSS (Andy Bell의 현대 CSS 리셋 스타일링을 수정한 것) https://uniformcss.com/docs/default-styles/

### ES6로의 전환

- ES6 모듈 구현
  자바스크립트 ES6 - 모듈에서 p5js 사용하는 방법 https://www.youtube.com/watch?v=P0bkwncSJag
- 인스턴스 모드 (aka "namespacing") - p5.js 튜토리얼 https://www.youtube.com/watch?v=Su792jEauZg&list=PLglp04UYZK_PrN6xWo_nJ-8kzyXDyFUwi&index=64
- JS 및 ES6에서의 전역 상태 관리
  Stackoverflow
  - https://stackoverflow.com/questions/33875322/javascript-and-es6-global-variables
  - https://stackoverflow.com/questions/43605434/what-is-the-correct-way-to-define-global-variable-in-es6-modules
- 푸리에 변환이란? https://www.youtube.com/watch?v=spUNpyF58BY&t=484s
- 비트 감지 알고리즘
  - https://www.clear.rice.edu/elec301/Projects01/beat_sync/beatalgo.html
  - http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html