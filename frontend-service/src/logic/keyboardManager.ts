
type CLICK_TYPES = 'keydown' | 'keyup'
const CLICK_TYPE: CLICK_TYPES = 'keydown'

export class KeyboardManager {
  constructor(
    public onArrowRight: () => void,
    public onArrowLeft: () => void,
    public onArrowUp: () => void,
    public onArrowDown: () => void,
  ) { }
  state: boolean = false;

  public stopListening() {
    window.removeEventListener(CLICK_TYPE, () => {
      console.log('stopListening')
    });
  }
  public startListening() {
    window.addEventListener(CLICK_TYPE, (e) => {

      switch (e.key) {

        case 'ArrowRight':
          this.onArrowRight()
          break;
        
        case 'ArrowLeft':
          this.onArrowLeft()
          break;

        case 'ArrowUp':
          this.onArrowUp()
          break;

        case 'ArrowDown':
          this.onArrowDown()
          break;

      }
    });
  }
}


