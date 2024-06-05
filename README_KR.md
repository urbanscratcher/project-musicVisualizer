# 뮤직 비쥬얼라이저

2024년 1월 ~ 3월 (3개월)

프로그래밍 과제 중 하나로 만든 간단한 음악 시각화 프로젝트입니다. 이 사이트는 p5js의 사운드 라이브러리에서 제공되는 푸리에 변환 기능을 이용해 오디오 파일을 다양한 방식으로 시각화합니다. 몇 몇 기본적인 모듈은 강사님이 템플릿으로 작성한 것이지만, 더 나은 시각화를 위해 약간 수정했으며 새로운 아이디어를 더했습니다.

## 주요 기능

1. 파동
2. 스펙트럼
3. 바늘
4. 능선 플롯
5. 블록
6. 비트 불꽃놀이

## 기술적 중점 사항

- 이 프로젝트는 복잡한 객체와 배열을 활용하여 고급 프로그래밍 기술을 적용하고, 시뮬레이션과 모션 코딩에 익숙해 지는 것을 목표로 했습니다.
- p5.DOM을 사용하여 사용자 인터페이스(UI)를 개선했습니다.
- 객체 지향 프로그래밍 스타일로 코드를 작성했습니다.
- 현대 자바스크립트(ES6, 비공개 변수, 클래스 등)를 구현했습니다.
- ES6 모듈을 사용하기 위해 p5js의 인스턴스 모드를 활용했습니다.
- jsdoc을 지원합니다.

### [빠른 푸리에 변환](https://p5js.org/reference/#/p5.FFT) 사용
- `FFT.analyze()`는 0과 255 사이의 값 1024개가 포함된 배열을 반환합니다. 각 값은 작은 주파수 범위(소리의 피치)의 진폭(소리의 크기)을 나타냅니다.
- `FFT.waveform()`은 -1과 1 사이의 값 1024개가 포함된 배열을 반환합니다. 각 값은 작은 시간 동안의 소리의 진폭을 나타냅니다.
- `FFT.energy(freq1, [freq2])`는 `freq1` 및 `freq2` 매개변수로 지정된 주파수 범위에서 소리의 볼륨을 반환합니다.

## 시연
<video src="https://github.com/urbanscratcher/project-musicVisualizer/assets/17016494/86d9e237-47e3-4a9b-b5aa-4fd2a2db52cd" controls></video>

[사이트 바로가기](https://project-music-visualizer.netlify.app/)
[jsdoc](https://project-music-visualizer.netlify.app/jsdoc/index.html)

## 기술 구성
### 프론트엔드
- **라이브러리**: p5.js, p5.sound, p5.DOM
- **언어**: JavaScript
- **스타일링**: CSS

### 백엔드
- 없음

### 개발 환경
- **소스 코드**: GitHub

## 클라우드 서비스 및 배포
- **호스팅 및 배포**: Netlify

## 참고 자료
- [프로젝트 아이디어 수집 - 핀터레스트](https://www.pinterest.co.kr/404joun/visualizer/)
- [p5js 공식문서](https://p5js.org/)
- [JavaScript 공식문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JsDoc 공식문서](https://jsdoc.app/)
- [CSS 스타일링 초기화 - Uniform CSS](https://uniformcss.com/docs/default-styles/)(Andy Bell의 현대 CSS 리셋 스타일링을 수정한 것) 
- [자바스크립트 ES6 - 모듈에서 p5js 사용하는 방법](https://www.youtube.com/watch?v=P0bkwncSJag)
- [인스턴스 모드 (aka "namespacing") - p5.js 튜토리얼](https://www.youtube.com/watch?v=Su792jEauZg&list=PLglp04UYZK_PrN6xWo_nJ-8kzyXDyFUwi&index=64)
- JS 및 ES6에서의 전역 상태 관리 - [스택오버플로우1](https://stackoverflow.com/questions/33875322/javascript-and-es6-global-variables) [스택오버플로우2](https://stackoverflow.com/questions/43605434/what-is-the-correct-way-to-define-global-variable-in-es6-modules)
- [푸리에 변환이란?](https://www.youtube.com/watch?v=spUNpyF58BY&t=484s)
- 비트 감지 알고리즘 - [알고리즘1](https://www.clear.rice.edu/elec301/Projects01/beat_sync/beatalgo.html) [알고리즘2](http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html)
