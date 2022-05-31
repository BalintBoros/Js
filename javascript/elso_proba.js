const table  = document.querySelector("table")
//const size   = document.querySelector("input")
const start  = document.querySelector("#start")
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('button#right');
const nemLep = document.querySelector('#noStep')
const playersInput = document.querySelector("input#jatekosok")
const kincsInput = document.querySelector("input#kincsek")
const cont   = document.querySelector("#controls")
const game   = document.querySelector("#game")
const output = document.querySelector("#aktualis")
const szabalyButton = document.querySelector('#jatek')
const szabaly = document.querySelector('#jatekszabaly')
const fejenkent = document.querySelector('#fejenkent')
let kimarad = getRandomIntInclusive(0,34)
let kimaradtI = 0
let kimaradtJ = 0
const voltMar = []
let aktivX = []
let aktivY = []
let kimaradoRotation = getRandomIntInclusive(0,3)*90
let posX 
let posY 
let players = 0
let kincs = 0
let actualPlayer = 0

szabalyButton.addEventListener('click',function()
{
    szabaly.style.display = "inline"
})

function fejenkentHandler()
{
    let txt = "Begyűjtött kincsek száma: "
    for(let i = 0; i < players; i++)
    {
        txt += figurak[i].id + ": " + figurak[i].kincsek + "\t"
    }
    //console.log(txt)
    fejenkent.innerHTML = txt
}

function handleStartClick(){
    cont.style.display = "none"
    game.style.display = "inline"
    players = playersInput.value
    kincs = kincsInput.value
    drawOriginalTable()
    fejenkentHandler()
    console.log("jatekosok: " + players + " kincsek: " + kincs)
}

start.addEventListener("click", handleStartClick)

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function drawStraight(x, y)
{    
    let size = canvas.width/9
    posX = x*size 
    posY = y*size 
    ctx.strokeStyle = 'brown'
    ctx.fillStyle = '#36454F' //grey
    ctx.strokeRect(posX,posY, size,size)
    ctx.fillRect(posX,posY, size,size)
    ctx.fillStyle = '#FBB917'  //orange
    ctx.fillRect(posX,posY+(size/3), size,size/3)
}

function drawCurve(x, y)
{    
    let size = canvas.width/9
    posX = x*size 
    posY = y*size 
    ctx.strokeStyle = 'brown'
    ctx.fillStyle = '#36454F'  //grey
    ctx.strokeRect(posX,posY, size,size)
    ctx.fillRect(posX,posY, size,size)
    ctx.fillStyle = '#FBB917' //orange
    ctx.fillRect(posX,posY+(size/3), size/2,size/3)
    ctx.fillRect(posX+(size/3),posY, size/3,size/2)
    ctx.beginPath()
    ctx.arc(posX+(size/2), posY+(size/2), size/6, 0, 2 * Math.PI)
    //ctx.stroke()
    ctx.fill()
}


function drawTriple(x, y)
{
    let size = canvas.width/9
    posX = x*size 
    posY = y*size 
    ctx.strokeStyle = 'brown'
    ctx.fillStyle = '#36454F'  //grey
    ctx.strokeRect(posX,posY, size,size)
    ctx.fillRect(posX,posY, size,size)
    ctx.fillStyle = '#FBB917' //orange
    ctx.fillRect(posX,posY+(size/3), size,size/3)
    ctx.fillRect(posX+(size/3),posY, size/3,size/2)
}

