
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
        web3.eth.defaultAccount = App.account   //如果不设置默认账号，无法触发createTask
        console.log("default account: " + web3.eth.defaultAccount)
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

    createTask: async ()=>{
        App.setLoading(true)
        const content = $('#newTask').val()
        await App.todoList.createTask(content)
        window.location.reload()
    },

}

$(() => {
    $(window).load(()=> {
        App.load()
    })
})

//  https://github.com/dappuniversity/eth-todo-list/issues/11
//  web3.eth.defaultAccount = web3.eth.accounts[0]