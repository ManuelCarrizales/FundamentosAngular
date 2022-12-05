import { Component, OnInit, Input, Output, EventEmitter, OnChanges , AfterViewInit, OnDestroy, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit,OnDestroy{
  img: string = ''
  @Input('img') set changeImg(newImg:string){
    this.img = newImg;
    console.log('change just img', this.img);
    //code
  };
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault ='./assets/images/dragonobsidiana.jpg';
  counter = 0;
  counterFn: number | undefined;
  constructor() {
    //before render
    //No async -- once time
    console.log('constructor','imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
      //Before Render
      //Cambios en los inputs -- Many Times
      console.log('ngOnChanges','imgValue =>', this.img);
      console.log('changes',changes);
  }
  ngOnInit(): void{
    //Before Render
    //Async - Fecth - Promise - APIs - Once time
    console.log('ngOnInit','imgValue =>', this.img);
    // this.counterFn = window.setInterval(() =>{
    //   this.counter += 1;
    //   console.log('run counter')
    // }, 1000);
  }

  ngAfterViewInit(): void{
    //after render
    //handler children - directivas
    console.log('AfterViewInit');
  }

  ngOnDestroy():void{
    //Delete render
    console.log('ngOnDestroy');
    window.clearInterval(this.counterFn);
  }

  imgError(){
    this.img = this.imageDefault;
  }
  imgLoad(){
    console.log('Log hijo');
    this.loaded.emit(this.img);
  }
}
