describe('Lotto', () => {

	/* 1. 입력 제대로 되는 지 테스트 */
	it('does get input correctly?', function () {

		/* index.html 접속 */
		cy.visit('./index.html');

		/* 구입금액 입력 테스트 1234567*/
		cy.get('.pl-2').type('1234567')
		  .should('have.value', '1234567');
	});

	/* 2. 확인 누른 후, 10개의 로또 구매했는 지 확인 */
	it('does show lottos appropriately?', function () {
		/* 구입금액 입력 테스트 지웠다가 100200 적기 */
		cy.get('.pl-2').type('{del}{selectall}{backspace}')
		  .type('100200').should('have.value', '100200');

		/* 확인 버튼을 누른다. */
		cy.get('.pl-2').parent().children('.btn')
		  .click();

		/* 확인 버튼 누른 후, 입력 창 초기화 되었는 지 확인 */
		cy.get('.pl-2')
		  .should('have.value', '0');

		/* 10개 구입했는 지 확인 */
		cy.get('div.flex-wrap').children()
		  .should('have.length', 10);
	});

	/* 3. 잔돈 제대로 저장해서 로또 구매 가능한지 확인 */
	it('does store remains and outputs appropriately?', function () {
		/*
		현재 상황 잔돈 200원,
		900원 입력하면, 로또 한개가 추가되어야 합니다.
		*/
		/* 구입금액 입력 테스트 900*/
		cy.get('.pl-2')
		  .type('900').should('have.value', '900');

		/* 확인 버튼을 누른다. */
		cy.get('.pl-2').parent().children('.btn')
		  .click();

		/* 확인 버튼 누른 후, 입력 창 초기화 되었는 지 확인 */
		cy.get('.pl-2')
		  .should('have.value', '0');

		/* 11개 구입했는 지 확인 */
		cy.get('div.flex-wrap').children()
		  .should('have.length', 11);
	});

	/* 4. 토글 on <-> off 에 따라 로또 번호를 보여주는 지 확인 */
	it('does show lottos\'s each numbers with toggle?', function () {

		/* 토글 off->on 누르기 */
		cy.get('.switch').click();
	    cy.get('.lotto-numbers-toggle-button').should('be.checked');
		cy.get('.lotto-numbers').should('be.visible');

		/* 토글 on->off 누르기 */
		cy.get('.switch').click();
	    cy.get('.lotto-numbers-toggle-button').should('not.be.checked');

		/* 토글 off->on 누르기 */
		cy.get('.switch').click();
	    cy.get('.lotto-numbers-toggle-button').should('be.checked');
	    cy.get('.lotto-numbers').should('be.visible');
	});
});