//#region originaltable
function drawOriginalTable()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let size = canvas.width/9
    for(let i = 0; i<9; i++)
    {
        for(let j = 0; j<9; j++)
        {
            if(i==0 || j == 0 || i == 8 || j == 8)
            {
                ctx.fillStyle = '#2B547E'  //kek
                ctx.fillRect(i*size,j*size, size,size)
            }
        }
    }
    drawEdges()
    //drawEdges()
    originals.forEach(o=>
    {
        let posX = 0
        let posY = 0
        //-size, ha 180 fokkal forgatjuk
        if(o.rotate == 90)
        {            
            posX = o.x*size + size
            posY = o.y*size 
            //posX =  o.x*size + size*2
            //posY = o.y*size 
            ctx.translate(posX,posY)
            ctx.rotate(o.rotate*(Math.PI/180))            
        }else if(o.rotate == 180){
            posX = o.x*size + size
            posY = o.y*size + size

            ctx.translate(posX,posY)
            ctx.rotate(Math.PI)
        }else if(o.rotate == 270){
            posX = o.x*size
            posY = o.y*size + size

            ctx.translate(posX,posY)
            ctx.rotate(o.rotate*(Math.PI/180))
        }else if(o.rotate==0){
            posX = o.x*size 
            posY = o.y*size

            ctx.translate(posX,posY)
        }
        if(o.id=="straight"){drawStraight(0,0)}
        else if(o.id=="curved"){drawCurve(0,0)}
        else if(o.id=="triple"){drawTriple(0,0)}
        ctx.rotate(-o.rotate*(Math.PI/180))
        ctx.translate(-posX,-posY)        
    })
    
    let inAktivX = [1,2,3,4,5,6,7]
    let inAktivY = [1,2,3,4,5,6,7]
    let aktivPairs = 
        [[1,2],[1,4],[1,6],
        [2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],
        [3,2],[3,4],[3,6],
        [4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],
        [5,2],[5,4],[5,6],
        [6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],
        [7,2],[7,4],[7,6]
    ]
    //const kimarad = getRandomIntInclusive(0,34)
    
    for(let i = 1; i <= 7; i++)
    {
        for(let j = 1; j <= 7; j++)
        {
            if(i % 2 == 0 || j % 2 == 0)
            {
                let ok = false
                while(!ok)
                {                        
                    let akt = getRandomIntInclusive(0,34)
                    if( !(voltMar.includes(akt)) && akt != kimarad)
                    {
                        voltMar.push(akt)
                        cells[akt].x = i
                        cells[akt].y = j
                        cells[akt].rotate = getRandomIntInclusive(0,3)*90
                        ok = true
                    }

                }
                
            }
            
            
        } 
    }   
    //#region 
    /*cells.forEach(c=>
    {
        


        
        if(c.idx!=kimarad)
        {
            index = Math.floor(Math.random()*aktivPairs.length)
            //let rand = aktivPairs[index]
            console.log(index)
            //index = aktivPairs.findIndex(rand)
            pair = 
            c.x =aktivPairs[index].shift
            c.y = aktivPairs[index].pop
            c.rotate = getRandomIntInclusive(0,3)*90

            aktivPairs.splice(index,1)
        }*/
        /*
        let kesz = false
        if(c.idx!=kimarad)
        {
            while(!kesz)
            {
                //lehet, hogy van olyan eset, amikor nem fut ki a while-ból
                let randX = getRandomIntInclusive(1,7)
                let randY = getRandomIntInclusive(1,7)
                if(randX % 2 == 0 || randY % 2 == 0) 
                {                    
                    if(!aktivX.includes(randX) || !aktivY.includes(randY))
                    {
                        c.x = randX
                        c.y = randY
                        
                        c.rotate = getRandomIntInclusive(0,3)*90 
                        kesz = false
                    }                                        
                }
            } 
        }  
        aktivX.push(randX)
        aktivY.push(randY)
    })   */
    //#endregion
    cells.forEach(c=>
    {
        if(c.idx!=kimarad)
        {
            let posX = 0
            let posY = 0
            if(c.rotate == 90)
            {            
                posX = c.x*size + size
                posY = c.y*size 
                //posX =  o.x*size + size*2
                //posY = o.y*size 
                ctx.translate(posX,posY)
                ctx.rotate(c.rotate*(Math.PI/180))            
            }else if(c.rotate == 180){
                posX = c.x*size + size
                posY = c.y*size + size

                ctx.translate(posX,posY)
                ctx.rotate(Math.PI)
            }else if(c.rotate == 270){
                posX = c.x*size
                posY = c.y*size + size

                ctx.translate(posX,posY)
                ctx.rotate(c.rotate*(Math.PI/180))
            }else if(c.rotate==0){
                posX = c.x*size 
                posY = c.y*size

                ctx.translate(posX,posY)
            }
            if(c.id=="straight"){drawStraight(0,0)}
            else if(c.id=="curved"){drawCurve(0,0)}
            else if(c.id=="triple"){drawTriple(0,0)}
            ctx.rotate(-c.rotate*(Math.PI/180))
            ctx.translate(-posX,-posY)
        }        
    })
    setDoors()
    drawKimarado(8,8) 
    drawPlayers()   
    drawKincsek()
}
//#endregion

