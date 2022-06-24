'ui';
// "auto";
showLoginUI();
ui.statusBarColor('#000000');
// 显示登录界面
function showLoginUI() {
  ui.layout(
    <frame>
      <vertical h="auto" align="center" margin="0 50">
        <linear>
          <text w="100" gravity="center" color="#111111" size="16">
            次数
          </text>
          <input id="end" inputType="number" w="*" h="40" text="100" />
        </linear>
        <linear>
          <text w="100" gravity="center" color="#111111" size="16">
            时间
          </text>
          <input id="time" w="*" h="40" text="2022/6/24 19:59:59" />
        </linear>
        <linear>
          <text w="100" gravity="center" color="#111111" size="16">
            间隔毫秒
          </text>
          <input id="ms" inputType="number" w="*" h="40" text="10" />
        </linear>
        <linear>
          <text w="100" gravity="center" color="#111111" size="16">
            监听间隔毫秒
          </text>
          <input id="jtMs" inputType="number" w="*" h="40" text="100" />
        </linear>
        <linear>
          <text w="100" gravity="center" color="#111111" size="16">
            x轴
          </text>
          <input id="xZho" inputType="number" w="*" h="40" text="557" />
        </linear>
        <linear>
          <text w="100" gravity="center" color="#111111" size="16">
            y轴
          </text>
          <input id="yZho" inputType="number" w="*" h="40" text="1321" />
        </linear>
        <linear gravity="center">
          <button id="login" text="开始" />
          <button id="register" text="暂停" />
        </linear>
      </vertical>
    </frame>
  );

  ui.login.on('click', () => {
    end = ui.end.text();
    time = ui.time.text();
    ms = ui.ms.text();
    jtMs = ui.jtMs.text();
    xZho = ui.xZho.text();
    yZho = ui.yZho.text();

    main();
  });
  ui.register.on('click', () => {
    timer2 = null;
    timerS = null;
  });
}
var end = 100;
var time = '2022/6/24 12:44:59';
var ms = 10;
var jtMs = 100;
var xZho = 557;
var yZho = 1321;
var timer2 = null;
var timerS = null;
function main() {
  // 这里写脚本的主逻辑
  threads.start(function () {
    let str = 'end-' + end + 'time-' + time + 'ms-' + ms + 'jtMs-' + jtMs + 'xZho-' + xZho + 'yZho-' + yZho;
    //监听音量键-，关闭所有脚本
    events.observeKey();
    events.onKeyDown('volume_down', function (event) {
      //音量+改为volume_up
      toast('强制停止！');
      engines.stopAllAndToast();
      timer2 && clearInterval(timer2);
      timerS && clearInterval(timerS);
      timer2 = null;
      timerS = null;
    });
    toast('启动' + str);
    let s = 0;
    let endTime = new Date(time).getTime();
  
    timerS = setInterval(() => {
      var startTime = new Date().getTime();
      console.log(startTime >= endTime, startTime, endTime);
      if (startTime >= endTime) {
        toast('开始');
        clearInterval(timerS);
        timerS = null;
        timer2 = setInterval(() => {
          s++;
          if (s > Number(end)) {
            clearInterval(timer2);
            timer2 = null;
            return;
          }
          click(Number(xZho), Number(yZho));
          click(Number(xZho), Number(yZho));
          click(Number(xZho), Number(yZho));
          click(Number(xZho), Number(yZho));
          click(Number(xZho), Number(yZho));
        }, ms);
      }
    }, jtMs);
  });
}
