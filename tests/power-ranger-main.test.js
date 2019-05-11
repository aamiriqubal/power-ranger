import { Selector } from 'testcafe';

fixture(`Getting Started`)
    .page(`http://localhost:3000/`);

test('Power Ranger main page load test', async t => {
    await t.expect(Selector('title').innerText).eql('Power Ranger');
    await t.expect(Selector('.image-container').find('h1').innerText).eql('Power Ranger');
});

test('Test input field error: with empty value', async t => {
    await t.click(Selector('.button-submit').withText('EVALUATE'));
    await t.expect(Selector('.ps-notification--content').innerText).eql('Input field cannot be empty.')
});

test('Test input field error: with invalid values', async t => {
    await t.typeText(Selector('.input_field').withAttribute('name', 'input'),'(0, invalid-coordinate)');
    await t.click(Selector('.button-submit').withText('EVALUATE'));
    await t.expect(Selector('.ps-notification--content').innerText).eql('Input field should only contains number. value: "invalid-coordinate" not acceptable for input:(0, invalid-coordinate)')
});

test('Test input field error: with proper values', async t => {
    await t.typeText(Selector('.input_field').withAttribute('name', 'input'),'(0, 0) \n (100, 1)');
    await t.click(Selector('.button-submit').withText('EVALUATE'));
    await t.expect(Selector('.ps-notification--content').innerText).eql('Power ranger did it!')
    await t.expect(Selector('.output_field').find('.result--0').innerText).eql('Best link station for point 0, 0 is 0, 0 with power 10.')
    await t.expect(Selector('.output_field').find('.result--1').innerText).eql('No link station within reach for point 100, 1.')
});