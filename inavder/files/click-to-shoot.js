

export const clickToShootComponent =  {

    init: function () {
      document.body.addEventListener('mousedown', () => 
      { 
        this.el.emit('shoot'); 

        console.log(this.el.id)
      });
    }
  }