function setDoors()
{
    cells.forEach(c=>
    {
        if(c.id=="straight")
        {
            if(c.rotate==0 || c.rotate ==180) {c.doors = [2,4]}
            else if(c.rotate==90 || c.rotate ==270) {c.doors = [1,3]}
        }
        else if(c.id=="curved")
        {
            if(c.rotate==0){c.doors=[2,3]}
            else if(c.rotate==90){c.doors=[3,4]}
            else if(c.rotate==180){c.doors=[1,4]}
            else if(c.rotate==270){c.doors=[1,2]}
        }
        else if(c.id=="triple")
        {
            if(c.rotate==0){c.doors=[2,3,4]}
            else if(c.rotate==90){c.doors=[1,3,4]}
            else if(c.rotate==180){c.doors=[1,2,4]}
            else if(c.rotate==270){c.doors=[1,2,3]}
        }
        //console.log(c.doors + " (" + c.x + ", " + c.y + ") ")
    })
}

function drawKimarado(i,j)
{
    
    let posX = 0
    let posY = 0
    kimaradtI = i
    kimaradtJ = j
    let size = canvas.width/9
    cells[kimarad].x = i
    cells[kimarad].y = j
    cells[kimarad].rotate = kimaradoRotation
    if(cells[kimarad].rotate == 90)
    {
        posX = cells[kimarad].x*size + size
        posY = cells[kimarad].y*size 
        //posX =  o.x*size + size*2
        //posY = o.y*size 
        ctx.translate(posX,posY)
        ctx.rotate(cells[kimarad].rotate*(Math.PI/180))            
    }else if(cells[kimarad].rotate == 180){
        posX = cells[kimarad].x*size + size
        posY = cells[kimarad].y*size + size

        ctx.translate(posX,posY)
        ctx.rotate(Math.PI)
    }else if(cells[kimarad].rotate == 270){
        posX = cells[kimarad].x*size
        posY = cells[kimarad].y*size + size

        ctx.translate(posX,posY)
        ctx.rotate(cells[kimarad].rotate*(Math.PI/180))
    }else if(cells[kimarad].rotate==0){
        posX = cells[kimarad].x*size 
        posY = cells[kimarad].y*size

        ctx.translate(posX,posY)
    }
    if(cells[kimarad].id=="straight"){drawStraight(0,0)}
    else if(cells[kimarad].id=="curved"){drawCurve(0,0)}
    else if(cells[kimarad].id=="triple"){drawTriple(0,0)}
    ctx.rotate(-cells[kimarad].rotate*(Math.PI/180))
    ctx.translate(-posX,-posY)
    setDoors()
    
}
//drawOriginalTable()
//drawKimarado(8,8, kimaradoRotation)

rightButton.addEventListener('click', function ()
{
    clearKimarad(kimaradtI,kimaradtJ)
    let akt = cells[kimarad].rotate
    
    kimaradoRotation = akt + 90 < 360 ? akt + 90 : 0
    cells[kimarad].rotate = kimaradoRotation
    draw()
    setDoors()
    //drawKimarado(8,8)
    //console.log(kimaradoRotation)

});

leftButton.addEventListener('click', function ()
{
    clearKimarad(kimaradtI,kimaradtJ)
    let akt = cells[kimarad].rotate
    
    kimaradoRotation = akt - 90 >= 0 ? akt - 90 : 270 
    cells[kimarad].rotate = kimaradoRotation
    draw()
    setDoors()
    //drawKimarado(8,8)
    //console.log(kimaradoRotation)

});

