test('练习03 文件流实现JSON读取', async () => {
  const { parser } = require('../index');
  const { user } = await parser(__dirname + '/data/data.json');
console.log('user:', user);
  expect(user).toBe('tom');
})
