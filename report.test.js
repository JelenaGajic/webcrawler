const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('normalizeURL strip protocol', () => {
    const input = {
        'https://wagslane.dev/path1': 1,
        'https://wagslane.dev/path3': 3,
        'https://wagslane.dev/path2': 2,
        'https://wagslane.dev/path4': 4
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path4', 4],
        ['https://wagslane.dev/path3', 3],
        ['https://wagslane.dev/path2', 2],
        ['https://wagslane.dev/path1', 1]
    ]
    expect(actual).toEqual(expected)
})