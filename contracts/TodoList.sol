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