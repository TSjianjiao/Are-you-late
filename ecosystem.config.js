const path = require('path')
module.exports = {
  apps : [{
    name: 'are-you-late',
    script: path.join(__dirname, 'src', 'index.ts'),
    interpreter: './node_modules/.bin/ts-node',
    interpreter_args: '-r tsconfig-paths/register .\\src\\index.ts',
    watch: false,
    env: {},
    env_production: {
      NODE_ENV: 'production'
    },
  }],

  deploy : {
    production : {
      user : 'root',
      host : '8.130.48.20',
      ref  : 'origin/main',
      repo : 'git@github.com:TSjianjiao/Are-you-late.git',
      path : '/usr/local/Code/are-you-late',
      'pre-deploy-local': 'echo \'本地脚本!\'',
      'post-deploy' : 'echo \'开始部署\' && yarn && pm2 startOrRestart ecosystem.config.js --env production',
      // 'post-deploy' : "echo '开始部署' && yarn && yarn add --dev typescript @types/react && yarn build && pm2 startOrRestart ecosystem.config.js --env production",
      'post-setup': 'echo \'克隆完成，设置成功!\'',
      'pre-setup': 'echo \'开始设置!\''
    }
  }
}
