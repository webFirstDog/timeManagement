const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        FirstRun: false,
        isRunning: true,
        step: 1,
        num: 0,
        start: -0.5 * Math.PI,
        end: 1.5 * Math.PI,
        time: null,
        n: 5,
        date:'00:00:00',
        audioCtx: null,
        audioState: true,
        src: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.n = app.globalData.TaskTime
        this.setData({
            src: app.globalData.taskMusic
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        if (!this.data.FirstRun) {
            this.strat()
        } else {
            setData({
                FirstRun: true
            })
            return
        }
        this.data.audioCtx = wx.createInnerAudioContext({
            'useWebAudioImplement':true
        })
        this.data.audioCtx.src = app.globalData.taskMusic
        this.data.audioCtx.play()
    },
    onUnload(){
        console.log(123)
        this.data.audioCtx.stop()
    },
    //开始时调用时间
    strat() {
        this.ringMove(this.data.start, this.data.end);
        // 创建倒计时
        this.data.time = setInterval(this.animation.bind(this.data), 1000);
    },
    //循环
    animation() {
        if (this.data.step <= this.data.n && this.data.isRunning) {
            var End = this.data.end
            End = End + 2 * Math.PI / this.data.n
            var Step = this.data.step + 1
            this.setData({
                end: End,
                step: Step
            })
            this.ringMove(this.data.start, this.data.end);
        } else {
            var Time = app.globalData.allTime
            var count = app.globalData.count
            Time += this.data.n
            count += 1
            app.globalData.allTime = Time
            app.globalData.count = count
            this.giveUp()
            console.log(app.globalData.allTime, app.globalData.count)
            let number = app.globalData.category;
            switch (number) {
                case 0:
                    let eworkNum = app.globalData.workNum;
                    eworkNum++;
                    app.globalData.workNum = eworkNum;
                    console.log('Work' + eworkNum);
                    break;
                case 1:
                    let estudyNum = app.globalData.studyNum;
                    estudyNum++;
                    app.globalData.studyNum = estudyNum;
                    console.log('Study' + estudyNum);
                    break;
                case 2:
                    let ethinkNum = app.globalData.thinkNum;
                    ethinkNum++;
                    app.globalData.thinkNum = ethinkNum;
                    console.log('Think' + ethinkNum);
                    break;
                case 3:
                    let ewriteNum = app.globalData.writeNum;
                    ewriteNum++;
                    app.globalData.writeNum = ewriteNum;
                    console.log('Write' + ewriteNum);
                    break;
                case 4:
                    let esportNum = app.globalData.sportNum;
                    esportNum++;
                    app.globalData.sportNum = esportNum;
                    console.log('Sport' + esportNum);
                    break;
                case 5:
                    let ereadNum = app.globalData.readNum;
                    ereadNum++;
                    app.globalData.readNum = ereadNum;
                    console.log('Read' + ereadNum);
                    break;
                default:
                    break;
            }
            console.log('B' + number);
            
        }
    },
    //绘图以及显示剩余时间
    ringMove(s, e) {
        var minute = parseInt((this.data.n - this.data.num) / 60)
        if (minute < 10) {
            minute = "0" + minute
        }
        var seconds = (this.data.n - this.data.num) % 60
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        this.setData({
            date: minute + ":" + seconds
        })

        this.data.num++;
    },
    //开关
    pause() {
        this.setData({
            isRunning: false
        })
        clearInterval(this.data.time);
        this.data.audioCtx.pause()
    },
    continue () {
        this.setData({
            isRunning: true
        })
        this.data.time = setInterval(this.animation.bind(this.data), 1000);
        this.data.audioCtx.play()
    },
    giveUp() {
        clearInterval(this.data.time);
        wx.switchTab({
            url: '../task/task',
        })
    },
    stop() {

        if (this.data.isRunning) {
            this.setData({
                audioState: false
            })
            this.data.audioCtx.pause()
        }
    },
    play() {
        if (this.data.isRunning) {
            this.setData({
                audioState: true
            })
            this.data.audioCtx.play()
        }
    }
})