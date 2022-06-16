

# [Build Your First Blockchain App Using Ethereum Smart Contracts and Solidity](https://www.youtube.com/watch?v=coQ5dg8wM2o)



https://www.dappuniversity.com/articles/blockchain-app-tutorial

项目代码：https://github.com/dappuniversity/eth-todo-list



## 环境

### 安装node

```
brew install node
```



```
npm i bootstrap@5.2.0-beta1
```



### 下载安装个人区块链ganache

truffleframework.com/ganache

https://github.com/trufflesuite/ganache-ui/releases/download/v2.5.4/Ganache-2.5.4-mac.dmg



### 安装 truffleframework

```
npm install -g truffle@5.0.2

registry.npmjs.org网络不通问题
加速 --registry=https://registry.npmmirror.com

npm config get registry
npm config set registry https://registry.npmmirror.com
npm config set registry http://mirrors.cloud.tencent.com/npm/
npm config set registry https://mirrors.huaweicloud.com/repository/npm/

可使用nrm管理
npm install -g nrm
nrm ls

    npm -----  https://registry.npmjs.org/
    cnpm ----  http://r.cnpmjs.org/
    taobao --  https://registry.npm.taobao.org/
    nj ------  https://registry.nodejitsu.com/
    rednpm -- http://registry.mirror.cqupt.edu.cn
    skimdb -- https://skimdb.npmjs.com/registry
    
使用淘宝镜像源
nrm use taobao
```



### 安装MetaMask

略



## 创建项目

```
> mkdir eth-todo-list
> truffle version         
Truffle v5.0.2 (core: 5.0.2)
Solidity v0.5.0 (solc-js)
Node v16.8.0

> truffle init
如果Error则需代理 > export HTTPS_PROXY=http://127.0.0.1:1087/

> touch package.json
```

```
{
  "name": "eth-todo-list",
  "version": "1.0.0",
  "description": "Blockchain Todo List Powered By Ethereum",
  "main": "truffle-config.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "dev": "lite-server",
    "test": "echo \"Error: no test specified\" && sexit 1"
  },
  "author": "gregory@dappuniversity.com",
  "license": "ISC",
  "devDependencies": {
    "bootstrap": "4.1.3",
    "chai": "^4.1.2",
    "chai-as-promised": "^7.1.1",
    "chai-bignumber": "^2.0.2",
    "lite-server": "^2.3.0",
    "nodemon": "^1.17.3",
    "truffle": "5.0.2",
    "truffle-contract": "3.0.6"
  }
}
```



```
npm install --registry=https://registry.npmmirror.com
```



目录结构介绍

- **contracts directory:** this is where all smart contacts live. We already have a Migration contract that handles our migrations to the blockchain.
- **migrations directory**: this is where all of the migration files live. These migrations are similar to other web development frameworks that require migrations to change the state of a database. Whenever we deploy smart contracts to the blockchain, we are updating the blockchain's state, and therefore need a migration.
- **node_modules directory:** this is the home of all of our Node dependencies we just installed.
- **test directory:** this is where we'll write our tests for our smart contract.
- **truffle-config.js file:** this is the main configuration file for our Truffle project, where we'll handle things like network configuration.



### 编写合约

touch ./contracts/TodoList.sol

```solidity
pragma solidity ^0.5.0;

contract TodoList {
	//允许访问state变量，存储任务个数
  uint public taskCount = 0;
  	
}
```

### 编译合约

```
> truffle compile
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/TodoList.sol...
Writing artifacts to ./build/contracts
```



### 新建脚本

touch ./migrations/2_deploy_contracts.js

```
var TodoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
	deployer.deploy(TodoList);
};

```



### 部署到个人区块链

![image-20220615145200874](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655275921.png)

打开ganache，truffle-config.json里的配置连接服务

```
truffle migrate
```

![image-20220615145251731](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655275972.png)

部署完成后，ganache显示钱包已扣fee

addr: 0x0155C991cAB8F0cF93f501cFdA090c2edCF7249A

![image-20220615145316570](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655275997.png)



