
cc.Class({
    extends: cc.Component,

    properties: {
        isUpTouch:false,
        isDownTouch:false,
        isLeftTouch:false,
        isRightTouch:false,
        upEnabel:true,
        downEnabel:true,
        leftEnabel:true,
        rightEnabel:true,
        halfX:0,
        halfY:0,
        PlayerX:0,
        PlayerY:0,
        speed:4,

        m_Hero:cc.Node,

        Hero_Direction:cc.Enum({
            default:2,
            up:1,
            down:2,
            left:3,
            right:4,
        }),
        Hero_State:cc.Enum({
            default:1,
            stop:1,
            walk:2,
            attack:3,
        }),
    },


     onLoad:function () {

        this.Player = this.node.getChildByName('Player');
        this.halfX = this.Player.width/2-8;
        this.halfY = this.Player.height/2;
        this.loadMap();

        //注册键盘按下监听函数
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,
             this.onKeyDown,this);
        //组测键盘松开监听函数
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,
        this.onKeyUp,this);
     },

     onKeyDown:function(event){
        var anima =this.m_Hero.getComponent(cc.Animation);
        switch (event.keyCode) {
            
            case cc.KEY.up:
                    this.changeDirection(1);
                    this.changeActionState(2);
                    anima.play("up");
                    this.isUpTouch = true;
                    this.isDownTouch = false;
                    this.isLeftTouch = false;
                    this.isRightTouch = false;
                break;
            
            case cc.KEY.down:
                this.changeDirection(2);
                this.changeActionState(2);
                anima.play("down");
                this.isDownTouch = true;
                this.isUpTouch = false;
                this.isLeftTouch = false;
                this.isRightTouch = false;
                break;
                
            case cc.KEY.left:
                    this.changeDirection(3);
                    this.changeActionState(2);
                    anima.play("left");
                    this.isLeftTouch = true;
                    this.isDownTouch = false;
                    this.isUpTouch = false;
                    this.isRightTouch = false;
                break;

            case cc.KEY.right:
                    this.changeDirection(4);
                    this.changeActionState(2);
                    anima.play("right");
                    this.isRightTouch = true;
                    this.isDownTouch = false;
                    this.isLeftTouch = false;
                    this.isUptTouch = false;
           
                break;
        
            default:
                return;
        }
     },
     
     onKeyUp:function(event){
         var anima =this.m_Hero.getComponent(cc.Animation);
        switch (event.keyCode) {
            case cc.KEY.up:
            if(this.isUpTouch == true){
                this.changeDirection(1);
                this.changeActionState(1);
                anima.stop();
                this.isUpTouch =false;
                this.isDownTouch =false;
                this.isLeftTouch =false;
                this.isRightTouch =false;
            }
            
                break;
            
            case cc.KEY.down:
            if(this.isDownTouch == true){
                this.changeDirection(2);
                this.changeActionState(1);
                anima.stop();
                this.isUpTouch =false;
                this.isDownTouch =false;
                this.isLeftTouch =false;
                this.isRightTouch =false;
            }
            
                break;
                
            case cc.KEY.left:
            if(this.isLeftTouch == true){
                this.changeDirection(3);
                this.changeActionState(1);
                anima.stop();
                this.isUpTouch =false;
                this.isDownTouch =false;
                this.isLeftTouch =false;
                this.isRightTouch =false;             
            }
            
                break;

            case cc.KEY.right:
            if(this.isRightTouch == true){
                this.changeDirection(4);
                this.changeActionState(1);
            anima.stop();
            this.isUpTouch =false;
            this.isDownTouch =false;
            this.isLeftTouch =false;
            this.isRightTouch =false;
            }
            
                break;
        
            default:
                return;
        }
     },

    start () {
    },
    loadMap: function(){
        //地图
        this.tiledMap = this.node.getComponent(cc.TiledMap);
        //Role对象层
        let role = this.tiledMap.getObjectGroup('Role');
        //获取palyer对象
        let player = role.getObject('Player'); 
        //对象坐标
       // let playerPos = cc.p(player.offset.x,520-player.offset.y);
        //设置玩家瓦片坐标
        //this.playerTile  = this.getTilePos(playerPos);
        
        //获取障碍物图层
        this.block1 = this.tiledMap.getLayer('Block1');
        this.block2 = this.tiledMap.getLayer('Block2');
        this.block3 = this.tiledMap.getLayer('Block3');
        this.block4 = this.tiledMap.getLayer('Block4');
        //更新玩家玩家位置
        //this.Player.setPosition(40,40);
       // this.updatePlayerPos();

    },
    //将像素坐标转化为瓦片坐标
    getTilePos: function(posInPixel) {
        var mapSize = this.node.getContentSize();
        var tileSize = this.tiledMap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
        return cc.p(x, y);
    },

        // updatePlayerPos:function(){
        //     var pos = this.block1.getPositionAt(this.playerTile);
        //     this.Player.setPosition(pos);
          
        // },
    changeActionState:function(newState){
        this.hero_State = newState;
    },
    changeDirection:function(newDir){
        this.hero_Direction = newDir;
    },
    //行走结束后更新精灵方向图片
    updateSpiriteDIR:function(){
        if(this.hero_Direction == 1 && this.hero_State == 1){
            var sprite = this.m_Hero.getComponent(cc.Sprite);
            cc.loader.loadRes("textures/player", cc.SpriteAtlas, function (err, atlas) {
                var frame = atlas.getSpriteFrame('player_dao_04');
                sprite.spriteFrame = frame;
                });
        }
        else if(this.hero_Direction == 2 && this.hero_State == 1){
           // this.m_Hero.stopAllActions();
            var sprite = this.m_Hero.getComponent(cc.Sprite);
            cc.loader.loadRes("textures/player", cc.SpriteAtlas, function (err, atlas) {
                var frame = atlas.getSpriteFrame('player_dao_05');
                
                sprite.spriteFrame = frame;
                });
        }
        else if(this.hero_Direction == 3 && this.hero_State == 1){
             var sprite = this.m_Hero.getComponent(cc.Sprite);
             cc.loader.loadRes("textures/player", cc.SpriteAtlas, function (err, atlas) {
                 var frame = atlas.getSpriteFrame('player_daoL_06');
                 
                 sprite.spriteFrame = frame;
                 });
         }
         else if(this.hero_Direction == 4 && this.hero_State == 1){
             var sprite = this.m_Hero.getComponent(cc.Sprite);
             cc.loader.loadRes("textures/player", cc.SpriteAtlas, function (err, atlas) {
                 var frame = atlas.getSpriteFrame('player_dao_06');
                 
                 sprite.spriteFrame = frame;
                 });
         }
    },

    tryMoveToNewTile:function(DIR){
        var mapSize = this.node.getContentSize();

        // cc.log("player mapSizew"+mapSize.width);
        // cc.log("player mapSizeh"+mapSize.height);
        // cc.log("player xxxxxxxx"+this.PlayerX);
        // cc.log("player YYYYYYY"+this.PlayerY);
        // cc.log("player halfx"+this.halfX);
        // cc.log("player halfY"+this.halfY);
        
      
        if((this.PlayerX - this.halfX) <= 0 ){
            this.PlayerX += 1;
            return;
        }
        else if((this.PlayerX + this.halfX) > mapSize.width){
            this.PlayerX -= 1;
            return;
        }
        else if((this.PlayerY- this.halfY) < 0){
            this.PlayerY += 1;
            return;
         }
        else if (this.PlayerY>= mapSize.height){
            this.PlayerY -= 1;
            return;
         }
        
        if(DIR == 1){
            this.Player.y = this.Player.y + this.speed;
        }
        else if(DIR == 2){
            this.Player.y = this.Player.y - this.speed;
        }
        else if(DIR == 3){
            this.Player.x = this.Player.x - this.speed;
        }
        else if(DIR == 4){
            this.Player.x = this.Player.x + this.speed;
        }
    },

    updateSpritePosition:function(){
        if(this.hero_Direction == 1 && this.hero_State == 2){
            this.PlayerY= this.Player.y + this.speed;
             if(this.IsBlock()){
             this.tryMoveToNewTile(1);
             }
        }
        else if(this.hero_Direction == 2 && this.hero_State == 2){
            this.PlayerY = this.Player.y - this.speed;
            if(this.IsBlock()){
             this.tryMoveToNewTile(2);
                
             }
        }
        else if(this.hero_Direction == 3 && this.hero_State == 2){
            this.PlayerX = this.Player.x - this.speed;
           if(this.IsBlock()){
            this.tryMoveToNewTile(3);
               
           }
        }
        else if(this.hero_Direction == 4 && this.hero_State == 2){
            this.PlayerX = this.Player.x + this.speed;
            if(this.IsBlock()){
                this.tryMoveToNewTile(4);

            }
        }
    },
    IsBlock:function(){
           var playerPos = cc.p(this.PlayerX,this.PlayerY);
           this.tiledPos = this.getTilePos(playerPos);
           //cc.log("playerposx:"+this.PlayerX);
           //cc.log("playerposy:"+this.PlayerY);
           
           cc.log("tiledPos:"+this.tiledPos);
           if(this.block2.getTileGIDAt(this.tiledPos)==0){
               cc.log("这不是障碍物!");
               return true;
           }         
    },
    update (dt) {
        this.updateSpiriteDIR();
        this.updateSpritePosition();
    },
});
