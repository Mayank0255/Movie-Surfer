function hoverpanelin(id) {
    var parent = document.getElementById(id)
    parent.style.backgroundColor = '#00c8ff'
    var child = parent.getElementsByTagName('div')[0]
    var child2 = parent.getElementsByTagName('div')[1]
    child.style.backgroundColor = '#001d26'
        // child.style.borderRadius = '4px'
    child2.style.backgroundColor = '#001d26'


}

function hoverpanelout(id) {
    var parent = document.getElementById(id)
    parent.style.backgroundColor = null
    var child = parent.getElementsByTagName('div')[1]
}


function hovergenrein(id) {
    console.log(id);
    document.getElementById(id).getElementsByTagName('img')[0].style.border = "3px solid #00c8ff";
    document.getElementById(id).getElementsByClassName('link')[0].getElementsByTagName('a')[0].style.color = "#00c8ff";
    // document.getElementsByClassName("img-thumbnail").style.border = "1px solid #00c8ff";
}

function hovergenreout(id) {
    console.log(id);
    document.getElementById(id).getElementsByTagName('img')[0].style.border = null;
    document.getElementById(id).getElementsByClassName('link')[0].getElementsByTagName('a')[0].style.color = "#ffffff";
    // document.getElementsByClassName("img-thumbnail").style.border = "1px solid #00c8ff";
}