nemLep.addEventListener('click',function()
{
    actualPlayer = actualPlayer+1<players ? actualPlayer+1 : 0
    output.innerHTML = "Az aktuális játékos: " + figurak[actualPlayer].id
})

///////////////////////////////////////////////////////////////////////////////////
//Function to get the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

//var canvas = document.getElementById('myCanvas');
//var context = canvas.getContext('2d');
//The rectangle should have x,y,width,height properties
//#region rectek itt vannak

let s = canvas.width/9
var rect1 = {
    x:s*6,
    y:s*8,
    width:s,
    height:s
};
var rect2 = {
    x:s*4,
    y:s*8,
    width:s,
    height:s
};
var rect3 = {
    x:s*2,
    y:s*8,
    width:s,
    height:s
};
var rect4 = {
    x:s*0,
    y:s*6,
    width:s,
    height:s
};
var rect5 = {
    x:s*0,
    y:s*4,
    width:s,
    height:s
};
var rect6 = {
    x:s*0,
    y:s*2,
    width:s,
    height:s
};
var rect7 = {
    x:s*2,
    y:s*0,
    width:s,
    height:s
};
var rect8 = {
    x:s*4,
    y:s*0,
    width:s,
    height:s
};
var rect9 = {
    x:s*6,
    y:s*0,
    width:s,
    height:s
};
var rect10 = {
    x:s*8,
    y:s*2,
    width:s,
    height:s
};
var rect11 = {
    x:s*8,
    y:s*4,
    width:s,
    height:s
};
var rect12 = {
    x:s*8,
    y:s*6,
    width:s,
    height:s
};

//#endregion
let tmpX = 0
let tmpY = 0
let tmpIdx = 0


