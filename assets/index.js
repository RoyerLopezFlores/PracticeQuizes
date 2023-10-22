





const btnComprobar = document.getElementById("btn-comprobar");
const ctnQA = document.getElementById("ctn-pregunta-respuesta");
const contendorAlternativa = document.getElementById("lista-alternativas");
const contenedorPregunta = document.getElementById("ctn-pregunta");
const contenedorFeedback = document.getElementById("ctn-feedback");

const viewQA= new ViewQA(ctnQA);
const viewButton = new ViewButtonQA(btnComprobar);
const viewFeedBack = new ViewFeedBack(contenedorFeedback); 
const inputArchivo = document.getElementById('archivo');

const manageQAs = new ManageQA(
    viewQA,viewButton,contenedorPregunta,contendorAlternativa
)
manageQAs.setManageFeedBack(viewFeedBack);

inputArchivo.addEventListener('change', function() {
    const archivo = inputArchivo.files[0]; // Obtiene el primer archivo seleccionado
    if (archivo) {
        const lector = new FileReader();

        lector.onload = function(e) {
            const contenido = e.target.result;
            
            // Muestra el contenido en un elemento <pre>
            const QAs = contenido.split("\n").reduce((prev,curr)=>{
                
                let objQA = {}
                if(prev.length > 0){
                    objQA = prev[prev.length - 1];
                }
                if("#" === curr[0]){
                    objQA = {pregunta: curr.slice(1),
                    alternativas:[]}
                    prev.push(objQA)
                }
                if(">" === curr[0]){
                    objQA['alternativas'].push({alternativa:curr.slice(1)});
                }
                if("<" === curr[0]){
                    objQA['alternativas'].push({alternativa:curr.slice(1),rpta:1});
                }
                return prev
            },[]);
            console.log(QAs);
            manageQAs.setQA(QAs);
            
        };
        lector.readAsText(archivo); // Lee el archivo como texto
    }
});


let alternativas = [
    {alternativa:"Respuesta1",rpta :1},
    {alternativa:"Respuesta2"},
    {alternativa:"Respuesta3"},
    {alternativa:"Respuesta4"}
]

contendorAlternativa.innerHTML = "";
alternativasHtml = alternativas.map(alt => {
    if(alt.rpta) return new RespuestaHtml(contendorAlternativa,alt.alternativa);
    return new AlternativaHtml(contendorAlternativa,alt.alternativa);
})


btnComprobar.onclick = () =>{
 manageQAs.alternativasHtml.forEach((ah) =>{
    //console.log(index, ah);
    const existe = ah.htmlAlternativa.classList.contains("respuesta-seleccionada");
    if(ah.respuesta && existe){
        manageQAs.isCorrect();
        return;
    }
    if(existe){
        manageQAs.isIncorrect();
        return;
    }else{
        viewButton.withoutSelection();
    }
 });  
}