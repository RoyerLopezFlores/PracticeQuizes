class AlternativaHtml{
    constructor(contenedor,contenido){
        this.contenedor = contenedor;
        
        this.contenido = new Contenido(contenido);
        //console.log(this.contenido);
        this.createHtml()
    }
    createHtml(){
        const htmlAlternativa = document.createElement("li");
        htmlAlternativa.className = "respuesta";
        htmlAlternativa.innerHTML = this.contenido.getContent();
        this.contenedor.appendChild(htmlAlternativa);
        this.htmlAlternativa = htmlAlternativa;
    }
    changeAlternativa(alternativa){
        this.contenido.setContent(alternativa);
        this.htmlAlternativa.className = "respuesta";
        this.htmlAlternativa.innerHTML = alternativa;
    }
}
class RespuestaHtml extends AlternativaHtml{
    constructor(contenedor,contenido){
        super(contenedor,contenido);
        this.respuesta = true;

    }
    setRespuesta(){
        this.respuesta = true;
    }
}