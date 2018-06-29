import assert from 'assert';
import _async from '../async'

describe('#async.js', () => {
  describe('#异步读取文件', () => {
    before(function () {
       console.log('before:');
    });

    after(function () {
       console.log('after.');
    });

    beforeEach(function () {
       console.log('  beforeEach:');
    });

    afterEach(function () {
       console.log('  afterEach.');
    });

    it('#async function', async () => {
      const result = await _async();
      assert.strictEqual(result, 15);
    });
  });
});
