const aleatorizarArray = (array)=>{
    for(let i= 0; i<array.length;i++){
        const j = Math.floor(Math.random()*(array.length));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
class Contenido{
    constructor(pregunta=""){
        this.pregunta = pregunta
    }
    setContent(pregunta){
        this.pregunta = pregunta
    }
    getContent(){
        return this.pregunta
    }
}
class PreguntaHtml{
    constructor(contenedor){
        this.contenedor = contenedor
        this.pregunta = new Contenido();
    }
    changeQuestion(pregunta){
        this.pregunta.setContent(pregunta);
        this.contenedor.innerHTML = pregunta;
    }
}
class ViewQA{
    constructor(contenedor){
        this.contenedor = contenedor;
        this.getColor();
        this.timeout = null
    }
    getColor(){
        const divStyle = window.getComputedStyle(this.contenedor);
        this.color = divStyle.backgroundColor;
    }
    revertirColor(time){
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>{
            this.contenedor.style.backgroundColor = this.color;
        },time);
    }
    isIncorrect(){
        this.contenedor.style.backgroundColor = "red";
        this.revertirColor(500);
        
    }
    isCorrect(){
        this.contenedor.style.backgroundColor = "green";
        this.revertirColor(500);
    }
}
class ViewButtonQA{
    constructor(btn){
        this.button = btn;
        this.finishQA();
    }
    isIncorrect(){
        this.button.textContent = "Vuelve a intentarlo";
    }
    isCorrect(){
        this.button.textContent = "Comprobar";
    }
    withoutSelection(){
        
    }
    inciarQA(){
        this.button.disabled = false;
    }
    finishQA(){
        this.button.disabled = true;
    }
}
class ViewFeedBack{
    constructor(contenedor){
        this.contenedor = contenedor;
    }
    finishQA(preguntas,intentos){
        this.contenedor.innerHTML = `Preguntas: ${preguntas} 
        \t Intentos: ${intentos} <br> Termino el quizz`
    }
    clean(){
        this.contenedor.innerHTML = "";
    }
    setText(text){
        this.contenedor.innerHTML = text;
    }
}
class ManageQA{
    constructor(manageQA,manageButton,
        ctnQuestion,ctnAnswers){
        this.manageQA = manageQA;
        this.manageButton = manageButton;
        this.QAs = [];
        this.ctnQuestion = ctnQuestion;
        this.ctnAnswers = ctnAnswers;
        this.indexQuestion = 0;
        this.intentos = 0;
        this.manageFeedback = null;
        this.inciar();
    }
    setManageFeedBack(manageFeedback){
        this.manageFeedback = manageFeedback;
        this.manageFeedback.clean();
    }
    finishQA(){
        if(!this.manageFeedback) return
        this.manageFeedback.finishQA(this.indexQuestion,this.intentos);
        this.manageButton.finishQA();
    }
    inciar(){
        this.preguntaHtml = new PreguntaHtml(this.ctnQuestion);
        this.preguntaHtml.changeQuestion("Pregunta");
    }
    getQuestion(){
        if(this.QAs.length == 0) return null;
        if(this.QAs.length <= this.indexQuestion){
            this.finishQA()
            return null;
        }
        return this.QAs[this.indexQuestion]
    }
    nextQuestion(){
        this.indexQuestion++;
        return this.getQuestion()
    }
    renderQuestion(){
        const {pregunta,alternativas} = this.getQuestion();
        this.preguntaHtml.changeQuestion(pregunta);
        this.ctnAnswers.innerHTML = "";
        aleatorizarArray(alternativas);
        this.alternativasHtml = alternativas.map(alt=>{
            if(alt.rpta) return new RespuestaHtml(this.ctnAnswers,alt.alternativa);
            return new AlternativaHtml(this.ctnAnswers,alt.alternativa);
        });
        actualizarAlternativasDOM();
    }
    isCorrect(){
        this.intentos++;
        this.manageButton.isCorrect();
        this.manageQA.isCorrect();
        this.nextQuestion();
        
        if(this.indexQuestion == this.QAs.length) return
        this.renderQuestion();
    }
    isIncorrect(){
        this.intentos++;
        this.manageButton.isIncorrect();
        this.manageQA.isIncorrect();
    }
    setQA(qas){
        this.indexQuestion = 0;
        aleatorizarArray(qas);
        this.QAs = qas;
        this.manageButton.inciarQA();
        console.log(this.getQuestion());
        this.renderQuestion();
        if(!this.manageFeedback){
            this.manageFeedback.clean();
        }
    }
    setQAFile(file){
        
    }
    
}