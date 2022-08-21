

      /**
       * Change color when hit.
       */
       export const hitHandlerComponent = {
        // dependencies: ['material'],
  
        init: function () {
          const el = this.el;
  
          //el.addEventListener('hit', () => {
            // color.addScalar(0.05);
            // el.components.material.material.color.copy(color);
          //});
  
          el.addEventListener('die', () => {
            console.log(el);
            el.parentNode.removeChild(el);
          });
        }
      }