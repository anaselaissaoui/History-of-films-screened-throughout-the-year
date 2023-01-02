var res;
var request = new XMLHttpRequest();
request.open('GET', 'movies.json', true);
var tabRowHead=document.getElementById("tabRowHead");

var myTable=document.getElementById("tablePart");
request.send();

/*---------------------------------------------affichage on load ----------------------------------*/
request.onreadystatechange = function() {
    if (request.readyState===4 && request.status===200) {
        res=JSON.parse(request.response);;
        affichage();
        
}
}

/*---------------------------------------------Search function ----------------------------------*/

document.getElementById('search-input').addEventListener('input', filterTable);

function filterTable() {
  var searchValue = document.getElementById('search-input').value.toLowerCase();
  var rows = myTable.getElementsByTagName('tr');
  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName('td');
    var match = false;
    for (var j = 0; j < cells.length; j++) {
      if (cells[j].innerHTML.toLowerCase().indexOf(searchValue) > -1) {
        match = true;
        break;
      }
    }
    if (match) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}


    
/*---------------------------------------------sort function ----------------------------------*/

$('th').on('click', function(){
    var tbody=document.getElementById("fillHere");

    var column = $(this).data('column')
    var order = $(this).data('order')
    var text = $(this).html()
    text = text.substring(0, text.length-1)

    if(order == 'desc'){
        $(this).data('order', "asc")
        myArray = res.movies.sort((a,b) => a[column] > b[column] ? 1 : -1)
        text += '&#9653'

    }else{
        $(this).data('order', "desc")
        myArray = myArray.sort((a,b) => a[column] < b[column] ? 1 : -1)
        text += '&#9663'

    }
    tbody.innerHTML="";
    $(this).html(text);
    affichage(myArray);
})


/*---------------------------------------------affichage function ----------------------------------*/

function affichage(){
    for (let i=res.movies.length-1 ; i>=0 ; i--) {
        
        var posterUrl=res.movies[i].poster;
        
        var actorsC;
        actorsC="";
        for(let t=0;t<res.movies[i].actors.length;t++){
            actorsC+="<ul><li>"+res.movies[i].actors[t].name+" "+res.movies[i].actors[t].last_name+", "+res.movies[i].actors[t].nationality+"<br>"+"</ul></li>";
        }
       

        var festivalsG;
        festivalsG="";
        for(let f=0;f<res.movies[i].festivals.length; f++){
            festivalsG +="<ul><li>"+res.movies[i].festivals[f]+"<br>"+"</ul></li>";
        }
        
        document.getElementById("fillHere").insertAdjacentHTML("afterbegin",
                                    '<tr class="dataTable" ><td class="text-center  text-xs-left text-Secondary align-middle"  ><img src='+posterUrl+' height="200" class="img-fluid" ></td>'+
                                    '<td class="text-center text-xs-left  text-xs-left text-Secondary align-middle">'+res.movies[i].title+'</td>'+
                                    '<td class="text-center text-xs-left  text-Secondary align-middle">'+res.movies[i].director+'</td>'+
                                    '<td class="text-center text-xs-left  text-Secondary align-middle">'+res.movies[i].duration+'</td>'+
                                    '<td class="text-center text-xs-left  text-Secondary align-middle">'+res.movies[i].year+'</td>'+
                                    '<td class="  text-xs-left  text-Secondary align-middle">'+festivalsG+'</td>'+
                                    '<td class=" text-xs-left text-Secondary align-middle">'+actorsC+'</td> </tr>');

}
}