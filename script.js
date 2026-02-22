/**
 * @file script.js
 * @description 이메일 구독 폼(Early Access Form)의 유효성 검사 모듈입니다.
 *
 * [동작 방식 요약]
 * 1. 사용자가 "Get Started For Free" 버튼을 클릭해 폼을 제출합니다.
 * 2. 이메일이 비어있거나 형식이 올바르지 않으면:
 *    - 폼(.early-access__form)에 .error 클래스를 추가합니다.
 *    - styles.css의 .early-access__form.error .early-access__error 규칙이 발동해
 *      "Error, please check your email" 메시지가 입력창 아래에 나타납니다.
 * 3. 이메일이 유효하면:
 *    - .error 클래스를 제거해 에러 메시지를 숨기고, 성공 메시지를 표시합니다.
 * 4. 에러 상태에서 사용자가 다시 타이핑을 시작하면 즉시 에러 메시지가 사라집니다.
 *
 * [파일 간 의존 관계]
 * - index.html: id="earlyAccessForm", .early-access__input, .early-access__error 요소에 의존합니다.
 * - styles.css: .early-access__form.error .early-access__error 규칙과 연동됩니다.
 */

/* index.html에서 폼과 입력창 요소를 가져옵니다.
   이 스크립트는 </body> 직전에 로드되므로 DOM이 준비된 상태가 보장됩니다. */
const form = document.getElementById('earlyAccessForm');
const input = document.querySelector('.early-access__input');

/**
 * [이벤트 1] submit — 폼 제출 유효성 검사
 *
 * 단계별 로직 흐름:
 *   1단계 (preventDefault): 브라우저의 기본 동작인 페이지 새로고침을 막습니다.
 *          새로고침이 일어나면 JS가 에러를 표시하기 전에 화면이 리셋되어버립니다.
 *
 *   2단계 (검증): 두 가지 조건을 OR(||)로 검사합니다.
 *          - !input.value: 입력창이 완전히 비어있는 경우
 *          - !input.checkValidity(): HTML5 내장 API로 type="email" 형식(OO@OO.com)을 검증.
 *            <input>의 required, type="email" 속성을 참조합니다.
 *          둘 중 하나라도 실패하면 에러 처리 분기로 진입합니다.
 *
 *   3단계 (UI 피드백):
 *          - 실패 시: form에 'error' 클래스 추가 → CSS가 에러 메시지를 화면에 표시
 *          - 성공 시: 'error' 클래스 제거 → 에러 메시지 숨김 + 성공 알림 + 입력창 초기화
 */
form.addEventListener('submit', function (e) {
    e.preventDefault(); // 1단계: 페이지 새로고침 방지

    if (!input.value || !input.checkValidity()) {
        // 2단계 실패: 폼에 'error' 클래스를 달면 CSS가 에러 메시지를 자동으로 노출합니다
        form.classList.add('error');
    } else {
        // 2단계 성공: 'error' 클래스를 제거해 에러 메시지를 숨깁니다
        form.classList.remove('error');
        alert('이메일이 성공적으로 등록되었습니다!');
        input.value = ''; // 입력창을 초기화해 다음 사용자 입력을 준비합니다
    }
});

/**
 * [이벤트 2] input — 에러 상태 즉시 해제 (UX 개선)
 *
 * [Why] 에러가 표시된 상태에서 사용자가 다시 타이핑을 시작했다는 것은
 *       "지금 고치고 있는 중"이라는 의사 표시입니다.
 *       이때 에러 메시지가 계속 보이면 사용자가 압박감을 느낄 수 있으므로,
 *       첫 키 입력과 동시에 에러 메시지를 제거해 부드러운 UX를 제공합니다.
 *
 * [Result] 에러 아이콘 / 메시지가 즉시 사라지고, 사용자는 부담 없이 수정에 집중할 수 있습니다.
 */
input.addEventListener('input', function () {
    form.classList.remove('error');
});
