let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
// Cria a posição inicial da cobrinha //
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
//********************************//
// Criando a comida //
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//******************* */
var contador = 0;





function criarBG(){
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "gray";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Criando o Drop de comida //
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}
//*********************** */

//Criando a Pontuação //
function contaPontos(){
    pontos = document.getElementById("pontos");
    pontos.innerHTML = "Score: " + contador;
}
//******************** */

// Função para "ouvir" as teclas que estão sendo tecladas //
document.addEventListener('keydown', update);
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}
//************************* */


function iniciarJogo(){
    // Ao tocar no final da tela reinicia do outro lado //
    if(snake[0].x > 16 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 16 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    //************************* */

    //Finaliza o jogo ao tocar no corpo //
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over! \n Seu score foi: " + contador + "\n Parabens!");
            //Recarrega a Página automaticamente//
            location.reload();
        }
    }
    //******************************** */

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;
    
    // Responsável por criar o efeito de movimento //
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Responsável por Adicionar tamanho ao comer//
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        contador++;
        contaPontos(); 
    }
    //*************** */

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    // *************************************** //

}
   
// Atualiza constantemente a tela executando todos os comandos, quanto menor o número maior a "velocidade de movimento" //
    let jogo = setInterval(iniciarJogo, 100);