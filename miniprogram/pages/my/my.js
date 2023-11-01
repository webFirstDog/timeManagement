const app = getApp();

Page({
    data: {
        itemList: [
            {
                id: "about",
                name: "关于",
                page: "../about/about"
            }

        ]
    },
    userInfoHandler(data) {
        wx.BaaS.handleUserInfo(data).then(
            res => {
                console.log(res);
            },
            res => {
                console.log(res);
            }
        );
    }
});