function eltolas(rect)
{    
        
    cells.forEach(c => 
    {       
                           
        if(rect==1)
        {            
            if(c.x==6)
            {         
                //for(let f of figurak){if(f.x == 6){f.y-=1 }}                                      
                c.y-=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 6
                c.y = 7
            } 
        }
        else if(rect==2)
        {
            if(c.x==4)
            {
                //for(let f of figurak){if(f.x == 4){f.y-=1 }}                
                c.y-=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 4
                c.y = 7
            } 
        }
        else if(rect==3)
        {
            if(c.x==2)
            {
                //for(let f of figurak){if(f.x == 2){f.y-=1 }}                
                c.y-=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 2
                c.y = 7
            } 
        }
        else if(rect==4)
        {
            if(c.y==6)
            {
                //for(let f of figurak){if(f.y == 6){f.x+=1 }}                
                c.x+=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 1
                c.y = 6
            } 
        }
        else if(rect==5)
        {
            if(c.y==4)
            {
                //for(let f of figurak){if(f.y == 4){f.x+=1 }}                
                c.x+=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 1
                c.y = 4
            } 
        }
        else if(rect==6)
        {
            if(c.y==2)
            {
                //for(let f of figurak){if(f.y == 2){f.x+=1 }}                
                c.x+=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 1
                c.y = 2
            } 
        }
        
        else if(rect==7)
        {
            if(c.x==2)
            {
                //for(let f of figurak){if(f.x == 2){f.y+=1 }}                
                c.y+=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 2
                c.y = 1
            } 
        }
        else if(rect==8)
        {
            if(c.x==4)
            {
                //for(let f of figurak){if(f.x == 4){f.y+=1 }}                
                c.y+=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 4
                c.y = 1
            } 
        }
        else if(rect==9)
        {
            if(c.x==6)
            {
                //for(let f of figurak){if(f.x == 6){f.y+=1 }}                
                c.y+=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 6
                c.y = 1
            } 
        }
        else if(rect==10)
        {
            if(c.y==2)
            {
                //for(let f of figurak){if(f.y == 2){f.x-=1 }}                
                c.x-=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 7
                c.y = 2
            } 
        }
        else if(rect==11)
        {
            if(c.y==4)
            {
                //for(let f of figurak){if(f.y == 4){f.x-=1 }}                
                c.x-=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 7
                c.y = 4
            } 
        }
        else if(rect==12)
        {
            if(c.y==6)
            {
                //for(let f of figurak){if(f.y == 6){f.x-=1 }}
                c.x-=1                                           
            }
            if(c.idx==kimarad)
            {
                tmpX = c.x
                tmpY = c.y
                c.x = 7
                c.y = 6
            } 
        }    
        /*for(let f of figurak)
        {
            if(f.x==0){f.x = 7}
            else if(f.x==8){f.x = 1}
            if(f.y==0){f.y = 7}
            else if(f.y == 8){f.y = 1}
        }*/
    })
    figurak.forEach(f=>
    {
        if(rect==1)
        {            
            if(f.x == 6){f.y-=1 }                                      
        }
        else if(rect==2)
        {
            if(f.x == 4){f.y-=1 }
        }
        else if(rect==3)
        {
            if(f.x == 2){f.y-=1 }
        }
        else if(rect==4)
        {
           if(f.y == 6){f.x+=1 }
        }
        else if(rect==5)
        {
            if(f.y == 4){f.x+=1 }
        }
        else if(rect==6)
        {
            if(f.y == 2){f.x+=1 }
        }        
        else if(rect==7)
        {
            if(f.x == 2){f.y+=1 }
        }
        else if(rect==8)
        {
            if(f.x == 4){f.y+=1 }
        }
        else if(rect==9)
        {
            if(f.x == 6){f.y+=1 }
        }
        else if(rect==10)
        {
            if(f.y == 2){f.x-=1 }
        }
        else if(rect==11)
        {
            if(f.y == 4){f.x-=1 } 
        }
        else if(rect==12)
        {
           if(f.y == 6){f.x-=1 }
        }    

        if(f.x==0){f.x = 7}
        else if(f.x==8){f.x = 1}
        if(f.y==0){f.y = 7}
        else if(f.y == 8){f.y = 1}
    
    })
    kincsek.forEach(k=>
    {
        if(rect==1)
        {            
            if(k.x == 6){k.y-=1 }   
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 6
                k.y = 7
            }                                   
        }
        else if(rect==2)
        {
            if(k.x == 4){k.y-=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 4
                k.y = 7
            } 
        }
        else if(rect==3)
        {
            if(k.x == 2){k.y-=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 2
                k.y = 7
            } 
        }
        else if(rect==4)
        {
            if(k.y == 6){k.x+=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 1
                k.y = 6
            } 
        }
        else if(rect==5)
        {
            if(k.y == 4){k.x+=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 1
                k.y = 4
            } 
        }
        else if(rect==6)
        {
            if(k.y == 2){k.x+=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 1
                k.y = 2
            } 
        }        
        else if(rect==7)
        {
            if(k.x == 2){k.y+=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 2
                k.y = 1
            } 
        }
        else if(rect==8)
        {
            if(k.x == 4){k.y+=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 4
                k.y = 1
            } 
        }
        else if(rect==9)
        {
            if(k.x == 6){k.y+=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 6
                k.y = 1
            } 
        }
        else if(rect==10)
        {
            if(k.y == 2){k.x-=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 7
                k.y = 2
            } 
        }
        else if(rect==11)
        {
            if(k.y == 4){k.x-=1 } 
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 7
                k.y = 4
            } 
        }
        else if(rect==12)
        {
            if(k.y == 6){k.x-=1 }
            if(k.x == cells[kimarad].x && k.y == cells[kimarad].y)
            {
                k.x = 7
                k.y = 6
            } 
        }    
        if(k.x==-1){k.x = 7}
        else if(k.x==9){k.x = 1}
        if(k.y==-1){k.y = 7}
        else if(k.y == 9){k.y = 1}        
    })
    
    draw()
    cells.forEach(c => 
    {
        if(c.x == 0 || c.y == 0 || c.x == 8 || c.y == 8) {kimarad = c.idx}
    })  

}
//Binding the click event on the canvas
canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos,rect1)) {
        eltolas(1)
        console.log('clicked inside rect 1');
    }else if(isInside(mousePos,rect2)){
        eltolas(2)
        console.log('clicked inside rect 2');
    }else if(isInside(mousePos,rect3)){
        eltolas(3)
        console.log('clicked inside rect 3');
    }else if(isInside(mousePos,rect4)){
        eltolas(4)
        console.log('clicked inside rect 4');
    }else if(isInside(mousePos,rect5)){
        eltolas(5)
        console.log('clicked inside rect 5');
    }else if(isInside(mousePos,rect6)){
        eltolas(6)
        console.log('clicked inside rect 6');
    }else if(isInside(mousePos,rect7)){
        eltolas(7)
        console.log('clicked inside rect 7');
    }else if(isInside(mousePos,rect8)){
        eltolas(8)
        console.log('clicked inside rect 8');
    }else if(isInside(mousePos,rect9)){
        eltolas(9)
        console.log('clicked inside rect 9');
    }else if(isInside(mousePos,rect10)){
        eltolas(10)
        console.log('clicked inside rect 10');
    }else if(isInside(mousePos,rect11)){
        eltolas(11)
        console.log('clicked inside rect 11');
    }else if(isInside(mousePos,rect12)){
        eltolas(12)
        console.log('clicked inside rect 12');
    }else{
        lepes(mousePos.x, mousePos.y)
        console.log('clicked outside rect');
    }   
}, false);

