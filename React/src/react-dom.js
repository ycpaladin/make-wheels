

function render(child, container) {
    console.log(child, container)
    // 1. child (VM) -> Fiber
    // 2. 更新
}

/**
 * 当前正在处理的Fiber节点
 */
let workInProgressRoot = null;

function work(deadline) {
    while (!workInProgressRoot && deadline.timeRemaining() > 0) {
        // TODO 处理 Fiber
    }
    requestIdleCallback(work)
}

/**
 * 当浏览器有空闲的时间时处理 Fiber 节点
 */
requestIdleCallback(work)


/**
 * 第一阶段 VM -> Fiber diff 标记需要更新的地方，可以中断
 */
function x() {

}
/**
 * 第二阶段 Fiber -> DOM 不可中断
 */
function commit() {

}

export default {
    render
}