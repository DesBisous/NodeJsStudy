import { User } from '../mysql';

const SearchUser =  async (ctx, next) => {
  const users = await User.findAll({
    where: {
      name: ctx.params.name
    }
  });
  ctx.response.type = 'application/json';
  if (users) {
    ctx.response.body = JSON.stringify(users);
  } else {
    ctx.response.body = '查询异常，请联系管理员';
  }
};

const UpdateUser =  async (ctx, next) => {
  const users = await User.update(
    {
      name: ctx.params.newName
    },
    {
      where: {
        name: ctx.params.oldName
      }
    }
  );
  ctx.response.type = 'application/json';
  if (users) {
    ctx.response.body = `成功修改了：${users[0]} 行`;
  } else {
    ctx.response.body = '查询异常，请联系管理员';
  }
};

const CreateUser =  async (ctx, next) => {
  const users = await User.create({
    account: 'Benson',
    password: '123',
    name: '晓滨',
    age: 20,
    sex: '男',
    iphone: '13651478554',
    email: '919624732@qq.com',
    address: '美国纽约唐人街',
    createDate: new Date(),
    state: 1
  });
  ctx.response.type = 'application/json';
  if (users) {
    ctx.response.body = `成功添加了：1 行`;
  } else {
    ctx.response.body = '查询异常，请联系管理员';
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/SearchUser/:name',
    func: SearchUser
  },
  {
    method: 'GET',
    path: '/UpdateUser/:oldName/:newName',
    func: UpdateUser
  },
  {
    method: 'GET',
    path: '/CreateUser',
    func: CreateUser
  },
]
