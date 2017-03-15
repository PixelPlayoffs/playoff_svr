/*
    Intent:     This file is simply me working with "learning tests"
                to get a good feel for the jest test runner.

    Author:     @tripdubroot
*/

import Sum from './sum';

describe('Sum', () => {
    test('adds 1 + 2 equal 3', () => {
        expect(Sum.sum(1, 2)).toEqual(3);
    });

    test('adds 1 + 2 equal 3', () => {
        expect(Sum.sum(1, 2)).toEqual(3);
    });
});