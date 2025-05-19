
type CLICK_TYPES = 'keydown' | 'keyup'
const CLICK_TYPE: CLICK_TYPES = 'keydown'

export class KeyboardManager {
  constructor(
    public onArrowRight: () => void,
    public onArrowLeft: () => void,
    public onArrowUp: () => void,
    public onArrowDown: () => void,
    public onSpace: () => void,
    public onQ: () => void,
    public onW: () => void,
    public onE: () => void,
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
  
        case ' ':
          this.onSpace()
          break;

        case 'q':
          this.onQ()
          break;

        case 'w':
          this.onW()
          break;

        case 'e':
          this.onE()
          break;

      }
    });
  }
}


