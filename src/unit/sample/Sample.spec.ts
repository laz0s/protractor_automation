module app.sample {
	'use strict';

	describe('Sample', () => {

		var sample:Sample;

		beforeEach(() => {
			sample = new Sample(['Hello', 'world!']);
		});

		it('should have 2 items', () => {
			expect(sample.count()).toBe(2);
		});

		it('should have three items, when one is added.', () => {
			sample.addItem('!!!');
			expect(sample.count()).toBe(3);
		});

		it('list() should contain "Hello" and "world!"', () => {
			var items = sample.list();
			expect(items[0]).toBe('Hello');
			expect(items[1]).toBe('world!');
		});

	});

}
