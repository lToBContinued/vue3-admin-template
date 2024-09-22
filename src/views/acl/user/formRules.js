// 校验用户名字
const validatorUsername = (rule, value, callback) => {
  // 用户的名字/昵称长度至少2位
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名至少5位'))
  }
}
// 校验用户昵称
const validatorName = (rule, value, callback) => {
  // 用户的名字/昵称长度至少2位
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称至少5位'))
  }
}
// 密码校验
const validatorPassword = (rule, value, callback) => {
  // 密码长度至少6位
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户密码至少6位'))
  }
}

export const formRules = {
  username: [{ required: true, validator: validatorUsername, trigger: 'blur' }],
  name: [{ required: true, validator: validatorName, trigger: 'blur' }],
  password: [{ required: true, validator: validatorPassword, trigger: 'blur' }]
}