来到控制台

```
truffle console
truffle(ganache)> todoList = await TodoList.deployed()
undefined
truffle(ganache)> todoList
TruffleContract {
  constructor: [Function: TruffleContract] {
    _constructorMethods: {
      setProvider: [Function: setProvider],
      new: [Function: new],
      at: [Function: at],
      deployed: [Function: deployed],
      defaults: [Function: defaults],
      hasNetwork: [Function: hasNetwork],
      isDeployed: [Function: isDeployed],
      detectNetwork: [Function: detectNetwork],
      setNetwork: [Function: setNetwork],
      setWallet: [Function: setWallet],
      resetAddress: [Function: resetAddress],
      link: [Function: link],
      clone: [Function: clone],
      addProp: [Function: addProp],
      toJSON: [Function: toJSON],
      decodeLogs: [Function: decodeLogs]
    },
    _properties: {
      contract_name: [Object],
      contractName: [Object],
      gasMultiplier: [Object],
      timeoutBlocks: [Object],
      autoGas: [Object],
      numberFormat: [Object],
      abi: [Object],
      network: [Function: network],
      networks: [Function: networks],
      address: [Object],
      transactionHash: [Object],
      links: [Function: links],
      events: [Function: events],
      binary: [Function: binary],
      deployedBinary: [Function: deployedBinary],
      unlinked_binary: [Object],
      bytecode: [Object],
      deployedBytecode: [Object],
      sourceMap: [Object],
      deployedSourceMap: [Object],
      source: [Object],
      sourcePath: [Object],
      legacyAST: [Object],
      ast: [Object],
      compiler: [Object],
      schema_version: [Function: schema_version],
      schemaVersion: [Function: schemaVersion],
      updated_at: [Function: updated_at],
      updatedAt: [Function: updatedAt],
      userdoc: [Function: userdoc],
      devdoc: [Function: devdoc]
    },
    _property_values: {},
    _json: {
      contractName: 'TodoList',
      abi: [Array],
      bytecode: '0x608060405260008055348015601357600080fd5b50609e806100226000396000f3fe608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063b6cb58a5146044575b600080fd5b348015604f57600080fd5b506056606c565b6040518082815260200191505060405180910390f35b6000548156fea165627a7a72305820f5c2da51fc2e43cb852b179bde1024e2e47817afeb7b099f21e8a3185a993e3e0029',
      deployedBytecode: '0x608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063b6cb58a5146044575b600080fd5b348015604f57600080fd5b506056606c565b6040518082815260200191505060405180910390f35b6000548156fea165627a7a72305820f5c2da51fc2e43cb852b179bde1024e2e47817afeb7b099f21e8a3185a993e3e0029',
      sourceMap: '25:52:1:-;;;73:1;49:25;;25:52;8:9:-1;5:2;;;30:1;27;20:12;5:2;25:52:1;;;;;;;',
      deployedSourceMap: '25:52:1:-;;;;;;;;;;;;;;;;;;;;;;;;49:25;;8:9:-1;5:2;;;30:1;27;20:12;5:2;49:25:1;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o',
      source: 'pragma solidity ^0.5.0;\n' +
        '\n' +
        'contract TodoList {\n' +
        '    uint public taskCount = 0;\n' +
        '}',
      sourcePath: '/Users/e/dev/eth-todo-list/contracts/TodoList.sol',
      ast: [Object],
      legacyAST: [Object],
      compiler: [Object],
      networks: [Object],
      schemaVersion: '3.0.1',
      updatedAt: '2022-06-15T06:52:10.781Z',
      devdoc: [Object],
      userdoc: [Object]
    },
    setProvider: [Function: bound setProvider],
    new: [Function: bound new] {
      estimateGas: [Function: bound estimateDeployment]
    },
    at: [Function: bound at],
    deployed: [Function: bound deployed],
    defaults: [Function: bound defaults],
    hasNetwork: [Function: bound hasNetwork],
    isDeployed: [Function: bound isDeployed],
    detectNetwork: [Function: bound detectNetwork],
    setNetwork: [Function: bound setNetwork],
    setWallet: [Function: bound setWallet],
    resetAddress: [Function: bound resetAddress],
    link: [Function: bound link],
    clone: [Function: bound clone],
    addProp: [Function: bound addProp],
    toJSON: [Function: bound toJSON],
    decodeLogs: [Function: bound decodeLogs],
    web3: Web3 {
      currentProvider: [Getter/Setter],
      _requestManager: [RequestManager],
      givenProvider: null,
      providers: [Object],
      _provider: [HttpProvider],
      setProvider: [Function (anonymous)],
      BatchRequest: [Function: bound Batch],
      extend: [Function],
      version: '1.0.0-beta.37',
      utils: [Object],
      eth: [Eth],
      shh: [Shh],
      bzz: [Bzz]
    },
    class_defaults: {
      from: '0x0155C991cAB8F0cF93f501cFdA090c2edCF7249A',
      gas: 6721975,
      gasPrice: 20000000000
    },
    currentProvider: HttpProvider {
      host: 'http://127.0.0.1:7545',
      httpAgent: [Agent],
      timeout: 0,
      headers: undefined,
      connected: true,
      send: [Function (anonymous)],
      _alreadyWrapped: true
    },
    network_id: '5777'
  },
  methods: {
    'taskCount()': [Function (anonymous)] {
      call: [Function (anonymous)],
      sendTransaction: [Function (anonymous)],
      estimateGas: [Function (anonymous)],
      request: [Function (anonymous)]
    }
  },
  abi: [
    {
      constant: true,
      inputs: [],
      name: 'taskCount',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xb6cb58a5'
    }
  ],
  address: '0xCa245927F3441694bde9437A22Fc9a9145d6C196',
  transactionHash: undefined,
  contract: Contract {
    currentProvider: [Getter/Setter],
    _requestManager: RequestManager {
      provider: [HttpProvider],
      providers: [Object],
      subscriptions: {}
    },
    givenProvider: null,
    providers: {
      WebsocketProvider: [Function: WebsocketProvider],
      HttpProvider: [Function: HttpProvider],
      IpcProvider: [Function: IpcProvider]
    },
    _provider: HttpProvider {
      host: 'http://127.0.0.1:7545',
      httpAgent: [Agent],
      timeout: 0,
      headers: undefined,
      connected: true,
      send: [Function (anonymous)],
      _alreadyWrapped: true
    },
    setProvider: [Function (anonymous)],
    BatchRequest: [Function: bound Batch],
    extend: [Function: ex] {
      formatters: [Object],
      utils: [Object],
      Method: [Function: Method]
    },
    clearSubscriptions: [Function (anonymous)],
    options: { address: [Getter/Setter], jsonInterface: [Getter/Setter] },
    defaultAccount: [Getter/Setter],
    defaultBlock: [Getter/Setter],
    methods: {
      taskCount: [Function: bound _createTxObject],
      '0xb6cb58a5': [Function: bound _createTxObject],
      'taskCount()': [Function: bound _createTxObject]
    },
    events: { allEvents: [Function: bound ] },
    _address: '0xCa245927F3441694bde9437A22Fc9a9145d6C196',
    _jsonInterface: [ [Object] ]
  },
  taskCount: [Function (anonymous)] {
    call: [Function (anonymous)],
    sendTransaction: [Function (anonymous)],
    estimateGas: [Function (anonymous)],
    request: [Function (anonymous)]
  },
  sendTransaction: [Function (anonymous)],
  send: [Function (anonymous)],
  allEvents: [Function (anonymous)],
  getPastEvents: [Function (anonymous)]
}

truffle(ganache)> todoList.address
'0xCa245927F3441694bde9437A22Fc9a9145d6C196'
truffle(ganache)> todoList.taskCount()
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
```

