const joystickComponent = {
    schema: {
  
    },
  
    init () {
      const scope = this;
    
      const joystickL = nipplejs.create({
            zone: document.getElementById('joystick'),
            mode: 'static',
            position: { left: '50%', top: '50%' },
            color: 'green',
            size: 125,
            lockX: false,
            lockY: false
      })
      joystickL.on('start end', function (evt, data) {
  
        if(evt.type==="end")
        {
          scope.forward = 0;
          scope.turn = 0;
        }
  
      }).on('move', function (evt, data) {
  
        scope.forward = data.vector.y;
        scope.turn = -data.vector.x;
  
      }).on('dir:up plain:up dir:left plain:left dir:down ' +
          'plain:down dir:right plain:right',
          function (evt, data) {
  
      }).on('pressure', function (evt, data) {
  
      });
      this.forward = 0;
      this.turn = 0;
    },
  
    tick (time, timeDelta) {
      const maxSteerVal = 0.01
      const maxForce = 0.02
      
      let force = maxForce * this.forward;
      let steer = maxSteerVal * this.turn;
  
      force *= timeDelta * .1
      steer *= timeDelta * .1
  
      if (this.forward!=0){
        this.el.object3D.translateX(force);
        this.el.object3D.rotateY(steer);
        this.el.setAttribute('animation-mixer', {
          clip: "Take 001",
          loop: 'repeat',
          crossFadeDuration: 0.4,
        })
      }else{
        this.el.setAttribute('animation-mixer', {
          clip: "idle",
          crossFadeDuration: 0.4,
        })
      } 
    }
  }
  
  export {joystickComponent}