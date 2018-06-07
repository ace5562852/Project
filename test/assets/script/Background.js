cc.Class({
    extends: cc.Component,

    properties: {
        canvas:cc.Node,
        Boat:cc.Node,
        isMoving:false,
        BoatSpeed:200,
        DuringTime:0,
        Boat_x:0,
        Boat_y:0,
        Touch_x:0,
        Touch_y:0,
       // WaterEff:cc.Animation
    },
    onLoad:function(){
        var self = this;

        self.Boat_x = self.Boat.x;
        self.Boat_y = self.Boat.y;

        self.canvas.on(cc.Node.EventType.TOUCH_START,function(event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            

            self.Touch_x = Math.round(touchLoc.x);
            self.Touch_y = Math.round(touchLoc.y);
            
            var distance =Math.sqrt((self.Touch_x -self.Boat_x)*(self.Touch_x -self.Boat_x)+(self.Touch_y-self.Boat_y)*(self.Touch_y-self.Boat_y)); 
            self.DuringTime =Math.round(distance/self.BoatSpeed);
            cc.log("distance:"+distance);
            cc.log("DuringTime:"+self.DuringTime);
            var actionTo = cc.moveTo(self.DuringTime,cc.p(self.Touch_x,self.Touch_y ));
            //var action = cc.scaleTo(0.2, 1, 0.6);
            self.Boat.runAction(actionTo);

        }, self.node);

        
    },

});