操作说明：到区块链检索部署的合约的副本，并赋值给变量，然后查看合约的信息

- 必须异步的方式与区块链交互

获取变量信息，转换为Number

```
truffle(ganache)> taskCount = await todoList.taskCount()
undefined
truffle(ganache)> taskCount.toNumber()
0
```



git init

touch .gitignore

```
node_modules/
```



## List tasks



```
pragma solidity ^0.5.0;

contract TodoList  {
	uint taskCount = 0;
	struct Task{
		uint id;
		string content;
		bool completed;
	}
	
	//映射的key value
	mapping(uint => Task) public tasks;
	
	function createTask(string memory _content) public {
		taskCount ++;
		tasks[taskCount] = Task(taskCount, _content, false);
	}
	
	//init/ run at first time
	constructor() public{
		createTask("check out my tasks");
	}
}
```



```
truffle compile
truffle console
truffle migrate --reset	#如果智能合约已经存在，reset
```

addr: 0x36E14DA698c421A6bB4c390d2d05E39120A9B825





到控制台查看、新建任务

任务个数，初始化部署时为1，调用后为2

```
➜  eth-todo-list truffle console        
truffle(ganache)> todoList = await TodoList.deployed()
undefined
truffle(ganache)> todoList.address
'0x36E14DA698c421A6bB4c390d2d05E39120A9B825'
truffle(ganache)> todoList.taskCount()
BN { negative: 0, words: [ 1, <1 empty item> ], length: 1, red: null }
truffle(ganache)> todoList.createTask("test my contract")
{
  tx: '0xc7bf31ff384709b25c3aa170d2f035d8df8c98333297da0bb20fc2a147c73054',
  receipt: {
    transactionHash: '0xc7bf31ff384709b25c3aa170d2f035d8df8c98333297da0bb20fc2a147c73054',
    transactionIndex: 0,
    blockHash: '0x33e860fd5d169e3d34f5b13025c38644df88a37c9dbac7967cef6d737089a17c',
    blockNumber: 5,
    from: '0x0155c991cab8f0cf93f501cfda090c2edcf7249a',
    to: '0x36e14da698c421a6bb4c390d2d05e39120a9b825',
    gasUsed: 72682,
    cumulativeGasUsed: 72682,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: []
  },
  logs: []
}
truffle(ganache)> todoList.taskCount()
BN { negative: 0, words: [ 2, <1 empty item> ], length: 1, red: null }

truffle(ganache)> task = await todoList.tasks(2)
undefined
truffle(ganache)> task
Result {
  '0': BN {
    negative: 0,
    words: [ 2, <1 empty item> ],
    length: 1,
    red: null
  },
  '1': 'test my contract',
  '2': false,
  id: BN {
    negative: 0,
    words: [ 2, <1 empty item> ],
    length: 1,
    red: null
  },
  content: 'test my contract',
  completed: false
}


```





