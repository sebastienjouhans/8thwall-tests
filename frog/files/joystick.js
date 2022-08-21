const joystickComponent = {
    schema: {
  
    },
  
              init: function () {
          const scope = this;
  
          this.mesh = this.el.object3D;
  
          this.controls = {
                  left: false,
                  up: false,
                  right: false,
                  down: false
              };
  
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
              
              if(evt.type==="start")
              {
              }
              else if(evt.type==="end")
              {
                scope.controls = {
                  left: false,
                  up: false,
                  right: false,
                  down: false
                };
                scope.setDirection(scope.controls);
  
                scope.el.setAttribute('animation-mixer', {
                  clip: "idle",
                  loop: 'repeat',
                  crossFadeDuration: 0.4,
                });
              }
  
            }).on('move', function (evt, data) {
  
              scope.controls = {
                    left: false,
                    up: false,
                    right: false,
                    down: false
                  };
              
  
              if(data==null || data.direction==null || data.direction.angle==null || data==undefined || data.direction==undefined || data.direction.angle==undefined)
              {
                return;
              }
              
              let keyboardDirection = data.direction.angle;
  
              switch (keyboardDirection) {
                case "up":        //w
                  scope.controls.up = true;
                    break;
                case "left":        //a
                  scope.controls.left = true;
                    break;
                case "right":        //d
                  scope.controls.right = true;
                    break;
                case "down":        //s
                  scope.controls.down = true;
                    break;
                default:
                    break;
              }
  
              scope.setDirection(scope.controls);
  
            }).on('dir:up plain:up dir:left plain:left dir:down ' +
                'plain:down dir:right plain:right',
                function (evt, data) {
  
                }
            ).on('pressure', function (evt, data) {
  
            });
            
          this.direction = new THREE.Vector3(0, 0, 0);
          this.step = 0;
        },
  
        setDirection: function (controls) {
            // Either left or right, and either up or down (no jump or dive (on the Y axis), so far ...)
            var x = controls.left ? -1 : controls.right ? 1 : 0,
                y = 0,
                z = controls.up ? -1 : controls.down ? 1 : 0;
  
            this.direction.set(x, y, z);
        },
        // Process the character motions
        move: function (timeDelta) {
            // (if any)       
            if (this.direction.x !== 0 || this.direction.z !== 0) {
                // Rotate the character
                this.rotate();
                // And, only if we're not colliding with an obstacle or a wall ...
                if (this.collide()) {
                    return false;
                }
                // ... we move the character
                this.updatePosition(timeDelta);
                return true;
            }
        },
        // Rotate the character
        rotate: function () {
            // Set the direction's angle, and the difference between it and our Object3D's current rotation
            var angle = Math.atan2(this.direction.x, this.direction.z),
                difference = angle - this.mesh.rotation.y;
            // If we're doing more than a 180°
            if (Math.abs(difference) > Math.PI) {
                // We proceed to a direct 360° rotation in the opposite way
                if (difference > 0) {
                    this.mesh.rotation.y += 2 * Math.PI;
                } else {
                    this.mesh.rotation.y -= 2 * Math.PI;
                }
                // And we set a new smarter (because shorter) difference
                difference = angle - this.mesh.rotation.y;
                // In short : we make sure not to turn "left" to go "right"
            }
            // Now if we haven't reached our target angle
            if (difference !== 0) {
                // We slightly get closer to it
                this.mesh.rotation.y += difference / 4;
            }
        },
        updatePosition: function (timeDelta) {
            //player.transform.position += Movement * speed * Time.DeltaTime;
            // // We update our Object3D's position from our "direction"
            const maxForce = .05;
            var forcex = maxForce * this.direction.x;
            var forcez = maxForce * this.direction.z;
  
            forcex *= timeDelta * .02;
            forcez *= timeDelta * .02;
  
            this.el.object3D.position.x += (forcex);
            this.el.object3D.position.z += (forcez);
  
            this.el.setAttribute('animation-mixer', {
                clip: "Take 001",
                loop: 'repeat',
                crossFadeDuration: 0.4,
              });
        },
        collide: function () {
            // INSERT SOME MAGIC HERE
            return false;
        },
  
        tick: function (time, timeDelta) {
          this.move(timeDelta);
        }
  }
  
  export {joystickComponent}