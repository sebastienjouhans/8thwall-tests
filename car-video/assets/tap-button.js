export const tapButtonComponent = {
    schema: {
      videoId: {type: 'string'},
      videoEntityId: {type: 'string'},
      otherVideoEntityId: {type: 'string'},
    },
    init() {
      const video = document.querySelector(this.data.videoId)
      const videoEntity = document.querySelector(this.data.videoEntityId)
      const otherVideoEntityId = document.querySelector(this.data.otherVideoEntityId)
      let tapped = false;
  
  
      this.el.addEventListener('click', (event) => {
        videoEntity.setAttribute('visible', 'true')
      
        if (!tapped) {
  
          tapped = true;
          
          video.play()
          otherVideoEntityId.pause()
          otherVideoEntityId.setAttribute('visible', 'false')
        }
        else
        {
          tapped = false;
          video.pause()
        }
      })
    },
  }