### web front

https://youtu.be/coQ5dg8wM2o?t=2186



```
mkdir src
touch src/index.html
touch src/app.js
```



bs = browser sync

```json
touch bs-config.json
{
	"server": {
		"baseDir": [
			"./src",
			"./build/contracts"
		],
		"routes": {
			"/vendor": "./node_modules"
    }
	}
}
```



启动服务

```
npm run dev
```

![image-20220615160340235](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655280220.png)



遇到错误 `ReferenceError: Web3 is not defined`

需要引入web3.js

```
    <script src="vendor/web3/dist/web3.js"></script>
    <script src="vendor/truffle-contract/dist/truffle-contract.js"></script>
```

MetaMask添加本地网络

![image-20220615172105190](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655284865.png)

导入账户

![image-20220615172233034](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655284953.png)

拷贝个人区块链钱包的一个私钥即可

![image-20220615172325734](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655285005.png)

![image-20220615172345836](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655285026.png)



index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>todolist dapp</title>


    <!-- jQuery library -->
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>

</head>
<body>
    
    <div>
        Your account: <span id="account" name="account"></span>

        <div id="loader">Loading</div>

    </div>


    <ul id="taskList" class="list-unstyled">
        <div class="taskTemplate" class="checkbox" style="display: none">
                <label for="">
                    <input type="checkbox" />
                    <span class="content">Task content goes herer...</span>
                </label>
        </div>

    </ul>

    <ul id="completedTaskList" class="list-unstyled">

    </ul>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <!-- <script src="vendor/bootstrap/dist/js/bootstrap.min.js"></script> -->




    <script src="vendor/web3/dist/web3.js"></script>
    <script src="vendor/truffle-contract/dist/truffle-contract.js"></script>
    <script src="./app.js"></script>
   
