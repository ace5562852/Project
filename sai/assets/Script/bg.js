cc.Class({
    extends: cc.Component,

    properties: {
       Hero_State :cc.Enum({
           default:1,
           StandByR:1,
           WalkL:2,
           WalkR:3,
           Attack:4,
       }),
       Hero_Diretion:cc.Enum({
        default:2,
           Left:1,
           Right:2,
       }),
       m_Hero:cc.Animation,
       m_BtnWalkL:cc.Button,
       m_BtnWalkR:cc.Button,
       m_BtnAttack:cc.Button,
    },

    // use this for initialization
    onLoad: function () {
        this.Hero_State = 1;
        this.Hero_Diretion =2;
        //m_BtnWalkR按钮监听
        this.m_BtnWalkR.node.on(cc.Node.EventType.TOUCH_START,this.WalkRStartCallFunc,this);
        this.m_BtnWalkR.node.on(cc.Node.EventType.TOUCH_END,this.WalkREndCallFunc,this);
        this.m_BtnWalkR.node.on(cc.Node.EventType.TOUCH_CANCEL,this.WalkRCancelCallFunc,this);
        this.m_BtnWalkR.node.on(cc.Node.EventType.TOUCH_MOVE,this.WalkRMoveCallFunc,this);

        this.m_BtnWalkL.node.on(cc.Node.EventType.TOUCH_START,this.WalkLStartCallFunc,this);
        this.m_BtnWalkL.node.on(cc.Node.EventType.TOUCH_END,this.WalkLEndCallFunc,this);
        this.m_BtnWalkL.node.on(cc.Node.EventType.TOUCH_CANCEL,this.WalkLCancelCallFunc,this);
        this.m_BtnWalkL.node.on(cc.Node.EventType.TOUCH_MOVE,this.WalkLMoveCallFunc,this);

        this.m_BtnAttack.node.on(cc.Node.EventType.TOUCH_START,this.AttackStartCallFunc,this);
        this.m_BtnAttack.node.on(cc.Node.EventType.TOUCH_END,this.AttackEndCallFunc,this);
        this.m_BtnAttack.node.on(cc.Node.EventType.TOUCH_CANCEL,this.AttackCancelCallFunc,this);
        this.m_BtnAttack.node.on(cc.Node.EventType.TOUCH_MOVE,this.AttackMoveCallFunc,this);
        //
    },
  /* onTouchBtn:function(target,data){
    this.m_Hero.play(data);
    },*/

    WalkRStartCallFunc:function(){
        cc.log("name:"+this.m_BtnWalkL.name);
        this.Hero_Diretion = 1;
        this.Hero_State = 3;
        this.m_Hero.node.scaleX = 1;
        this.m_Hero.play('Walk');
        
    },
    WalkREndCallFunc:function(){
        this.m_Hero.play('StandBy');
        this.Hero_State = 1;
    },
    WalkRCancelCallFunc:function(){
        this.m_Hero.play('StandBy');
        this.Hero_State = 1;
    },
    WalkRMoveCallFunc:function(){
        this.m_Hero.play('StandBy');
        this.Hero_State = 1;
    },


    //
    WalkLStartCallFunc:function(){
        this.Hero_State = 2;
        this.Hero_Diretion = 2;
        this.m_Hero.node.scaleX = -1;
        this.m_Hero.play('Walk');
        
    },
    WalkLEndCallFunc:function(){
        this.m_Hero.play('StandBy');
        this.Hero_State = 1;
    },
    WalkLCancelCallFunc:function(){
        this.m_Hero.play('StandBy');
        this.Hero_State = 1;
    },
    WalkLMoveCallFunc:function(){
        this.m_Hero.play('StandBy');
        this.Hero_State = 1;
    },
//attack
    AttackStartCallFunc:function(){
        if(this.m_Hero.currentClip.name == "Attack"){
            return;
        }
        this.Hero_State = 4;
        this.m_Hero.play('Attack');
    },
    AttackEndCallFunc:function(){
      
    },
    AttackCancelCallFunc:function(){
        this.m_Hero.play('StandBy');
        this.Hero_State = 1;
    },
    AttackMoveCallFunc:function(){
        this.m_Hero.play('StandBy');
        this.Hero_State = 1;
    },


    update (dt) {
        if(this.m_Hero.getAnimationState('Attack').isPlaying == false){
            cc.log("gggggggggggggggggggg");
            
           /* if(this.m_Hero.currentClip.name =="StandBy"||this.m_Hero.currentClip.name =="Walk"){
                return;
            }*/
            this.m_Hero.play("StandBy");
            this.Hero_State = 1;
        }
        
        else if(this.Hero_State == 3){
            var hero_x =this.m_Hero.node.getPositionX();
             hero_x = hero_x+2;
             this.m_Hero.node.setPositionX(hero_x);
        }
        else if(this.Hero_State == 2){
            var hero_x =this.m_Hero.node.getPositionX();
             hero_x = hero_x-2;
             this.m_Hero.node.setPositionX(hero_x);
        }
    },
});
