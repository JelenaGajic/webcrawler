const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://boot.dev/path';
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL trailing slashes', () => {
    const input = 'https://boot.dev/path/';
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

// URL Cnstructor is doing it for us
test('normalizeURL capitals', () => {
    const input = 'https://BOOT.dev/path/';
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://BOOT.dev/path/';
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev">Boot.dev Blog</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path">Boot.dev Blog</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute & relative', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1">Boot.dev Blog</a>
                <a href="/path2">Boot.dev Blog</a>
npm             </body>
        </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path1', 'https://blog.boot.dev/path2']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">Invalid url</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})