</body>
</html>
```

app.js

```

App = {
    loading: false,
    contracts: {},
    
    load: async () => {
        //load app
        console.log("app loading...")
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()

        await App.render()

    },

    //  this from metamask
    //  https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () =>{
        if(typeof web3 !== 'undefined'){
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
            //web3 = new Web3(new Web3.providers.HttpProvider("http://ropsten.infura.io/"));
            //const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
            if(!web3.isConnected())
                console.log("not connected");
            else
                console.log("connected");
        }else{
            window.alert("Please connect to Metamask!")
        }
        //Modern app browsers ...
        if(window.ethereum){
            window.web3 = new Web3(ethereum)
            try{
                //request account access if needed
                await ethereum.enable()
                //accounts now expose
                web3.eth.sendTransaction({/* ... */})
            }catch(error){
                //user denied account access
            }
        }
        //legacy dapp browsers ...
        else if(window.web3){
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            //accounts always exposed
            web3.eth.sendTransaction({/* ... */})
        }
        //non-dapp browsers ...
        else{
            console.log("Non-Ethereum browser detected")
        }
    },

    loadAccount: async ()=>{
        App.account = web3.eth.accounts[0]
        console.log("account: " + App.account)
        alert("你的钱包账户: " + App.account)
        // console.log(web3.eth)


    },

    loadContract: async ()=>{
        const todoList = await $.getJSON("TodoList.json")
        // TodoList.json 文件bs-config配置的暴露contract，为编译后的文件
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)

        console.log(todoList)

        App.todoList = await App.contracts.TodoList.deployed()
    },

    render: async()=>{
        //prevent double render
        if(App.loading){
            return
        }
        App.setLoading(true)

        //render account
        $('#account').html(App.account)


        await App.renderTasks()

        App.setLoading(false)

    },

    setLoading: (boolean)=>{
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if(boolean){
            loader.show()
            content.hide()
        }else{
            loader.hide()
            content.show()
        }
    },

    renderTasks: async ()=>{
        //load task count from blockchain
        const taskCount = await App.todoList.taskCount()
        const $taskTemplate = $('.taskTemplate')

        //render out each task with  a new task complete
        for(var i=1; i <= taskCount; i++){
            //fetch task data from blockchain
            const task = await App.todoList.tasks(i)
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]
            //若报错： BigNumber Error: new BigNumber() not a base 16 number 则是合约未部署 truffle migrate --reset

            // console.log(task)
            // console.log(taskId)
            // console.log(taskContent)

            //create html for task
            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskId + ". " + taskContent)
            $newTaskTemplate.find('input')
                .prop('name', taskId)
                .prop('checked', taskCompleted)
                .on('click', App.toggleCompleted)

                if(taskCompleted){
                    $('#completedTaskList').append($newTaskTemplate)
                }else{
                    $('#taskList').append($newTaskTemplate)
                }
                //show task
                $newTaskTemplate.show()
        }
    },

    toggleCompleted: async (e)=>{
        App.setLoading(true)
        const taskId = e.target.name
        await App.todoList.toggleCompleted(taskId)
        window.location.reload()
        // App.setLoading(false)
    },

}

$(() => {
    $(window).load(()=> {
        App.load()
    })
})

//  https://github.com/dappuniversity/eth-todo-list/issues/11
//  web3.eth.defaultAccount = web3.eth.accounts[0]
```



若报错： BigNumber Error: new BigNumber() not a base 16 number 则是合约未部署，需要

```
truffle migrate --reset
```



## 测试

```
mkdir test
touch test/TodoList.test.js
```



```
const { assert } = require("chai")

