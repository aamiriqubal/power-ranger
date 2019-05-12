import { Selector } from 'testcafe';

fixture(`Here we go! Testing our Ranger`)
  .page(`http://localhost:3000/`);

test('Power Ranger main page load test.', async t => {
  await t.expect(Selector('title').innerText).eql('Power Ranger');
  await t.expect(Selector('.image-container').find('h1').innerText).eql('Power Ranger');
});

test('Test input field with empty value, returns empty field error message.', async t => {
  await t.click(Selector('.button-submit').withText('EVALUATE'));
  await t.expect(Selector('.ps-notification--content').innerText).eql('Input field cannot be empty.')
});

test('Test input field with invalid values, returns invalid input value error message.', async t => {
  await t.typeText(Selector('.input_field').withAttribute('name', 'input'),'(0, invalid-coordinate)');
  await t.click(Selector('.button-submit').withText('EVALUATE'));
  await t.expect(Selector('.ps-notification--content').innerText).eql('Input field should only contain numbers. value: "invalid-coordinate" not acceptable. Input:(0, invalid-coordinate)')
});

test('Test input field with incorrect length of values, returns invalid input value error message.', async t => {
  await t.typeText(Selector('.input_field').withAttribute('name', 'input'),'(0, 100, 12)');
  await t.click(Selector('.button-submit').withText('EVALUATE'));
  await t.expect(Selector('.ps-notification--content').innerText).eql('Improper x, y as input. Object length should be 2. Input:(0, 100, 12)')
});

test('Test input field with proper values, returns calculated value in output field', async t => {
  await t.typeText(Selector('.input_field').withAttribute('name', 'input'),'(0, 0) \n (100, 1)');
  await t.click(Selector('.button-submit').withText('EVALUATE'));
  await t.expect(Selector('.ps-notification--content').innerText).eql('Power ranger did it!')
  await t.expect(Selector('.output_field').find('.result--0').innerText).eql('Best link station for point 0, 0 is 0, 0 with power 10.')
  await t.expect(Selector('.output_field').find('.result--1').innerText).eql('No link station within reach for point 100, 1.')
});
