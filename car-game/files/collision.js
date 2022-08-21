const collisionComponent = {
    schema: {
  
    },
  
    init () {
      const scope = this;
  
      let didCollide = false;
  
      console.log("hello")
  
      this.el.addEventListener('collide', (e) => {
        if (didCollide || e.detail.body.el.id !== 'car-model') {
          return
        }
        didCollide = true;
        scope.el.parentElement.removeChild(scope.el);
        console.log(scope.el)
      })
    },
  }
  
  export {collisionComponent}