const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts)=>{
    //get a deployed copy of smart contract before hook
    before(async()=>{
        this.todoList = await TodoList.deployed()

    })
    it('deploys successfully', async()=>{
        const address = await this.todoList.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)

    })

    it('list tasks', async ()=>{
        const taskCount = await this.todoList.taskCount()
        const task = await this.todoList.tasks(taskCount)
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, "check out my tasks")
        assert.equal(task.completed, false)
        assert.equal(taskCount.toNumber(),
    })
})
```

安装工具



修改truffle-config.js

取消注释

```
  networks: {
  	development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
```



测试

```
truffle test
```



## Create task on contract

https://youtu.be/coQ5dg8wM2o?t=3910



boardcast with **event**

合约代码

```
pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

	struct Task{
		uint id;
		string content;
		bool completed;
	}

	mapping(uint => Task) public tasks;
	
  //boardcast with event
	event TaskCreated(
		uint id,
		string content,
		bool completed
	);
	
	function createTask(string memory _content) public {
		taskCount ++;
		tasks[taskCount] = Task(taskCount, _content, false);
		//call event
		emit TaskCreated(taskCount, _content, false);
	}
	
	//init/ run at first time
	constructor() public {
		createTask("check out my tasks");
	}
}
```



index.html增加输入框

```

    <form onsubmit="App.createTask(); return false;">
        <input type="text" name="" id="newTask" class="form-control" placeholder="Add task ..." required>
        <input type="submit">
    </form>
```



app.js

```

    createTask: async ()=>{
        App.setLoading(true)
        const content = $('#newTask').val()
        await App.todoList.createTask(content)
        window.location.reload()
    },
```

test.js增加

```

    it('create tasks', async()=>{
        const result = await this.todoList.createTask('A new task')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount, 2)
        //if event trigged
        console.log(result)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, "A new task")
        assert.equal(event.completed, false)
    })
```

再次测试

```
truffle test
```

![image-20220615204921610](https://raw.githubusercontent.com/gifpic/images/td-notes/2022/06/upgit_20220615_1655297361.png)



Web上新建任务时调用用钱包时报错了

> invalid address at inputAddressFormatter

需要修改，加上 web3.eth.defaultAccount

```
    loadAccount: async ()=>{
        App.account = web3.eth.accounts[0]
        console.log("account: " + App.account)
        web3.eth.defaultAccount = App.account   //如果不设置默认账号，无法触发createTask
        console.log("default account: " + web3.eth.defaultAccount)
        alert("你的钱包账户: " + App.account)
        // console.log(web3.eth)

    },
```





### 任务完成切换

合约代码增加

```

    event TaskCompleted(
        uint id,
        bool completed
    );
    
    function toggleCompleted(uint id) public {
        Task memory _task = tasks[id];
        _task.completed = !_task.completed;
        tasks[id] = _task;

        emit TaskCompleted(id, _task.completed);
    }
```



完整合约代码

```
pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

	struct Task{
		uint id;
		string content;
		bool completed;
	}

	mapping(uint => Task) public tasks;

    //boardcast with event
	event TaskCreated(
		uint id,
		string content,
		bool completed
	);

    event TaskCompleted(
        uint id,
        bool completed
    );

	function createTask(string memory _content) public {
		taskCount ++;
		tasks[taskCount] = Task(taskCount, _content, false);
		//call event
		emit TaskCreated(taskCount, _content, false);
	}
	
	//init/ run at first time
	constructor() public {
		createTask("check out my tasks");
	}

    function toggleCompleted(uint id) public {
        Task memory _task = tasks[id];
        _task.completed = !_task.completed;
        tasks[id] = _task;

        emit TaskCompleted(id, _task.completed);
    }
}
```



test.js增加

```
    id('toggles task completion', async ()=> {
        const result = await this.todoList.toggleCompleted(1)
        const task = await this.todoList.tasks(1)
        assert.equal(task.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
    })
```







其他资料

- https://github.com/trufflesuite/truffle-init-default
- https://web3js.readthedocs.io/
- 

