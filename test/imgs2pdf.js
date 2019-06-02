const test = require('ava')
const path = require('path')
const imgs2pdf = require('../lib/imgs2pdf')
const tempfile = require('tempfile')
const fs = require('fs')

const IMGS = [...Array(3).keys()].map(n => path.join(__dirname, `fixtures/${n}.jpg`))
const DEST = tempfile()

test.after.always(() => fs.unlink(DEST, () => {}))

test('imgs2pdf', async t => {
    t.false(fs.existsSync(DEST))
    await imgs2pdf(IMGS, DEST)
    t.true(fs.existsSync(DEST))
    fs.copyFileSync(DEST, './examples/bundle.pdf')
})