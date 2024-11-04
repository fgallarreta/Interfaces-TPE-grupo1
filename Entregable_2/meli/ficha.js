class ficha{

    constructor (posX,posY,fill, context){
        this.cxt=context;
        this.fill=fill;
        this.posX=posX;
        this.posY=posY;
        this.resaltado=false;
        this.resaltadoEstilo='red';
    };

getPosition(){
return{
    x:this.getPosX(),
    y:this.getPosY()
};

}
getPosX(){
    return this.posX;
}
getPosY(){
    return this.posY;
}


}