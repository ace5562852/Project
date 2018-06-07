

cc.Class({
    extends: cc.Component,

    properties: {
        speed:0.1,

        bar:{
            default:null,
            type:cc.Sprite
        }
    },

     onLoad () {
        
     },

    start () {

    },

     update (dt) {
        // cc.log("dt:",dt);
        this._updateBar(this.bar,1,dt);
     },
     _updateBar:function(sprite,range,dt){
         var fillRange = sprite.fillRange;
         fillRange = fillRange < range ? fillRange = fillRange +(dt*this.speed):0;
         sprite.fillRange = fillRange;
     }
});
