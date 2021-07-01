### 설치

처음에는 calculator repository 에 있는 package.json 의 디펜던시를

수동으로 깔아보다가, 시간을 많이 허비하고 피곤해지는 것같아 package.json 의 dependencies 만 가져와서 넣었다.

그런데, npm init 을 안하고 순서가 뒤죽박죽이어서 다시 모두 삭제하고 깃클론을 새로받았다.

다시 처음부터 npm init, package.json 부분 복붙, npm install

.json 파일을 calculator 로부터 복사 붙여넣기 했다.

그리고 yarn 을 입력해서 yarn.lock 을 생성시켰다.

또, .gitignore 도 가져왔다. 이건 웹사이트 들어가서 생성할 줄은 알지만, 시간 절약을 위해 가져왔다.

cypress 같은 경우는 yarn cypress open 을 하면, 저절로 테스트 코드들을 만들어준다.

### 공부 어떻게 할 까?

index.html 에 모르는 html, css tag 들을 조금 봐야할 것같다. 그리고 무작정 step1 을 시작해야겠다. 처음부터 뇌피셜로 ts 파일을 짜보면서 시작을 하는 게 맞지 않을 까? 싶다. 아니면 치팅 레퍼런스가 있는 지 봐야겠다. 하다가 막히면 어쩔 수 없이 나도 모르게 찾게 되겠지.

일단 cypress 로 테스트 코드 부터 짜보자

### 푸시하기 전에 조심해야할 점
1. cypress 코드 다 올리지 말자.
2. 미리 다른 컴퓨터에서 깃 클론 받아 테스트 해보자.

### cypress 테스트 코드 만들기
- 구입 금액 제대로 받는가?
- 금액에 해당하는 로또를 발급하는 가?
	- 숨어있는 구해한 로또 html 코드 찾기
	- 잔액 먹지 않도록 계속 잔액을 저장해주는 값 필요