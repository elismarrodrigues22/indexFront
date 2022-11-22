   
       // request via java script ajax 4 passos
        //01 criar variável
        
        ajax = new XMLHttpRequest();
        var lista;
        var api = "http://elismar.herokuapp.com/api/usuario/";
        function listar(){
            //definição do  nosso request (endereço e forma)
        ajax.open("GET", api);
         // manda de fato a request
         ajax.send();
        
        
        // execução quando tiver a devolutiva do request
        ajax.onload = function(){
            lista = this.responseText;
            console.log(lista);
            lista = JSON.parse(lista);
            
            texto = "";
            i =0;

            for (const u of lista) {
                texto += `<tr onclick = 'editar(${i})'><td>${u.nome}</td><td>${u.email}</td></tr>`;
                i++;
            }
            document.getElementById('lista').innerHTML = texto;
        }
        }
        listar();

        function incluir(){
            //alert("Estamos dentro da function incluir");
            var usuario = {};
            usuario.nome = document.getElementById("nome").value;
            usuario.email = document.getElementById("email").value;
            //console.log(usuario);

            usuario.id = document.getElementById("id").value
            if(usuario.id > 0){
                metodo = "PUT";
            }else{
                metodo = "POST";
            }

            ajax.open(metodo, api);
            ajax.setRequestHeader("Content-Type","application/json;charset=UTF8");

            ajax.send(JSON.stringify(usuario));
            
            ajax.onload = function(){
                console.log(this.responseText);
                listar();
                limpar();
            }

            
        }

        function limpar(){
                document.getElementById("nome").value= "";
                document.getElementById("email").value= "";
                document.getElementById("id").value = "";
            }

        function editar(i){
            u= lista[i];

            document.getElementById("nome").value= u.nome;
            document.getElementById("email").value= u.email;
            document.getElementById("id").value= u.id;
        }
       
        function apagar(){
            id = document.getElementById("id").value;
            ajax.open("DELETE",api + id);
            ajax.send();
            ajax.onload = function(){
                alert(this.responseText);
                listar();
                limpar();
            }
        }
        listar(); 