///////////////////////////////////////////////////////////////////////////////////////


function clearKimarad(i,j)
{
    ctx.clearRect(i, j, i + s, j + s)
}

function drawEdges()
{
    /*ctx.clearRect(0, 0, canvas.width, s)
    ctx.clearRect(0, 0, s, canvas.height)
    ctx.clearRect(canvas.width-s, 0, canvas.width, canvas.height)
    ctx.clearRect(0, canvas.height-s, canvas.width, canvas.height)*/
    let size = canvas.width/9
    for(let i = 0; i<9; i++)
    {
        for(let j = 0; j<9; j++)
        {
            if(i==0 || j == 0 || i == 8 || j == 8)
            {
                ctx.fillStyle = '#2B547E'  //kek
                ctx.fillRect(i*size,j*size, size,size)
                
            }
        }
    }
    triangles.forEach(t=>
    {      
        let size = canvas.width/9
        let posX = 0
        let posY = 0
        if(t.rotate == 90)
        {            
            posX = t.x*size + size
            posY = t.y*size 
            //posX =  o.x*size + size*2
            //posY = o.y*size 
            ctx.translate(posX,posY)
            ctx.rotate(t.rotate*(Math.PI/180))            
        }else if(t.rotate == 180){
            posX = t.x*size + size
            posY = t.y*size + size

            ctx.translate(posX,posY)
            ctx.rotate(Math.PI)
        }else if(t.rotate == 270){
            posX = t.x*size
            posY = t.y*size + size

            ctx.translate(posX,posY)
            ctx.rotate(t.rotate*(Math.PI/180))
        }else if(t.rotate==0){
            posX = t.x*size 
            posY = t.y*size

            ctx.translate(posX,posY)
        }
        drawTriangle(0,0)
        ctx.rotate(-t.rotate*(Math.PI/180))
        ctx.translate(-posX,-posY)
    })
}

function drawTriangle(i,j)
{
    let s = canvas.width/9
    posX = i*s + (s/3) 
    posY = j*s + 2*(s/3) 
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    ctx.beginPath()   
    ctx.moveTo(posX,posY)
    ctx.lineTo(i*s + s/2,j*s + s/3)
    ctx.lineTo(i*s + 2*(s/3),posY)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

}

function draw()
{
    
    drawEdges()
    ctx.clearRect(s, s, canvas.width-s*2, canvas.height-s*2)
    cells.forEach(c=>
    {      
        let size = canvas.width/9
        let posX = 0
        let posY = 0
        if(c.rotate == 90)
        {            
            posX = c.x*size + size
            posY = c.y*size 
            //posX =  o.x*size + size*2
            //posY = o.y*size 
            ctx.translate(posX,posY)
            ctx.rotate(c.rotate*(Math.PI/180))            
        }else if(c.rotate == 180){
            posX = c.x*size + size
            posY = c.y*size + size

            ctx.translate(posX,posY)
            ctx.rotate(Math.PI)
        }else if(c.rotate == 270){
            posX = c.x*size
            posY = c.y*size + size

            ctx.translate(posX,posY)
            ctx.rotate(c.rotate*(Math.PI/180))
        }else if(c.rotate==0){
            posX = c.x*size 
            posY = c.y*size

            ctx.translate(posX,posY)
        }
        if(c.id=="straight"){drawStraight(0,0)}
        else if(c.id=="curved"){drawCurve(0,0)}
        else if(c.id=="triple"){drawTriple(0,0)}
        ctx.rotate(-c.rotate*(Math.PI/180))
        ctx.translate(-posX,-posY)
        
               
    })
    setDoors()
    drawPlayers()
    drawKincsek()
}

////// figurák es kincsek //////

const piros = document.createElement('img')
piros.src = 'piros.png'
piros.addEventListener('load', drawPlayers)

const piros_kincs = document.createElement('img')
piros_kincs.src = 'piros_kincs.png'
piros_kincs.addEventListener('load', drawPlayers)

const kek = document.createElement('img')
kek.src = 'kek.png'
kek.addEventListener('load', drawPlayers)

const kek_kincs = document.createElement('img')
kek_kincs.src = 'kek_kincs.png'
kek_kincs.addEventListener('load', drawPlayers)

const zold = document.createElement('img')
zold.src = 'zold.png'
zold.addEventListener('load', drawPlayers)

const zold_kincs = document.createElement('img')
zold_kincs.src = 'zold_kincs.png'
zold_kincs.addEventListener('load', drawPlayers)

const lila = document.createElement('img')
lila.src = 'lila.png'
lila.addEventListener('load', drawPlayers)

const lila_kincs = document.createElement('img')
lila_kincs.src = 'lila_kincs.png'
lila_kincs.addEventListener('load', drawPlayers)

let voltMar2 = [35, 38, 47]

function drawKincsek()
{
    let size = canvas.width/9    

    for(let k = 0; k < players; k++)
    {
        let i = kincsek[k].x 
        let j = kincsek[k].y
        if(kincsek[k].found==true)
        {            
            let ok = false                        
             
            while(!ok)
            {       
                let idx1 = getRandomIntInclusive(1, 49)
                //voltMar2.push(idx1)
                i = cells[idx1].x
                j = cells[idx1].y 
                

                if( !(voltMar2.includes(idx1)) && idx1 != kimarad)
                {
                    voltMar2.push(idx1)
                    kincsek[k].x = i
                    kincsek[k].y = j
                    ok = true
                    kincsek[k].found = false
                } 

            } 
            if(kincsek[k].id == "piros") ctx.drawImage(piros_kincs,i* size,j* size,size/2,size/2)
            else if(kincsek[k].id == "kek") ctx.drawImage(kek_kincs,i* size,(j* size)+size/2,size/2,size/2)
            else if(kincsek[k].id == "zold") ctx.drawImage(zold_kincs,i* size+size/2,j* size,size/2,size/2)
            else if(kincsek[k].id == "lila") ctx.drawImage(lila_kincs,i* size+size/2,j* size+size/2,size/2,size/2)
        
        
        } else{
            if(kincsek[k].id == "piros") ctx.drawImage(piros_kincs,i* size,j* size,size/2,size/2)
            else if(kincsek[k].id == "kek") ctx.drawImage(kek_kincs,i* size,(j* size)+size/2,size/2,size/2)
            else if(kincsek[k].id == "zold") ctx.drawImage(zold_kincs,i* size+size/2,j* size,size/2,size/2)
            else if(kincsek[k].id == "lila") ctx.drawImage(lila_kincs,i* size+size/2,j* size+size/2,size/2,size/2)
        }                         

        
    }    
}

function drawPlayers()
{    
    //console.log("játékos rajzolása jönne")
    let size = canvas.width/9
    for(let k = 0; k < players; k++)
    {
        let i = figurak[k].x*size
        let j = figurak[k].y*size

        if(figurak[k].id == "piros") ctx.drawImage(piros,i,j,size/2,size/2)
        else if(figurak[k].id == "kek") ctx.drawImage(kek,i,j+size/2,size/2,size/2)
        else if(figurak[k].id == "zold") ctx.drawImage(zold,i+size/2,j,size/2,size/2)
        else if(figurak[k].id == "lila") ctx.drawImage(lila,i+size/2,j+size/2,size/2,size/2)
    }
}

s = canvas.width/9
var rect = {
    x:s,
    y:s*8,
    width:s,
    height:s
};
/*
canvas.addEventListener('click', function(evt) 
{
    var mousePos = getMousePos(canvas, evt);
       
    lepes(mousePos.x, mousePos.y)
})*/

function lepes(i,j)
{
    let lepett = false
    s = canvas.width/9
    posX = Math.floor(i/s)
    posY = Math.floor(j/s)
    console.log(posY)
    if(posX > 0 && posX < 8 && posY > 0 && posY < 8)
    {
        let plX = figurak[actualPlayer].x
        let plY = figurak[actualPlayer].y
        if((plX-posX==1 || plX-posX==-1 || plX-posX == 0) && (plY-posY==1 || plY-posY==-1 || plY-posY==0))
        {
            let count = 0
            let honnan = 0
            let hova = 0
            while((honnan==0 || hova == 0) && count < 50)
            {
                if(cells[count].x == plX && cells[count].y == plY){honnan = count}
                if(cells[count].x == posX && cells[count].y == posY){hova = count}
                count++
                
            }
            console.log(honnan + " " + hova)
            //for (let n = 0; n < cells[honnan].doors.length; n++)
            for(let d1 of cells[honnan].doors)
            {
                console.log("honnan: " + d1+ " rotációja: " + cells[honnan].rotate)
                //for(let m = 0; m < cells[hova].doors.length; m++)
                for(let d2 of cells[hova].doors)
                {
                    console.log("hova: " + d2 + " rotációja: " + cells[hova].rotate)
                    if(plX == posX && (plY-posY==1 || plY-posY==-1))
                    {
                        if(d1==1 && d2 == 3 && plY < posY)
                        {
                            figurak[actualPlayer].x = posX
                            figurak[actualPlayer].y = posY
                            lepett = true
                            checkMatch()
                        }
                        else if(d1==3 && d2 == 1 && plY > posY)
                        {
                            figurak[actualPlayer].x = posX
                            figurak[actualPlayer].y = posY
                            lepett = true
                            checkMatch()
                        }                        
                    }
                    if(plY == posY && (plX-posX==1 || plX-posX==-1))
                    {
                        if(d1==4 && d2 == 2 && plX < posX)
                        {
                            figurak[actualPlayer].x = posX
                            figurak[actualPlayer].y = posY
                            lepett = true
                            checkMatch()
                        }
                        else if(d1==2 && d2 == 4 && plX > posX)
                        {
                            figurak[actualPlayer].x = posX
                            figurak[actualPlayer].y = posY
                            lepett = true
                            checkMatch()
                        }
                    }
                }
            }
        }        
    }
    draw()

    if(lepett)
    {
        let szam = actualPlayer+1 < players ? actualPlayer+1 : 0
        actualPlayer = szam 
    }
    setActual()
    fejenkentHandler()

}

function checkMatch()
{
    s = canvas.width/9
    //posX = Math.floor(i/s)
    //posY = Math.floor(j/s)
    kincsek.forEach(k => 
    {
        if(k.x == figurak[actualPlayer].x && k.y == figurak[actualPlayer].y && k.id == figurak[actualPlayer].id)
        {
            figurak[actualPlayer].kincsek++
            k.found = true
        }
    })
    checkWinner()
}

function checkWinner()
{
    figurak.forEach(f=>
    {
        if(f.kincsek==kincs)
        {
            alert("A győztes játékos: " + figurak[actualPlayer].id);
        }
    })
}

function setActual()
{
    output.innerText = `Az aktuális játékos: ${figurak[actualPlayer].id}`
}


